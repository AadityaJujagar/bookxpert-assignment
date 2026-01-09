// 5

import { useEffect, useState } from "react";
import { EmployeeContext } from "./createContext";

const STORAGE_KEY = "employees";

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState(() => {
    const storedEmployees = localStorage.getItem(STORAGE_KEY);
    return storedEmployees ? JSON.parse(storedEmployees) : [];
  });

  useEffect(() => {
    if (employees.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    }
  }, [employees]);

  // CRUD ops begin
  // ADD EMPLOYEE
  const addEmployee = (employee) => {
    setEmployees((prev) => [
      {
        ...employee,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  // UPDATE EMPLOYEE
  const updateEmployee = (updatedEmployee) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
    );
  };

  // DELETE EMPLOYEE
  const deleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  // TOGGLE EMPLOYEE
  const toggleEmployeeStatus = (id) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id
          ? {
              ...emp,
              isActive: !emp.isActive,
            }
          : emp
      )
    );
  };

  const totalEmployees = employees.length;
  const activeCount = employees.filter((e) => e.isActive).length;
  const inActiveCount = totalEmployees - activeCount;

  return (
    <EmployeeContext.Provider
      value={{
        addEmployee,
        updateEmployee,
        deleteEmployee,
        toggleEmployeeStatus,

        employees,
        totalEmployees,
        activeCount,
        inActiveCount,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export { EmployeeContext };
