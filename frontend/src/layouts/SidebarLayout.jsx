import Sidebar from "../components/common/Sidebar";
import { Outlet } from "react-router-dom";

const SidebarLayout = () => {
  return (
    <div className='flex h-screen overflow-hidden relative'>
      <Sidebar />
      <div className="flex-1 relative z-10  overflow-y-auto">
        <Outlet /> {/* Nested Routes Render Here */}
      </div>
    </div>
  );
};

export default SidebarLayout;
