// 8

import { printContent } from "../utils/print";
import { useState } from "react";
import { EmployeeSummary } from "../components/employee/EmployeeSummary";
import { useEmployees } from "../hooks/useEmployees";
import { EmployeeActions } from "../components/employee/EmployeeActions";
import { EmployeeTable } from "../components/employee/EmployeeTable";
import { Modal } from "../components/common/Modal";
import { EmployeeForm } from "../components/employee/EmployeeForm";
import { ConfirmDeleteModal } from "../components/common/ConfirmDeleteModal";
import { getAvatarUrl } from "../utils/avatar";
import { useNavigate } from "react-router-dom";

const onPrint = (employee) => {
  const avatar = employee.customAvatar
    ? employee.customAvatar
    : getAvatarUrl(employee.firstName, employee.lastName);

  const html = `
    <h2>Employee Details</h2>
    <img src="${avatar}" alt="Avatar" />
    <p><strong>Name:</strong> ${employee.firstName} ${employee.lastName}</p>
    <p><strong>Gender:</strong> ${employee.gender}</p>
    <p><strong>DOB:</strong> ${employee.dob}</p>
    <p><strong>State:</strong> ${employee.state}</p>
    <p><strong>City:</strong> ${employee.city}</p>
    <p><strong>Status:</strong> ${employee.isActive ? "Active" : "Inactive"}</p>
    `;

  printContent(html);
};

export const Dashboard = () => {
  // 17
  const { employees, addEmployee, updateEmployee } = useEmployees();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // 18
  const [deleteTarget, setDeleteTarget] = useState(null);

  // 11
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    gender: "",
    status: "",
  });

  // filter logic
  const filteredEmployees = employees.filter((emp) => {
    const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();

    const matchesSearch = fullName.includes(searchTerm.toLowerCase());
    const matchesGender = !filters.gender || emp.gender === filters.gender;
    const matchesStatus =
      !filters.status ||
      (filters.status === "active" && emp.isActive) ||
      (filters.status === "inactive" && !emp.isActive);

    return matchesSearch && matchesGender && matchesStatus;
  });

  // 14
  const { toggleEmployeeStatus, deleteEmployee } = useEmployees();

  // 20
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login", { replace: true });
  };

  // 17
  const handleAdd = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  const handleEdit = (employee) => {
    // 17
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDelete = (employee) => {
    setDeleteTarget(employee);
  };

  const confirmDelete = (id) => {
    deleteEmployee(id);
    setDeleteTarget(null);
  };

  // 17
  const handleSubmit = (formData) => {
    if (editingEmployee) {
      updateEmployee({ ...editingEmployee, ...formData });
    } else {
      addEmployee(formData);
    }
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 min-h-screen min-w-screen">
      <div className="flex justify-between">
        <EmployeeSummary />
        <button
          onClick={handleLogout}
          className="rounded-lg border border-slate-200 px-4 py-2 h-10 text-sm font-medium text-slate-700 transition bg-white hover:bg-slate-100 hover:text-slate-900"
        >
          Logout
        </button>
      </div>

      {/* 11 */}
      <EmployeeActions
        onSearch={setSearchTerm}
        onFilterChange={setFilters}
        onAdd={handleAdd} // 17
      />
      <div className="text-slate-500 text-sm">
        Showing {filteredEmployees.length} employees
      </div>
      {/* 14 */}
      <EmployeeTable
        employees={filteredEmployees}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPrint={onPrint}
        onToggleStatus={toggleEmployeeStatus}
      />
      {/* 17 */}
      <Modal
        isOpen={isModalOpen}
        title={editingEmployee ? "Edit Employee" : "Add Employee"}
        onClose={() => setIsModalOpen(false)}
      >
        <EmployeeForm
          initialData={editingEmployee}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
      {/* 18 */}
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        employee={deleteTarget}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
