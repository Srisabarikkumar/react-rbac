/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";
import { initialUsers, initialRoles } from "../utils/initialData";

const AdminContext = createContext();

export const useAdminContext = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState(initialUsers);
  const [roles, setRoles] = useState(initialRoles);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  // User Management Methods
  const addUser = (newUser) => {
    const userWithId = {
      ...newUser,
      id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    };
    setUsers([...users, userWithId]);
  };

  const updateUser = (updatedUser) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const deleteUser = (userId) => {
    let removeUser = confirm("Are you sure do you want to delete this user?");
    if (removeUser) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  // Role Management Methods
  const addRole = (newRole) => {
    const roleWithId = {
      ...newRole,
      id: roles.length > 0 ? Math.max(...roles.map((r) => r.id)) + 1 : 1,
    };
    setRoles([...roles, roleWithId]);
  };

  const updateRole = (updatedRole) => {
    setRoles(
      roles.map((role) => (role.id === updatedRole.id ? updatedRole : role))
    );
  };

  const deleteRole = (roleId) => {
    let removeRole = confirm("Are you sure do you want to delete this role?");
    if (removeRole) {
      setRoles(roles.filter((role) => role.id !== roleId));
    }
  };

  return (
    <AdminContext.Provider
      value={{
        users,
        roles,
        selectedUser,
        selectedRole,
        setSelectedUser,
        setSelectedRole,
        addUser,
        updateUser,
        deleteUser,
        addRole,
        updateRole,
        deleteRole,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
