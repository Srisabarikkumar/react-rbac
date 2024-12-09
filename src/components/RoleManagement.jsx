import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAdminContext } from "../context/AdminContext";
import Modal from "./Modal";

// Validation Schema
const RoleSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Role name must be at least 3 characters")
    .max(50, "Role name must be at most 50 characters")
    .required("Role name is required"),
  permissions: Yup.array().min(1, "At least one permission is required"),
});

const RoleManagement = () => {
  const { roles, addRole, updateRole, deleteRole } = useAdminContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);

  const initialValues = {
    name: "",
    permissions: [],
  };

  const handleSubmit = (values, { resetForm }) => {
    if (currentRole && currentRole.id) {
      // Update existing role
      updateRole({ ...values, id: currentRole.id });
    } else {
      // Add new role
      addRole(values);
    }
    setIsModalOpen(false);
    resetForm();
  };

  const openEditModal = (role) => {
    setCurrentRole(role);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setCurrentRole(null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Role Management</h2>
        <button
          onClick={openAddModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Role
        </button>
      </div>

      <table className="w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">Role Name</th>
            <th className="p-3 text-left">Permissions</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id} className="border-b">
              <td className="p-3">{role.name}</td>
              <td className="p-3">
                {role.permissions.map((perm) => (
                  <span
                    key={perm}
                    className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-1 mb-1 text-xs"
                  >
                    {perm}
                  </span>
                ))}
              </td>
              <td className="p-3">
                <button
                  onClick={() => openEditModal(role)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteRole(role.id)}
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
        title={currentRole ? "Edit Role" : "Add Role"}
      >
        <Formik
          initialValues={currentRole || initialValues}
          validationSchema={RoleSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ errors, touched, setFieldValue, values }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1">
                  Role Name
                </label>
                <Field
                  name="name"
                  type="text"
                  className={`w-full p-2 border rounded ${
                    touched.name && errors.name
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block mb-2 font-bold">Permissions</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "read",
                    "write",
                    "delete",
                    "manage_users",
                    "manage_roles",
                  ].map((permission) => (
                    <label
                      key={permission}
                      className="inline-flex items-center"
                    >
                      <input
                        type="checkbox"
                        checked={values.permissions.includes(permission)}
                        onChange={() => {
                          const currentPermissions = values.permissions;
                          const newPermissions = currentPermissions.includes(
                            permission
                          )
                            ? currentPermissions.filter((p) => p !== permission)
                            : [...currentPermissions, permission];

                          setFieldValue("permissions", newPermissions);
                        }}
                        className="form-checkbox"
                      />
                      <span className="ml-2 capitalize">
                        {permission.replace("_", " ")}
                      </span>
                    </label>
                  ))}
                </div>
                {touched.permissions && errors.permissions && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.permissions}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                {currentRole ? "Update Role" : "Add Role"}
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default RoleManagement;
