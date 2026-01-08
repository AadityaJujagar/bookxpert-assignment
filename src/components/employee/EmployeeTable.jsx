// 12

import { EmployeeRow } from "./EmployeeRow";

export const EmployeeTable = ({
  employees,
  onEdit,
  onDelete,
  onPrint,
  onToggleStatus,
}) => {
  if (!employees.length) {
    return (
      <div className="text-center py-12 text-slate-500">
        No employees found. Please add employees first.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100 text-slate-700">
          <tr>
            <th className="px-4 py-3 text-left">Employee</th>
            <th className="px-4 py-3 text-left">Gender</th>
            <th className="px-4 py-3 text-left">DOB</th>
            <th className="px-4 py-3 text-left">State</th>
            <th className="px-4 py-3 text-center">Status</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <EmployeeRow
              key={emp.id}
              employee={emp}
              onEdit={onEdit}
              onDelete={onDelete}
              onPrint={onPrint}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
