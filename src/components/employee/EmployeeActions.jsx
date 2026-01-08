// 10

import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";

export const EmployeeActions = ({ onSearch, onFilterChange, onAdd }) => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    gender: "",
    status: "",
  });

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    onSearch(debouncedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    const updated = {
      ...filters,
      [name]: value,
    };

    setFilters(updated);
    onFilterChange(updated);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between">
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 outline-none"
      />

      <div className="flex gap-3">
        <select
          name="gender"
          value={filters.gender}
          onChange={handleFilterChange}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <button
        onClick={onAdd}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
      >
        + Add Employee
      </button>
    </div>
  );
};
