import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAdminContext } from "../context/AdminContext";
import Modal from "./Modal";

// Validation Schema
const UserSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be at most 50 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  role: Yup.string().required("Role is required"),
  status: Yup.string()
    .oneOf(["Active", "Inactive"], "Invalid status")
    .required("Status is required"),
});

const UserManagement = () => {
  const { users, roles, addUser, updateUser, deleteUser } = useAdminContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const initialValues = {
    username: "",
    email: "",
    role: "",
    status: "Active",
  };

  const handleSubmit = (values, { resetForm }) => {
    if (currentUser && currentUser.id) {
      // Update existing user
      updateUser({ ...values, id: currentUser.id });
    } else {
      // Add new user
      addUser(values);
    }
    setIsModalOpen(false);
    resetForm();
  };

  const openEditModal = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setCurrentUser(null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Management</h2>
        <button
          onClick={openAddModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add User
        </button>
      </div>

      <table className="w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">Username</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="p-3">{user.username}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.role}</td>
              <td className="p-3">{user.status}</td>
              <td className="p-3">
                <button
                  onClick={() => openEditModal(user)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentUser ? "Edit User" : "Add User"}
      >
        <Formik
          initialValues={currentUser || initialValues}
          validationSchema={UserSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="username" className="block mb-1">
                  Username
                </label>
                <Field
                  name="username"
                  type="text"
                  className={`w-full p-2 border rounded ${
                    touched.username && errors.username
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-1">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className={`w-full p-2 border rounded ${
                    touched.email && errors.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label htmlFor="role" className="block mb-1">
                  Role
                </label>
                <Field
                  name="role"
                  as="select"
                  className={`w-full p-2 border rounded ${
                    touched.role && errors.role
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label htmlFor="status" className="block mb-1">
                  Status
                </label>
                <Field
                  name="status"
                  as="select"
                  className={`w-full p-2 border rounded ${
                    touched.status && errors.status
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Field>
                <ErrorMessage
                  name="status"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                {currentUser ? "Update User" : "Add User"}
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default UserManagement;
