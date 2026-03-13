import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, FileText, Pill, CreditCard, Clock, User } from "lucide-react";

const appointments = [
  { id: "APT-001", doctor: "Dr. Anand Rao", dept: "Cardiology", date: "2025-03-11", time: "10:30 AM", status: "Upcoming" },
  { id: "APT-002", doctor: "Dr. Meera Iyer", dept: "Neurology", date: "2025-03-08", time: "2:00 PM", status: "Completed" },
];

const reports = [
  { name: "Complete Blood Count", date: "2025-03-08", status: "Ready" },
  { name: "Chest X-Ray", date: "2025-03-07", status: "Ready" },
];

const prescriptions = [
  { medicine: "Amlodipine 5mg", dosage: "1 tablet daily", doctor: "Dr. Anand Rao" },
  { medicine: "Metformin 500mg", dosage: "2 tablets daily", doctor: "Dr. Anand Rao" },
];

export default function PatientDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground">Patient ID: <span className="font-mono text-primary">{user?.id}</span></p>
        </div>
        <Button variant="hero">Book Appointment</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Upcoming Appointments", value: "1", icon: Calendar, color: "text-primary" },
          { label: "Lab Reports", value: "2", icon: FileText, color: "text-secondary" },
          { label: "Active Prescriptions", value: "2", icon: Pill, color: "text-warning" },
          { label: "Pending Bills", value: "₹2,450", icon: CreditCard, color: "text-destructive" },
        ].map((s) => (
          <Card key={s.label} className="shadow-card">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`h-10 w-10 rounded-lg bg-muted flex items-center justify-center ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Appointments */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" /> Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {appointments.map((a) => (
              <div key={a.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{a.doctor}</p>
                    <p className="text-sm text-muted-foreground">{a.dept}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" /> {a.date} · {a.time}
                  </div>
                  <Badge variant={a.status === "Upcoming" ? "default" : "secondary"} className="mt-1">
                    {a.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reports & Prescriptions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><FileText className="h-5 w-5 text-secondary" /> Lab Reports</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {reports.map((r) => (
              <div key={r.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium text-sm text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.date}</p>
                </div>
                <Badge variant="secondary" className="bg-accent text-accent-foreground">{r.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Pill className="h-5 w-5 text-warning" /> Prescriptions</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {prescriptions.map((p) => (
              <div key={p.medicine} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium text-sm text-foreground">{p.medicine}</p>
                  <p className="text-xs text-muted-foreground">{p.dosage}</p>
                </div>
                <p className="text-xs text-muted-foreground">{p.doctor}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
