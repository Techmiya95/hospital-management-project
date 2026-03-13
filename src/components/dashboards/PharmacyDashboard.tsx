import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pill, Search, Package, CheckCircle, AlertTriangle } from "lucide-react";
import { useState } from "react";

const prescriptions = [
  { id: "RX-001", patient: "Rajesh Kumar", patientId: "PAT-2025-001", medicines: ["Amlodipine 5mg", "Metformin 500mg"], doctor: "Dr. Anand Rao", status: "Pending" },
  { id: "RX-002", patient: "Priya Nair", patientId: "PAT-2025-012", medicines: ["Sumatriptan 50mg"], doctor: "Dr. Meera Iyer", status: "Dispensed" },
  { id: "RX-003", patient: "Arun Singh", patientId: "PAT-2025-008", medicines: ["Glimepiride 2mg", "Metformin 500mg"], doctor: "Dr. Anand Rao", status: "Pending" },
];

const inventory = [
  { name: "Amlodipine 5mg", stock: 240, threshold: 50, status: "OK" },
  { name: "Metformin 500mg", stock: 180, threshold: 50, status: "OK" },
  { name: "Sumatriptan 50mg", stock: 12, threshold: 20, status: "Low" },
  { name: "Glimepiride 2mg", stock: 95, threshold: 30, status: "OK" },
];

export default function PharmacyDashboard() {
  const [search, setSearch] = useState("");
  const filtered = prescriptions.filter(p =>
    p.patientId.toLowerCase().includes(search.toLowerCase()) ||
    p.patient.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Pharmacy</h1>
        <div className="flex items-center gap-2 w-80">
          <Input placeholder="Search Patient ID..." value={search} onChange={e => setSearch(e.target.value)} />
          <Button variant="default" size="icon"><Search className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Pending Prescriptions", value: prescriptions.filter(p => p.status === "Pending").length, icon: Pill, color: "text-warning" },
          { label: "Dispensed Today", value: prescriptions.filter(p => p.status === "Dispensed").length, icon: CheckCircle, color: "text-success" },
          { label: "Low Stock Items", value: inventory.filter(i => i.status === "Low").length, icon: AlertTriangle, color: "text-destructive" },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Pill className="h-5 w-5 text-primary" /> Prescriptions</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {filtered.map(p => (
              <div key={p.id} className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-foreground">{p.patient}</p>
                    <p className="text-sm text-muted-foreground">{p.patientId} · {p.doctor}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={p.status === "Pending" ? "default" : "secondary"}>{p.status}</Badge>
                    {p.status === "Pending" && <Button size="sm" variant="success">Dispense</Button>}
                  </div>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {p.medicines.map(m => (
                    <Badge key={m} variant="outline" className="text-xs">{m}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Package className="h-5 w-5 text-secondary" /> Inventory</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {inventory.map(i => (
              <div key={i.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium text-sm text-foreground">{i.name}</p>
                  <p className="text-xs text-muted-foreground">Threshold: {i.threshold}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-foreground">{i.stock}</span>
                  {i.status === "Low" && <Badge variant="destructive">Low Stock</Badge>}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
