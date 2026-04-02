export async function scheduleRecurringScan(projectId: string, cadence: 'weekly' | 'monthly') {
  return {
    projectId,
    cadence,
    status: 'scheduled',
    provider: 'placeholder-cron'
  };
}
