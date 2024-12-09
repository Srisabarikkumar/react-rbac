import { useState } from "react";
import UserManagement from "./UserManagement";
import RoleManagement from "./RoleManagement";

const Layout = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
        <div className="border-b">
          <div className="container mx-auto">
            <div className="flex">
              <button
                onClick={() => setActiveTab("users")}
                className={`px-4 py-2 ${
                  activeTab === "users"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-600"
                }`}
              >
                User Management
              </button>
              <button
                onClick={() => setActiveTab("roles")}
                className={`px-4 py-2 ${
                  activeTab === "roles"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-600"
                }`}
              >
                Role Management
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-6">
        {activeTab === "users" ? <UserManagement /> : <RoleManagement />}
      </main>
    </div>
  );
};

export default Layout;
