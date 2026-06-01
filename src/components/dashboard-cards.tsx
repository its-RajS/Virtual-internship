"use client";

interface DashboardCardsProps {
  total: number;
  active: number;
  inactive: number;
}

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  accent: string;
}

function StatCard({ label, value, icon, accent }: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:shadow-neutral-200/50 hover:-translate-y-0.5">
      {/* Subtle accent gradient at top */}
      <div className={`absolute inset-x-0 top-0 h-1 ${accent}`} />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-500">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-neutral-900">
            {value}
          </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-50 text-neutral-600 transition-colors group-hover:bg-neutral-100">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function DashboardCards({
  total,
  active,
  inactive,
}: DashboardCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard
        label="Total Employees"
        value={total}
        accent="bg-gradient-to-r from-violet-500 to-purple-500"
        icon={
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
            />
          </svg>
        }
      />

      <StatCard
        label="Active"
        value={active}
        accent="bg-gradient-to-r from-emerald-500 to-green-500"
        icon={
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        }
      />

      <StatCard
        label="Inactive"
        value={inactive}
        accent="bg-gradient-to-r from-amber-500 to-orange-500"
        icon={
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
        }
      />
    </div>
  );
}
