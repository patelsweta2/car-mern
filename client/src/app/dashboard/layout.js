import Navbar from "@/components/Navbar";
import PrivateRoute from "@/components/PrivateRoute";
const DashboardLayout = ({ children }) => {
  return (
    <div className="h-[100vh] flex flex-col bg-base-300">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <PrivateRoute>{children}</PrivateRoute>
      </main>
    </div>
  );
};

export default DashboardLayout;
