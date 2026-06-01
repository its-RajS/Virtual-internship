"use client";

import { useState } from "react";
import { Employee, EmployeeFormData } from "@/types/employee";

interface EmployeeFormProps {
  departments: string[];
  employee: Employee | null;
  onSubmit: (data: EmployeeFormData) => void;
  onCancel: () => void;
}

const emptyForm: EmployeeFormData = { name: "", email: "", department: "", role: "", status: "Active" };

function getInitialFormData(employee: Employee | null): EmployeeFormData {
  if (!employee) {
    return emptyForm;
  }

  return {
    name: employee.name,
    email: employee.email,
    department: employee.department,
    role: employee.role,
    status: employee.status,
  };
}

export default function EmployeeForm({ departments, employee, onSubmit, onCancel }: EmployeeFormProps) {
  const [formData, setFormData] = useState<EmployeeFormData>(() => getInitialFormData(employee));
  const [errors, setErrors] = useState<Partial<Record<keyof EmployeeFormData, string>>>({});
  const isEditing = employee !== null;

  function validate(): boolean {
    const e: Partial<Record<keyof EmployeeFormData, string>> = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Invalid email";
    if (!formData.department) e.department = "Department is required";
    if (!formData.role.trim()) e.role = "Role is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (validate()) onSubmit(formData);
  }

  function updateField(field: keyof EmployeeFormData, value: string) {
    setFormData((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  }

  const inputCls = (field: keyof EmployeeFormData) =>
    `w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-all focus:ring-2 ${errors[field] ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-neutral-200 focus:border-violet-300 focus:ring-violet-100"}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-2xl border border-neutral-200 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-neutral-900">{isEditing ? "Edit Employee" : "Add New Employee"}</h2>
          <button type="button" onClick={onCancel} className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700">Full Name</label>
            <input type="text" value={formData.name} onChange={(e) => updateField("name", e.target.value)} placeholder="e.g. John Doe" className={inputCls("name")} />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700">Email Address</label>
            <input type="email" value={formData.email} onChange={(e) => updateField("email", e.target.value)} placeholder="e.g. john@company.com" className={inputCls("email")} />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">Department</label>
              <select value={formData.department} onChange={(e) => updateField("department", e.target.value)} className={`${inputCls("department")} appearance-none ${!formData.department ? "text-neutral-400" : ""}`}>
                <option value="" disabled>Select department</option>
                {departments.map((department) => <option key={department} value={department}>{department}</option>)}
              </select>
              {errors.department && <p className="mt-1 text-xs text-red-500">{errors.department}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">Role</label>
              <input type="text" value={formData.role} onChange={(e) => updateField("role", e.target.value)} placeholder="e.g. Senior Developer" className={inputCls("role")} />
              {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role}</p>}
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700">Status</label>
            <div className="flex gap-3">
              {(["Active", "Inactive"] as const).map((s) => (
                <button key={s} type="button" onClick={() => updateField("status", s)} className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${formData.status === s ? (s === "Active" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-700") : "border-neutral-200 bg-white text-neutral-500 hover:bg-neutral-50"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onCancel} className="flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 active:scale-[0.98] transition-all">Cancel</button>
            <button type="submit" className="flex-1 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 active:scale-[0.98] transition-all">{isEditing ? "Save Changes" : "Add Employee"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
