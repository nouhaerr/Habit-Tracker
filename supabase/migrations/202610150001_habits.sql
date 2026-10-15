begin;

create table public.habits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name text not null check (char_length(trim(name)) between 1 and 40),
  icon text not null,
  category text not null check (category in ('health', 'dev', 'mindset', 'custom')),
  color text not null check (color ~ '^#[0-9A-Fa-f]{6}$'),
  created_at date not null default current_date,
  inserted_at timestamptz not null default now(),
  completed_dates date[] not null default '{}',
  reminder time,
  reminder_enabled boolean not null default false
);
create index habits_user_id_idx on public.habits(user_id);
alter table public.habits enable row level security;
revoke all on public.habits from anon;
grant select, insert, update, delete on public.habits to authenticated;
create policy "Read own habits" on public.habits for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "Create own habits" on public.habits for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "Update own habits" on public.habits for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Delete own habits" on public.habits for delete to authenticated
  using ((select auth.uid()) = user_id);

-- Atomic toggle: concurrent devices cannot overwrite completion history.
-- SECURITY INVOKER keeps the caller's row-level security rules in effect.
create function public.toggle_habit(habit_id uuid, completion_date date)
returns setof public.habits
language sql security invoker set search_path = '' as $$
  update public.habits
  set completed_dates = case
    when completion_date = any(completed_dates)
      then array_remove(completed_dates, completion_date)
    else array_append(completed_dates, completion_date)
  end
  where id = habit_id and user_id = (select auth.uid()) and completion_date is not null
  returning *;
$$;
revoke all on function public.toggle_habit(uuid, date) from public, anon;
grant execute on function public.toggle_habit(uuid, date) to authenticated;
commit;
