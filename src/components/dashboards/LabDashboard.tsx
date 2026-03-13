import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FlaskConical, Search, Upload, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

const tests = [
  { id: "TST-001", patient: "Rajesh Kumar", patientId: "PAT-2025-001", test: "Complete Blood Count", doctor: "Dr. Anand Rao", status: "Pending", priority: "Urgent" },
  { id: "TST-002", patient: "Priya Nair", patientId: "PAT-2025-012", test: "MRI Brain", doctor: "Dr. Meera Iyer", status: "In Progress", priority: "Normal" },
  { id: "TST-003", patient: "Arun Singh", patientId: "PAT-2025-008", test: "HbA1c", doctor: "Dr. Anand Rao", status: "Completed", priority: "Normal" },
  { id: "TST-004", patient: "Meena Devi", patientId: "PAT-2025-015", test: "X-Ray Knee", doctor: "Dr. Vikram", status: "Pending", priority: "Normal" },
];

const statusIcon = { Pending: AlertCircle, "In Progress": Clock, Completed: CheckCircle };
const statusColor = { Pending: "text-warning", "In Progress": "text-primary", Completed: "text-success" };

export default function LabDashboard() {
  const [search, setSearch] = useState("");

  const filtered = tests.filter(t =>
    t.patientId.toLowerCase().includes(search.toLowerCase()) ||
    t.patient.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Diagnostics Lab</h1>
        <div className="flex items-center gap-2 w-80">
          <Input placeholder="Search Patient ID..." value={search} onChange={e => setSearch(e.target.value)} />
          <Button variant="default" size="icon"><Search className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Pending Tests", value: tests.filter(t => t.status === "Pending").length, icon: AlertCircle, color: "text-warning" },
          { label: "In Progress", value: tests.filter(t => t.status === "In Progress").length, icon: Clock, color: "text-primary" },
          { label: "Completed Today", value: tests.filter(t => t.status === "Completed").length, icon: CheckCircle, color: "text-success" },
        ].map(s => (
          <Card key={s.label} className="shadow-card">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><FlaskConical className="h-5 w-5 text-primary" /> Test Requests</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {filtered.map(t => {
            const Icon = statusIcon[t.status as keyof typeof statusIcon];
            return (
              <div key={t.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Icon className={`h-5 w-5 ${statusColor[t.status as keyof typeof statusColor]}`} />
                  <div>
                    <p className="font-medium text-foreground">{t.test}</p>
                    <p className="text-sm text-muted-foreground">{t.patient} · {t.patientId} · {t.doctor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {t.priority === "Urgent" && <Badge variant="destructive">Urgent</Badge>}
                  <Badge variant={t.status === "Completed" ? "secondary" : "default"}>{t.status}</Badge>
                  {t.status !== "Completed" && (
                    <Button size="sm" variant="outline"><Upload className="h-3 w-3 mr-1" /> Upload</Button>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
