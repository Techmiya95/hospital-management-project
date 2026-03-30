import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import PatientDashboard from "@/components/dashboards/PatientDashboard";
import AdminDashboard from "@/components/dashboards/AdminDashboard";
import DoctorDashboard from "@/components/dashboards/DoctorDashboard";
import LabDashboard from "@/components/dashboards/LabDashboard";
import PharmacyDashboard from "@/components/dashboards/PharmacyDashboard";
import BillingDashboard from "@/components/dashboards/BillingDashboard";
import DoctorPatientLookup from "@/components/dashboards/DoctorPatientLookup";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Navigate } from "react-router-dom";

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const [sidebarIndex, setSidebarIndex] = useState(0);

  if (!isAuthenticated || !user) return <Navigate to="/login" />;

  // Determine content based on sidebar selection for doctor role
  function getDoctorContent() {
    switch (sidebarIndex) {
      case 1: return <DoctorPatientLookup />;   // "Patients"
      default: return <DoctorDashboard />;       // "Dashboard" and others
    }
  }

  const dashboardMap = {
    patient: <PatientDashboard />,
    admin: <AdminDashboard />,
    doctor: getDoctorContent(),
    lab: <LabDashboard />,
    pharmacy: <PharmacyDashboard />,
    billing: <BillingDashboard />,
  };

  return (
    <DashboardLayout
      activeSidebarIndex={sidebarIndex}
      onSidebarClick={(index) => setSidebarIndex(index)}
    >
      {dashboardMap[user.role]}
    </DashboardLayout>
  );
}
