import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { Users, Search, FileText, FlaskConical, Clock, Pill } from "lucide-react";
import { useState } from "react";

const patients = [
  { id: "PAT-2025-001", name: "Rajesh Kumar", age: 45, issue: "Chest Pain", time: "10:30 AM", status: "Waiting" },
  { id: "PAT-2025-012", name: "Priya Nair", age: 32, issue: "Migraine", time: "11:00 AM", status: "In Progress" },
  { id: "PAT-2025-008", name: "Arun Singh", age: 58, issue: "Diabetes Follow-up", time: "11:30 AM", status: "Waiting" },
  { id: "PAT-2025-015", name: "Meena Devi", age: 67, issue: "Joint Pain", time: "12:00 PM", status: "Completed" },
];

const timeline = [
  { date: "Mar 8, 2025", event: "Blood Test - CBC", type: "test" },
  { date: "Mar 7, 2025", event: "Consultation - Chest Pain", type: "consultation" },
  { date: "Mar 5, 2025", event: "Amlodipine 5mg prescribed", type: "prescription" },
  { date: "Mar 1, 2025", event: "ECG Test", type: "test" },
];

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [searchId, setSearchId] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Good Morning, {user?.name}</h1>
          <p className="text-muted-foreground">You have {patients.filter(p => p.status !== "Completed").length} patients today</p>
        </div>
        <div className="flex items-center gap-2 w-80">
          <Input placeholder="Search Patient ID..." value={searchId} onChange={e => setSearchId(e.target.value)} className="flex-1" />
          <Button variant="default" size="icon"><Search className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Today's Patients", value: patients.length.toString(), icon: Users },
          { label: "Pending Consultations", value: patients.filter(p => p.status === "Waiting").length.toString(), icon: Clock },
          { label: "Lab Orders", value: "3", icon: FlaskConical },
        ].map((s) => (
          <Card key={s.label} className="shadow-card">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Today's Patients</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {patients.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {p.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{p.name}</p>
                      <p className="text-sm text-muted-foreground">{p.id} · Age {p.age} · {p.issue}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{p.time}</p>
                    <Badge variant={p.status === "Waiting" ? "default" : p.status === "In Progress" ? "secondary" : "outline"} className="mt-1">
                      {p.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><FileText className="h-5 w-5 text-secondary" /> Patient Timeline</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">PAT-2025-001 · Rajesh Kumar</p>
            <div className="space-y-4">
              {timeline.map((t, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`h-3 w-3 rounded-full ${t.type === "test" ? "bg-secondary" : t.type === "prescription" ? "bg-warning" : "bg-primary"}`} />
                    {i < timeline.length - 1 && <div className="w-px h-full bg-border" />}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium text-foreground">{t.event}</p>
                    <p className="text-xs text-muted-foreground">{t.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="default"><Pill className="h-3 w-3 mr-1" /> Prescribe</Button>
              <Button size="sm" variant="outline"><FlaskConical className="h-3 w-3 mr-1" /> Order Test</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
