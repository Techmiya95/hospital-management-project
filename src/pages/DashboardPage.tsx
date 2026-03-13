import { useAuth } from "@/contexts/AuthContext";
import PatientDashboard from "@/components/dashboards/PatientDashboard";
import AdminDashboard from "@/components/dashboards/AdminDashboard";
import DoctorDashboard from "@/components/dashboards/DoctorDashboard";
import LabDashboard from "@/components/dashboards/LabDashboard";
import PharmacyDashboard from "@/components/dashboards/PharmacyDashboard";
import BillingDashboard from "@/components/dashboards/BillingDashboard";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Navigate } from "react-router-dom";

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) return <Navigate to="/login" />;

  const dashboardMap = {
    patient: <PatientDashboard />,
    admin: <AdminDashboard />,
    doctor: <DoctorDashboard />,
    lab: <LabDashboard />,
    pharmacy: <PharmacyDashboard />,
    billing: <BillingDashboard />,
  };

  return (
    <DashboardLayout>
      {dashboardMap[user.role]}
    </DashboardLayout>
  );
}
