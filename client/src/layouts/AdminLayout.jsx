import { Outlet } from "react-router-dom";

import Sidebar from "../admin/components/Sidebar";

const AdminLayout = () => {

  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">

        <Outlet />

      </div>

    </div>
  );
};

export default AdminLayout;