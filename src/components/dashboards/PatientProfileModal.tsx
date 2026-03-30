import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import {
  User, Heart, Calendar, Stethoscope, Pill, FileText, CreditCard,
  Phone, Mail, MapPin, Droplets, Activity, Clock, CheckCircle2, AlertCircle,
  TrendingUp, Shield,
} from "lucide-react";

// ── Dummy Data ──────────────────────────────────────────────────────────

const patientInfo = {
  name: "Rajesh Kumar",
  id: "PAT-2025-001",
  age: 45,
  gender: "Male",
  bloodGroup: "B+",
  phone: "+91 98765 43210",
  email: "rajesh.kumar@email.com",
  address: "42, MG Road, Bangalore, Karnataka",
  emergencyContact: "Priya Kumar — +91 87654 32109",
  allergies: ["Penicillin", "Sulfa Drugs"],
  chronicConditions: ["Type 2 Diabetes", "Hypertension"],
};

const consultationHistory = [
  { id: "CON-101", date: "2025-03-08", doctor: "Dr. Anand Rao", dept: "Cardiology", diagnosis: "Mild Angina", status: "Completed", notes: "Stress test recommended" },
  { id: "CON-098", date: "2025-02-20", doctor: "Dr. Meera Iyer", dept: "Neurology", diagnosis: "Migraine", status: "Completed", notes: "MRI clear, prescribed Sumatriptan" },
  { id: "CON-085", date: "2025-01-15", doctor: "Dr. Anand Rao", dept: "Cardiology", diagnosis: "Routine Checkup", status: "Completed", notes: "BP slightly elevated" },
  { id: "CON-072", date: "2024-11-10", doctor: "Dr. Sanjay Gupta", dept: "Endocrinology", diagnosis: "Diabetes Review", status: "Completed", notes: "HbA1c improved to 6.8" },
  { id: "CON-060", date: "2024-09-05", doctor: "Dr. Kavitha Nair", dept: "Orthopedics", diagnosis: "Knee Pain", status: "Completed", notes: "Physiotherapy advised" },
  { id: "CON-115", date: "2025-03-20", doctor: "Dr. Anand Rao", dept: "Cardiology", diagnosis: "Follow-up Angina", status: "Upcoming", notes: "" },
];

const medicines = [
  { name: "Amlodipine 5mg", dosage: "1 tablet", frequency: "Once daily (morning)", doctor: "Dr. Anand Rao", startDate: "2025-01-15", endDate: "Ongoing", status: "Active" },
  { name: "Metformin 500mg", dosage: "1 tablet", frequency: "Twice daily", doctor: "Dr. Sanjay Gupta", startDate: "2024-06-01", endDate: "Ongoing", status: "Active" },
  { name: "Atorvastatin 10mg", dosage: "1 tablet", frequency: "Once daily (night)", doctor: "Dr. Anand Rao", startDate: "2025-02-01", endDate: "Ongoing", status: "Active" },
  { name: "Sumatriptan 50mg", dosage: "1 tablet", frequency: "As needed", doctor: "Dr. Meera Iyer", startDate: "2025-02-20", endDate: "2025-05-20", status: "Active" },
  { name: "Omeprazole 20mg", dosage: "1 capsule", frequency: "Once daily (before breakfast)", doctor: "Dr. Anand Rao", startDate: "2024-09-01", endDate: "2025-01-01", status: "Completed" },
];

const medicalRecords = [
  { date: "2025-03-08", type: "Lab Report", name: "Complete Blood Count", result: "Normal", doctor: "Dr. Anand Rao" },
  { date: "2025-03-07", type: "Imaging", name: "Chest X-Ray", result: "Clear", doctor: "Dr. Anand Rao" },
  { date: "2025-02-20", type: "Imaging", name: "Brain MRI", result: "No abnormalities", doctor: "Dr. Meera Iyer" },
  { date: "2025-01-15", type: "Lab Report", name: "Lipid Profile", result: "LDL slightly high", doctor: "Dr. Anand Rao" },
  { date: "2024-11-10", type: "Lab Report", name: "HbA1c", result: "6.8% (Improved)", doctor: "Dr. Sanjay Gupta" },
  { date: "2024-09-05", type: "Imaging", name: "Knee X-Ray", result: "Mild degeneration", doctor: "Dr. Kavitha Nair" },
];

const billingHistory = [
  { id: "INV-3045", date: "2025-03-08", description: "Cardiology Consultation + CBC + X-Ray", amount: 3200, status: "Paid" },
  { id: "INV-2987", date: "2025-02-20", description: "Neurology Consultation + MRI", amount: 8500, status: "Paid" },
  { id: "INV-2850", date: "2025-01-15", description: "Cardiology Consultation + Lipid Profile", amount: 2100, status: "Paid" },
  { id: "INV-2650", date: "2024-11-10", description: "Endocrinology Consultation + HbA1c", amount: 1800, status: "Paid" },
  { id: "INV-2480", date: "2024-09-05", description: "Orthopedic Consultation + X-Ray", amount: 2450, status: "Pending" },
  { id: "INV-3100", date: "2025-03-20", description: "Upcoming Cardiology Follow-up", amount: 1500, status: "Pending" },
];

// ── Helpers ─────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string; color: string }) {
  return (
    <Card className="shadow-card">
      <CardContent className="p-4 flex items-center gap-3">
        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${color} bg-opacity-10`} style={{ backgroundColor: "var(--muted)" }}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xl font-bold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Main Component ──────────────────────────────────────────────────────

interface PatientProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PatientProfileModal({ open, onOpenChange }: PatientProfileModalProps) {
  const { user } = useAuth();
  const initials = user?.name?.split(" ").map((n) => n[0]).join("") ?? "?";

  const totalPaid = billingHistory.filter((b) => b.status === "Paid").reduce((s, b) => s + b.amount, 0);
  const totalPending = billingHistory.filter((b) => b.status === "Pending").reduce((s, b) => s + b.amount, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Patient Profile</DialogTitle>
          <DialogDescription className="sr-only">Detailed patient profile information</DialogDescription>
        </DialogHeader>

        {/* ── Profile Header ───────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center gap-5 pb-5 border-b border-border">
          {/* Avatar */}
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shrink-0">
            <span className="text-2xl font-bold text-white">{initials}</span>
          </div>

          {/* Info grid */}
          <div className="flex-1 w-full">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-foreground">{patientInfo.name}</h2>
              <Badge variant="secondary" className="font-mono text-xs">{patientInfo.id}</Badge>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-1.5 gap-x-4 text-sm text-muted-foreground mt-2">
              <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" />{patientInfo.age}y · {patientInfo.gender}</span>
              <span className="flex items-center gap-1.5"><Droplets className="h-3.5 w-3.5 text-destructive" />{patientInfo.bloodGroup}</span>
              <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" />{patientInfo.phone}</span>
              <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" />{patientInfo.email}</span>
              <span className="flex items-center gap-1.5 col-span-2"><MapPin className="h-3.5 w-3.5" />{patientInfo.address}</span>
            </div>
            {/* Allergies & Conditions */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {patientInfo.allergies.map((a) => (
                <Badge key={a} variant="destructive" className="text-[10px] font-medium">⚠ {a}</Badge>
              ))}
              {patientInfo.chronicConditions.map((c) => (
                <Badge key={c} variant="outline" className="text-[10px] font-medium border-warning text-warning">{c}</Badge>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tabs ──────────────────────────────────────────────── */}
        <Tabs defaultValue="overview" className="mt-2">
          <TabsList className="w-full grid grid-cols-5">
            <TabsTrigger value="overview" className="text-xs sm:text-sm gap-1"><Activity className="h-3.5 w-3.5 hidden sm:block" />Overview</TabsTrigger>
            <TabsTrigger value="consultations" className="text-xs sm:text-sm gap-1"><Stethoscope className="h-3.5 w-3.5 hidden sm:block" />Consultations</TabsTrigger>
            <TabsTrigger value="medicines" className="text-xs sm:text-sm gap-1"><Pill className="h-3.5 w-3.5 hidden sm:block" />Medicines</TabsTrigger>
            <TabsTrigger value="records" className="text-xs sm:text-sm gap-1"><FileText className="h-3.5 w-3.5 hidden sm:block" />Records</TabsTrigger>
            <TabsTrigger value="billing" className="text-xs sm:text-sm gap-1"><CreditCard className="h-3.5 w-3.5 hidden sm:block" />Billing</TabsTrigger>
          </TabsList>

          {/* ── OVERVIEW ─────────────────────────────── */}
          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard icon={Calendar} label="Total Visits" value={String(consultationHistory.filter((c) => c.status === "Completed").length)} color="text-primary" />
              <StatCard icon={Pill} label="Active Medicines" value={String(medicines.filter((m) => m.status === "Active").length)} color="text-warning" />
              <StatCard icon={Clock} label="Last Visit" value="Mar 8" color="text-secondary" />
              <StatCard icon={CreditCard} label="Pending Bills" value={`₹${totalPending.toLocaleString()}`} color="text-destructive" />
            </div>

            {/* Recent activity */}
            <Card className="shadow-card">
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5"><TrendingUp className="h-4 w-4 text-primary" />Recent Activity</h3>
                <div className="space-y-2.5">
                  {consultationHistory.slice(0, 3).map((c) => (
                    <div key={c.id} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50 text-sm">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Stethoscope className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{c.doctor} — {c.dept}</p>
                          <p className="text-xs text-muted-foreground">{c.diagnosis}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{c.date}</p>
                        <Badge variant={c.status === "Completed" ? "secondary" : "default"} className="mt-0.5 text-[10px]">{c.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── CONSULTATIONS ────────────────────────── */}
          <TabsContent value="consultations" className="mt-4">
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/60">
                    <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Doctor</th>
                    <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Department</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Diagnosis</th>
                    <th className="text-left p-3 font-medium text-muted-foreground hidden lg:table-cell">Notes</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {consultationHistory.map((c) => (
                    <tr key={c.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                      <td className="p-3 text-foreground whitespace-nowrap">{c.date}</td>
                      <td className="p-3 text-foreground font-medium">{c.doctor}</td>
                      <td className="p-3 text-muted-foreground hidden md:table-cell">{c.dept}</td>
                      <td className="p-3 text-foreground">{c.diagnosis}</td>
                      <td className="p-3 text-muted-foreground text-xs hidden lg:table-cell">{c.notes || "—"}</td>
                      <td className="p-3 text-center">
                        <Badge variant={c.status === "Completed" ? "secondary" : "default"} className="text-[10px]">
                          {c.status === "Completed" ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                          {c.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* ── MEDICINES ─────────────────────────────── */}
          <TabsContent value="medicines" className="mt-4">
            <div className="space-y-3">
              {medicines.map((m) => (
                <div key={m.name + m.startDate} className="flex items-start gap-4 p-4 rounded-lg border border-border hover:shadow-card transition-shadow">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${m.status === "Active" ? "bg-primary/10" : "bg-muted"}`}>
                    <Pill className={`h-5 w-5 ${m.status === "Active" ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-foreground">{m.name}</p>
                      <Badge variant={m.status === "Active" ? "default" : "secondary"} className="text-[10px]">{m.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{m.dosage} · {m.frequency}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Stethoscope className="h-3 w-3" />{m.doctor}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{m.startDate} → {m.endDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* ── MEDICAL RECORDS ───────────────────────── */}
          <TabsContent value="records" className="mt-4">
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/60">
                    <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Type</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Test / Report</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Result</th>
                    <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Ordered By</th>
                  </tr>
                </thead>
                <tbody>
                  {medicalRecords.map((r, i) => (
                    <tr key={i} className="border-t border-border hover:bg-muted/30 transition-colors">
                      <td className="p-3 text-foreground whitespace-nowrap">{r.date}</td>
                      <td className="p-3">
                        <Badge variant="outline" className="text-[10px]">
                          {r.type === "Lab Report" ? <FileText className="h-3 w-3 mr-1" /> : <Shield className="h-3 w-3 mr-1" />}
                          {r.type}
                        </Badge>
                      </td>
                      <td className="p-3 font-medium text-foreground">{r.name}</td>
                      <td className="p-3 text-foreground">{r.result}</td>
                      <td className="p-3 text-muted-foreground hidden md:table-cell">{r.doctor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* ── BILLING ───────────────────────────────── */}
          <TabsContent value="billing" className="space-y-4 mt-4">
            {/* Summary */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="shadow-card">
                <CardContent className="p-4 flex items-center gap-3">
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-lg font-bold text-foreground">₹{totalPaid.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Total Paid</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="p-4 flex items-center gap-3">
                  <AlertCircle className="h-8 w-8 text-destructive" />
                  <div>
                    <p className="text-lg font-bold text-foreground">₹{totalPending.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Pending</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Table */}
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/60">
                    <th className="text-left p-3 font-medium text-muted-foreground">Invoice</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Description</th>
                    <th className="text-right p-3 font-medium text-muted-foreground">Amount</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map((b) => (
                    <tr key={b.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                      <td className="p-3 font-mono text-xs text-foreground">{b.id}</td>
                      <td className="p-3 text-foreground whitespace-nowrap">{b.date}</td>
                      <td className="p-3 text-foreground">{b.description}</td>
                      <td className="p-3 text-right font-semibold text-foreground">₹{b.amount.toLocaleString()}</td>
                      <td className="p-3 text-center">
                        <Badge
                          variant={b.status === "Paid" ? "secondary" : "destructive"}
                          className="text-[10px]"
                        >
                          {b.status === "Paid" ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                          {b.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
