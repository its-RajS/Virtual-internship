"use client";

import { Employee } from "@/types/employee";

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

function StatusBadge({ status }: { status: Employee["status"] }) {
  const isActive = status === "Active";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${isActive ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-amber-500"}`} />
      {status}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 mb-4">
        <svg className="h-8 w-8 text-neutral-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
      </div>
      <h3 className="text-sm font-semibold text-neutral-900">No employees found</h3>
      <p className="mt-1 text-sm text-neutral-500">Get started by adding your first employee.</p>
    </div>
  );
}

export default function EmployeeTable({ employees, onEdit, onDelete }: EmployeeTableProps) {
  if (employees.length === 0) return <EmptyState />;

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-100 bg-neutral-50/50">
              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">Name</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">Department</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">Role</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">Status</th>
              <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-neutral-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {employees.map((emp) => (
              <tr key={emp.id} className="group transition-colors hover:bg-neutral-50/50">
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{emp.name}</p>
                    <p className="text-xs text-neutral-500">{emp.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-neutral-600">{emp.department}</td>
                <td className="px-6 py-4 text-sm text-neutral-600">{emp.role}</td>
                <td className="px-6 py-4"><StatusBadge status={emp.status} /></td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button type="button" onClick={() => onEdit(emp)} className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600" title="Edit">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>
                    </button>
                    <button type="button" onClick={() => onDelete(emp.id)} className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-500" title="Delete">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-neutral-100">
        {employees.map((emp) => (
          <div key={emp.id} className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-900">{emp.name}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{emp.email}</p>
              </div>
              <StatusBadge status={emp.status} />
            </div>
            <div className="flex items-center gap-4 text-xs text-neutral-500">
              <span>{emp.department}</span>
              <span>•</span>
              <span>{emp.role}</span>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => onEdit(emp)} className="flex-1 rounded-lg border border-neutral-200 py-2 text-xs font-medium text-neutral-600 hover:bg-neutral-50 transition-colors">Edit</button>
              <button type="button" onClick={() => onDelete(emp.id)} className="flex-1 rounded-lg border border-red-100 py-2 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
