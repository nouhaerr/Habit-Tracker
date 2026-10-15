begin;
alter table public.habits
  add column scheduled_days smallint[] not null default '{0,1,2,3,4,5,6}',
  add column schedule_history jsonb not null default '[]'::jsonb,
  add constraint valid_scheduled_days check (
    cardinality(scheduled_days) between 1 and 7
    and scheduled_days <@ array[0,1,2,3,4,5,6]::smallint[]
    and array_position(scheduled_days, null) is null
  ),
  add constraint valid_schedule_history check (jsonb_typeof(schedule_history) = 'array');
update public.habits set schedule_history = jsonb_build_array(jsonb_build_object('from', created_at, 'days', scheduled_days));

-- Serialize edits with completion updates. Keep earlier schedules for statistics.
create function public.edit_habit(
  habit_id uuid, habit_name text, habit_icon text, habit_category text,
  habit_color text, habit_days smallint[], effective_date date
) returns setof public.habits
language plpgsql security invoker set search_path = '' as $$
declare
  existing public.habits;
  history jsonb;
begin
  select * into existing from public.habits
    where id = habit_id and user_id = (select auth.uid()) for update;
  if not found then return; end if;
  if effective_date is null or effective_date < existing.created_at then
    raise exception 'Invalid schedule start date';
  end if;
  history := existing.schedule_history;
  if jsonb_array_length(history) = 0 then
    history := jsonb_build_array(jsonb_build_object('from', existing.created_at, 'days', existing.scheduled_days));
  end if;
  if existing.scheduled_days is distinct from habit_days then
    select coalesce(jsonb_agg(entry order by entry->>'from'), '[]'::jsonb) into history
      from jsonb_array_elements(history) entry where (entry->>'from')::date < effective_date;
    history := history || jsonb_build_array(jsonb_build_object('from', effective_date, 'days', habit_days));
  end if;
  return query update public.habits
    set name = habit_name, icon = habit_icon, category = habit_category, color = habit_color,
        scheduled_days = habit_days, schedule_history = history
    where id = habit_id and user_id = (select auth.uid()) returning *;
end;
$$;
revoke all on function public.edit_habit(uuid,text,text,text,text,smallint[],date) from public, anon;
grant execute on function public.edit_habit(uuid,text,text,text,text,smallint[],date) to authenticated;
commit;
