import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Activity, LogOut, User, Stethoscope, FlaskConical, Pill, CreditCard,
  ShieldCheck, LayoutDashboard, Calendar, FileText, Settings, Bell,
} from "lucide-react";

const roleConfig = {
  patient: { label: "Patient", icon: User, color: "text-primary" },
  admin: { label: "Admin", icon: ShieldCheck, color: "text-primary" },
  doctor: { label: "Doctor", icon: Stethoscope, color: "text-primary" },
  lab: { label: "Lab Staff", icon: FlaskConical, color: "text-primary" },
  pharmacy: { label: "Pharmacist", icon: Pill, color: "text-primary" },
  billing: { label: "Billing", icon: CreditCard, color: "text-primary" },
};

const sidebarItems = {
  patient: [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: Calendar, label: "Appointments" },
    { icon: FileText, label: "Reports" },
    { icon: Pill, label: "Prescriptions" },
    { icon: CreditCard, label: "Billing" },
  ],
  admin: [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: User, label: "Patients" },
    { icon: Stethoscope, label: "Doctors" },
    { icon: Calendar, label: "Schedules" },
    { icon: Settings, label: "Settings" },
  ],
  doctor: [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: User, label: "Patients" },
    { icon: Calendar, label: "Schedule" },
    { icon: FileText, label: "Prescriptions" },
    { icon: FlaskConical, label: "Lab Orders" },
  ],
  lab: [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: FlaskConical, label: "Tests" },
    { icon: FileText, label: "Reports" },
    { icon: User, label: "Patients" },
  ],
  pharmacy: [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: Pill, label: "Dispense" },
    { icon: FileText, label: "Inventory" },
    { icon: User, label: "Patients" },
  ],
  billing: [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: CreditCard, label: "Invoices" },
    { icon: User, label: "Patients" },
    { icon: FileText, label: "Reports" },
  ],
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const config = roleConfig[user.role];
  const items = sidebarItems[user.role];
  const RoleIcon = config.icon;

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="font-bold text-foreground font-display">MediFlow AI</span>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {items.map((item, i) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                i === 0 ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <RoleIcon className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground">{config.label}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground" onClick={() => { logout(); navigate("/"); }}>
            <LogOut className="h-4 w-4 mr-2" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6">
          <h2 className="font-semibold text-foreground">{config.label} Dashboard</h2>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-muted text-muted-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
            </button>
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
