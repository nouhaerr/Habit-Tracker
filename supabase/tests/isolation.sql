-- Run in Supabase SQL Editor after both migrations. All fixtures are rolled back.
begin;
select set_config('test.user_a', gen_random_uuid()::text, true);
select set_config('test.user_b', gen_random_uuid()::text, true);
select set_config('test.habit_a', gen_random_uuid()::text, true);
select set_config('test.habit_b', gen_random_uuid()::text, true);
insert into auth.users (id, email) values
  (current_setting('test.user_a')::uuid, 'habitflow-test-a-' || current_setting('test.user_a') || '@example.com'),
  (current_setting('test.user_b')::uuid, 'habitflow-test-b-' || current_setting('test.user_b') || '@example.com');
insert into public.habits (id, user_id, name, icon, category, color) values
  (current_setting('test.habit_a')::uuid, current_setting('test.user_a')::uuid, 'Test A', '🌿', 'custom', '#6B8CFF'),
  (current_setting('test.habit_b')::uuid, current_setting('test.user_b')::uuid, 'Test B', '🌿', 'custom', '#6B8CFF');

set local role authenticated;
select set_config('request.jwt.claim.sub', current_setting('test.user_a'), true);
do $$
declare affected integer;
begin
  if not exists (select 1 from public.habits where id = current_setting('test.habit_a')::uuid) then
    raise exception 'Own habit is not readable';
  end if;
  if exists (select 1 from public.habits where id = current_setting('test.habit_b')::uuid) then
    raise exception 'Another user habit is readable';
  end if;
  update public.habits set name = 'Stolen' where id = current_setting('test.habit_b')::uuid;
  get diagnostics affected = row_count;
  if affected <> 0 then raise exception 'Another user habit is writable'; end if;
  delete from public.habits where id = current_setting('test.habit_b')::uuid;
  get diagnostics affected = row_count;
  if affected <> 0 then raise exception 'Another user habit is deletable'; end if;
  if exists (select 1 from public.toggle_habit(current_setting('test.habit_b')::uuid, '2026-10-15')) then
    raise exception 'RPC can toggle another user habit';
  end if;
  begin
    insert into public.habits (user_id, name, icon, category, color)
      values (current_setting('test.user_b')::uuid, 'Unauthorized', '🌿', 'custom', '#6B8CFF');
    raise exception 'Can insert for another user';
  exception when insufficient_privilege then null;
  end;
  if exists (select 1 from public.edit_habit(
    current_setting('test.habit_b')::uuid, 'Stolen', '🌿', 'custom', '#6B8CFF',
    array[1,3,5]::smallint[], current_date
  )) then raise exception 'RPC can edit another user habit'; end if;
  perform public.edit_habit(
    current_setting('test.habit_a')::uuid, 'Edited habit', '📚', 'dev', '#60C5F1',
    array[1,3,5]::smallint[], current_date
  );
  if not exists (select 1 from public.habits where id = current_setting('test.habit_a')::uuid
    and name = 'Edited habit' and scheduled_days = array[1,3,5]::smallint[]
    and jsonb_array_length(schedule_history) > 0) then
    raise exception 'Habit edit or schedule history was not saved';
  end if;
  begin
    perform public.edit_habit(
      current_setting('test.habit_a')::uuid, 'Invalid days', '📚', 'dev', '#60C5F1',
      array[]::smallint[], current_date
    );
    raise exception 'Empty schedule was accepted';
  exception when check_violation then null;
  end;
  perform public.toggle_habit(current_setting('test.habit_a')::uuid, '2026-10-15');
  if not exists (select 1 from public.habits where id = current_setting('test.habit_a')::uuid and '2026-10-15'::date = any(completed_dates)) then
    raise exception 'Completion was not saved';
  end if;
  perform public.toggle_habit(current_setting('test.habit_a')::uuid, '2026-10-15');
  if exists (select 1 from public.habits where id = current_setting('test.habit_a')::uuid and '2026-10-15'::date = any(completed_dates)) then
    raise exception 'Completion was not removed';
  end if;
end $$;
set local role anon;
do $$
begin
  begin
    perform 1 from public.habits;
    raise exception 'Anonymous access is permitted';
  exception when insufficient_privilege then null;
  end;
end $$;
rollback;
