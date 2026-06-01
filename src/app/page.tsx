"use client";

import { useEffect, useMemo, useState } from "react";
import { Employee, EmployeeFormData } from "@/types/employee";
import { initialEmployees } from "@/data/employees";
import DashboardCards from "@/components/dashboard-cards";
import SearchBar from "@/components/search-bar";
import EmployeeTable from "@/components/employee-table";
import EmployeeForm from "@/components/employee-form";

const EMPLOYEE_STORAGE_KEY = "empboard-employees";

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [hasLoadedEmployees, setHasLoadedEmployees] = useState(false);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const storedEmployees = window.localStorage.getItem(EMPLOYEE_STORAGE_KEY);

      if (!storedEmployees) {
        setHasLoadedEmployees(true);
        return;
      }

      try {
        const parsedEmployees = JSON.parse(storedEmployees) as Employee[];

        if (Array.isArray(parsedEmployees) && parsedEmployees.length > 0) {
          setEmployees(parsedEmployees);
        }
      } catch {
        window.localStorage.removeItem(EMPLOYEE_STORAGE_KEY);
      } finally {
        setHasLoadedEmployees(true);
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (!hasLoadedEmployees) {
      return;
    }

    window.localStorage.setItem(EMPLOYEE_STORAGE_KEY, JSON.stringify(employees));
  }, [employees, hasLoadedEmployees]);

  const stats = useMemo(() => {
    const active = employees.filter((employee) => employee.status === "Active").length;
    const inactive = employees.length - active;

    return {
      total: employees.length,
      active,
      inactive,
    };
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    if (!searchQuery.trim()) return employees;
    const q = searchQuery.toLowerCase();
    return employees.filter((e) => e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q));
  }, [employees, searchQuery]);

  const departments = useMemo(() => {
    const uniqueDepartments = new Set(initialEmployees.map((employee) => employee.department));

    employees.forEach((employee) => {
      uniqueDepartments.add(employee.department);
    });

    return Array.from(uniqueDepartments).sort((a, b) => a.localeCompare(b));
  }, [employees]);

  function generateId(): string {
    return `emp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  }

  function handleAddEmployee(data: EmployeeFormData) {
    const newEmployee: Employee = { id: generateId(), ...data };
    setEmployees((prev) => [newEmployee, ...prev]);
    setShowForm(false);
  }

  function handleUpdateEmployee(data: EmployeeFormData) {
    if (!editingEmployee) return;
    setEmployees((prev) => prev.map((e) => (e.id === editingEmployee.id ? { ...e, ...data } : e)));
    setEditingEmployee(null);
  }

  function handleDeleteEmployee(id: string) {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    setDeleteConfirm(null);
  }

  function openEdit(employee: Employee) {
    setShowForm(false);
    setEditingEmployee(employee);
  }

  function openAddForm() {
    setEditingEmployee(null);
    setShowForm(true);
  }

  function openDelete(id: string) {
    setDeleteConfirm(id);
  }

  const deleteName = deleteConfirm ? employees.find((e) => e.id === deleteConfirm)?.name : "";

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900">
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
              </svg>
            </div>
            <h1 className="text-lg font-semibold text-neutral-900">EmpBoard</h1>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {stats.total} employees
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* Dashboard Cards */}
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-400">Overview</h2>
          <DashboardCards total={stats.total} active={stats.active} inactive={stats.inactive} />
        </section>

        {/* Employee Section */}
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-400">Employees</h2>
          <div className="space-y-4">
            <SearchBar query={searchQuery} onSearch={setSearchQuery} onAddClick={openAddForm} />
            <EmployeeTable employees={filteredEmployees} onEdit={openEdit} onDelete={openDelete} />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-neutral-400">Built with Next.js, TypeScript & Tailwind CSS</p>
        </div>
      </footer>

      {/* Add/Edit Form Modal */}
      {(showForm || editingEmployee) && (
        <EmployeeForm
          key={editingEmployee?.id ?? "new"}
          employee={editingEmployee}
          departments={departments}
          onSubmit={editingEmployee ? handleUpdateEmployee : handleAddEmployee}
          onCancel={() => { setShowForm(false); setEditingEmployee(null); }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 mb-4">
              <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900">Delete Employee</h3>
            <p className="mt-2 text-sm text-neutral-500">Are you sure you want to delete <span className="font-medium text-neutral-700">{deleteName}</span>? This action cannot be undone.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-all">Cancel</button>
              <button onClick={() => handleDeleteEmployee(deleteConfirm)} className="flex-1 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-600 transition-all">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
