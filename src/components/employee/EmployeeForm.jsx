// 16

import { useState } from "react";
import { getAvatarUrl } from "../../utils/avatar";

const initialForm = {
  firstName: "",
  lastName: "",
  gender: "",
  dob: "",
  state: "",
  city: "",
  isActive: true,
  customAvatar: null,
};

export const EmployeeForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(() => initialData || initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "Required";
    if (!formData.lastName.trim()) newErrors.lastName = "Required";
    if (!formData.gender) newErrors.gender = "Required";
    if (!formData.dob) newErrors.dob = "Required";
    if (!formData.state) newErrors.state = "Required";
    if (!formData.city.trim()) newErrors.city = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  const avatar = formData.customAvatar
    ? formData.customAvatar
    : getAvatarUrl(formData.firstName, formData.lastName);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          customAvatar: reader.result, // base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-center">
        <img
          src={avatar}
          alt="Avatar preview"
          className="w-16 h-16 rounded-full bg-slate-200"
        />
      </div>

      <div>
        <label className="text-sm mb-1 block">Upload Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="input"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="input"
          />
          {errors.firstName && (
            <p className="text-xs text-red-500">{errors.firstName}</p>
          )}
        </div>

        <div>
          <input
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="input"
          />
          {errors.lastName && (
            <p className="text-xs text-red-500">{errors.lastName}</p>
          )}
        </div>
      </div>

      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="input"
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        className="input"
      />

      <input
        name="state"
        placeholder="State"
        value={formData.state}
        onChange={handleChange}
        className="input"
      />

      <input
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        className="input"
      />

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
        />
        Active Employee
      </label>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Save
        </button>
      </div>
    </form>
  );
};
