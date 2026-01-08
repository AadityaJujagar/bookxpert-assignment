# Employee Management Dashboard

A modern Employee Management Dashboard built with **React.js** that supports authentication, employee CRUD operations, filtering, searching, image uploads, and printing functionality.

This project was developed as part of an assignment to demonstrate real-world React application structure, state management, and UI/UX practices.

---

## 🚀 Features

### 🔐 Authentication

- Login page with basic validation
- Mock authentication
- Protected dashboard routes (cannot access without login)

### 📊 Dashboard Summary

- Total number of employees
- Active vs Inactive employee count

### 👥 Employee Management

- Add new employee
- Edit existing employee
- Delete employee (with confirmation modal)
- Toggle Active / Inactive status
- Print single employee details
- Print employee list

### 📝 Employee Form

- Full Name
- Gender
- Date of Birth
- State selection (dropdown with debouncing)
- City (manual input)
- Active / Inactive status
- Profile Image:
  - Default avatar generated using DiceBear
  - Optional custom image upload
  - Image preview before save
- Same form reused for Add & Edit

### 🔍 Search & Filter

- Debounced search by employee name
- Filter by gender
- Filter by active/inactive status
- Combined filtering supported

### 🖨️ Printing

- Print single employee details (including profile image)
- Print employee list with avatars
- Uses native browser print functionality

---

## 🎨 UI / UX

- Modern, clean, and responsive design
- Built using Tailwind CSS v3
- Proper spacing, typography, and color usage
- Loading states and empty states handled gracefully
- Modal-based forms for better UX

---

## 🛠️ Tech Stack

- **React.js**
- **React Router (Data Router API)**
- **Context API** (state management)
- **Tailwind CSS v3**
- **Local Storage** (data persistence)
- **DiceBear API** (default avatars)

---

## 📁 Project Structure
