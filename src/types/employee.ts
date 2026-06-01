export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  status: "Active" | "Inactive";
}

export type EmployeeFormData = Omit<Employee, "id">;
