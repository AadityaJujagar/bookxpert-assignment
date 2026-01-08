// 13

import { getAvatarUrl } from "../../utils/avatar";

export const EmployeeRow = ({
  employee,
  onEdit,
  onDelete,
  onPrint,
  onToggleStatus,
}) => {
  const {
    id,
    firstName,
    lastName,
    gender,
    dob,
    state,
    isActive,
    customAvatar,
  } = employee;

  const avatar = customAvatar
    ? customAvatar
    : getAvatarUrl(firstName, lastName);

  return (
    <tr className="border-t">
      <td className="px-4 py-3 flex items-center gap-3">
        <img
          src={avatar}
          alt={`${firstName} ${lastName}`}
          className="w-10 h-10 rounded-full bg-slate-200"
        />
        <div>
          <p className="font-medium text-slate-800">
            {firstName} {lastName}
          </p>
          <p className="text-xs text-slate-500">ID: {id.slice(0, 6)}</p>
        </div>
      </td>

      <td className="px-4 py-3 capitalize">{gender}</td>
      <td className="px-4 py-3">{dob}</td>
      <td className="px-4 py-3">{state}</td>

      <td className="px-4 py-3 text-center">
        <button
          onClick={() => onToggleStatus(id)}
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </button>
      </td>

      <td className="px-4 py-3 text-center space-x-2">
        <button
          onClick={() => onEdit(employee)}
          className="text-indigo-600 hover:underline text-xs"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(employee)}
          className="text-red-600 hover:underline text-xs"
        >
          Delete
        </button>
        <button
          onClick={() => onPrint(employee)}
          className="text-slate-600 hover:underline text-xs"
        >
          Print
        </button>
      </td>
    </tr>
  );
};
