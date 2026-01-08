// 7

import { useEmployees } from "../../hooks/useEmployees";

const StatCard = ({ title, value, bg }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-xl p-5 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${bg}`}
    >
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
        {value}
      </h3>
    </div>
  );
};

export const EmployeeSummary = () => {
  const { totalEmployees, activeCount, inActiveCount } = useEmployees();

  const stats = [
    {
      title: "Total Employees",
      value: totalEmployees,
      bgColor: "bg-indigo-50",
    },
    {
      title: "Active",
      value: activeCount,
      bgColor: "bg-green-50",
    },
    {
      title: "Inactive",
      value: inActiveCount,
      bgColor: "bg-red-50",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-3 p-2">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          bgColor={stat.bgColor}
        />
      ))}
    </section>
  );
};
