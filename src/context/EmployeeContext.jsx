// 5

import { useEffect, useState } from "react";
import { EmployeeContext } from "./createContext";

const STORAGE_KEY = "employees";

const initialEmployees = [
  {
    id: crypto.randomUUID(),
    firstName: "Aaditya",
    lastName: "Jujagar",
    gender: "male",
    dob: "2002-02-20",
    state: "Maharashtra",
    city: "Solapur",
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState(() => {
    const storedEmployees = localStorage.getItem(STORAGE_KEY);
    return storedEmployees ? JSON.parse(storedEmployees) : initialEmployees;
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
