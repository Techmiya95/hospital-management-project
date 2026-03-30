import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Search, User, AlertCircle, Phone, Mail, MapPin, Droplets, Ruler, Weight,
  CreditCard, Heart, Stethoscope, Pill, FileText, Calendar, Clock,
  CheckCircle2, Upload, MessageSquare, Plus, X, ArrowLeft,
} from "lucide-react";

// ── Dummy patient registry (same data as kiosk registration) ────────

interface PatientRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  dob: string;
  gender: string;
  address: string;
  bloodGroup: string;
  height: string;
  weight: string;
  cardType: string;
  cardNumber: string;
  problemDescription: string;
  allergies: string[];
  existingConditions: string[];
  registeredOn: string;
}

const PATIENT_REGISTRY: Record<string, PatientRecord> = {
  "PAT-2025-001": {
    id: "PAT-2025-001", name: "Rajesh Kumar", phone: "+91 98765 43210",
    email: "rajesh.kumar@email.com", dob: "1980-05-14", gender: "Male",
    address: "42, MG Road, Bangalore, Karnataka", bloodGroup: "B+",
    height: "172", weight: "78", cardType: "none", cardNumber: "",
    problemDescription: "Chronic chest pain on exertion, occasional shortness of breath",
    allergies: ["Penicillin", "Sulfa Drugs"],
    existingConditions: ["Type 2 Diabetes", "Hypertension"],
    registeredOn: "2024-06-15",
  },
  "PAT-2025-002": {
    id: "PAT-2025-002", name: "Priya Sharma", phone: "+91 87654 32109",
    email: "priya.sharma@email.com", dob: "1995-11-22", gender: "Female",
    address: "15, Jayanagar, Bangalore", bloodGroup: "A+",
    height: "160", weight: "55", cardType: "bpl", cardNumber: "BPL-7890123",
    problemDescription: "Frequent headaches and dizziness for the past month",
    allergies: [],
    existingConditions: ["Migraine"],
    registeredOn: "2024-09-10",
  },
  "PAT-2025-003": {
    id: "PAT-2025-003", name: "Arun Mehta", phone: "+91 76543 21098",
    email: "arun.mehta@email.com", dob: "1967-03-08", gender: "Male",
    address: "78, Koramangala, Bangalore", bloodGroup: "O+",
    height: "168", weight: "82", cardType: "apl", cardNumber: "APL-4561234",
    problemDescription: "Diabetes follow-up, recent numbness in feet",
    allergies: ["Aspirin"],
    existingConditions: ["Type 2 Diabetes", "Peripheral Neuropathy"],
    registeredOn: "2023-12-01",
  },
};

// ── Component ───────────────────────────────────────────────────────────

export default function DoctorPatientLookup() {
  const [searchId, setSearchId] = useState("");
  const [error, setError] = useState("");
  const [patient, setPatient] = useState<PatientRecord | null>(null);

  // Doctor actions state
  const [prescriptions, setPrescriptions] = useState<
    { medicine: string; dosage: string; frequency: string; duration: string }[]
  >([]);
  const [newPrescription, setNewPrescription] = useState({ medicine: "", dosage: "", frequency: "", duration: "" });
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [doctorNotes, setDoctorNotes] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  function handleSearch() {
    const id = searchId.trim().toUpperCase();
    if (!id) { setError("Please enter a Patient ID"); return; }
    const found = PATIENT_REGISTRY[id];
    if (!found) { setError("Patient ID not found. Please verify the ID."); return; }
    setError("");
    setPatient(found);
    setPrescriptions([]);
    setDoctorNotes("");
    setDiagnosis("");
    setSavedMessage("");
  }

  function addPrescription() {
    if (!newPrescription.medicine.trim()) return;
    setPrescriptions((prev) => [...prev, { ...newPrescription }]);
    setNewPrescription({ medicine: "", dosage: "", frequency: "", duration: "" });
    setShowPrescriptionForm(false);
  }

  function removePrescription(idx: number) {
    setPrescriptions((prev) => prev.filter((_, i) => i !== idx));
  }

  function handleSave() {
    setSavedMessage("Patient record updated successfully!");
    setTimeout(() => setSavedMessage(""), 3000);
  }

  // ── Patient Details View ────────────────────────────────────────────
  if (patient) {
    const age = new Date().getFullYear() - new Date(patient.dob).getFullYear();

    return (
      <div className="space-y-6">
        {/* Back + header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setPatient(null)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">Patient Record</h1>
            <p className="text-muted-foreground text-sm">Viewing details for <span className="font-mono text-primary">{patient.id}</span></p>
          </div>
          {savedMessage && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100 text-green-700 text-sm font-medium animate-in fade-in duration-300">
              <CheckCircle2 className="h-4 w-4" />{savedMessage}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Left: Patient Info (2 cols) ────────────────────── */}
          <div className="lg:col-span-2 space-y-5">
            {/* Profile card */}
            <Card className="shadow-card">
              <CardContent className="p-5">
                <div className="flex items-start gap-5">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-xl font-bold shrink-0">
                    {patient.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h2 className="text-xl font-bold text-foreground">{patient.name}</h2>
                      <Badge variant="secondary" className="font-mono text-xs">{patient.id}</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-1.5 gap-x-4 text-sm text-muted-foreground mt-2">
                      <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" />{age}y · {patient.gender}</span>
                      <span className="flex items-center gap-1.5"><Droplets className="h-3.5 w-3.5 text-destructive" />{patient.bloodGroup}</span>
                      <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" />{patient.phone}</span>
                      <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" />{patient.email}</span>
                      <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />DOB: {patient.dob}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{patient.address}</span>
                    </div>
                    {/* Allergies & Conditions */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {patient.allergies.map((a) => (
                        <Badge key={a} variant="destructive" className="text-[10px]">⚠ {a}</Badge>
                      ))}
                      {patient.existingConditions.map((c) => (
                        <Badge key={c} variant="outline" className="text-[10px] border-warning text-warning">{c}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Physical & Registration info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: Ruler, label: "Height", value: `${patient.height} cm` },
                { icon: Weight, label: "Weight", value: `${patient.weight} kg` },
                { icon: CreditCard, label: "Card", value: patient.cardType !== "none" ? `${patient.cardType.toUpperCase()} — ${patient.cardNumber}` : "N/A" },
                { icon: Calendar, label: "Registered", value: patient.registeredOn },
              ].map((s) => (
                <Card key={s.label} className="shadow-card">
                  <CardContent className="p-3 flex items-center gap-2.5">
                    <s.icon className="h-4 w-4 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                      <p className="text-sm font-semibold text-foreground">{s.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Problem description */}
            <Card className="shadow-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2"><Heart className="h-4 w-4 text-destructive" />Chief Complaint</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground text-sm leading-relaxed">{patient.problemDescription}</p>
              </CardContent>
            </Card>

            {/* Prescriptions added by doctor */}
            <Card className="shadow-card">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm flex items-center gap-2"><Pill className="h-4 w-4 text-warning" />Prescriptions</CardTitle>
                  <Button size="sm" variant="outline" className="gap-1 text-xs" onClick={() => setShowPrescriptionForm(true)}>
                    <Plus className="h-3 w-3" /> Add Medicine
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {prescriptions.length === 0 && !showPrescriptionForm && (
                  <p className="text-sm text-muted-foreground text-center py-4">No prescriptions added yet. Click "Add Medicine" to prescribe.</p>
                )}
                {prescriptions.map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Pill className="h-4 w-4 text-primary shrink-0" />
                      <div>
                        <p className="font-medium text-sm text-foreground">{p.medicine}</p>
                        <p className="text-xs text-muted-foreground">{p.dosage} · {p.frequency} · {p.duration}</p>
                      </div>
                    </div>
                    <button onClick={() => removePrescription(i)} className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-destructive transition-colors">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}

                {/* Inline prescription form */}
                {showPrescriptionForm && (
                  <div className="p-4 rounded-lg border border-primary/30 bg-primary/5 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Medicine Name *</Label>
                        <Input placeholder="e.g. Amlodipine 5mg" value={newPrescription.medicine}
                          onChange={(e) => setNewPrescription((prev) => ({ ...prev, medicine: e.target.value }))} className="h-9 text-sm" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Dosage</Label>
                        <Input placeholder="e.g. 1 tablet" value={newPrescription.dosage}
                          onChange={(e) => setNewPrescription((prev) => ({ ...prev, dosage: e.target.value }))} className="h-9 text-sm" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Frequency</Label>
                        <Input placeholder="e.g. Twice daily" value={newPrescription.frequency}
                          onChange={(e) => setNewPrescription((prev) => ({ ...prev, frequency: e.target.value }))} className="h-9 text-sm" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Duration</Label>
                        <Input placeholder="e.g. 30 days" value={newPrescription.duration}
                          onChange={(e) => setNewPrescription((prev) => ({ ...prev, duration: e.target.value }))} className="h-9 text-sm" />
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button size="sm" variant="ghost" onClick={() => setShowPrescriptionForm(false)}>Cancel</Button>
                      <Button size="sm" variant="default" onClick={addPrescription}>Add</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* ── Right: Doctor Actions (1 col) ─────────────────── */}
          <div className="space-y-5">
            {/* Diagnosis */}
            <Card className="shadow-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2"><Stethoscope className="h-4 w-4 text-primary" />Diagnosis</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter your diagnosis..."
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="text-sm min-h-[80px]"
                />
              </CardContent>
            </Card>

            {/* Doctor Notes */}
            <Card className="shadow-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2"><MessageSquare className="h-4 w-4 text-secondary" />Doctor's Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add your comments and observations..."
                  value={doctorNotes}
                  onChange={(e) => setDoctorNotes(e.target.value)}
                  className="text-sm min-h-[100px]"
                />
              </CardContent>
            </Card>

            {/* Upload Prescription */}
            <Card className="shadow-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2"><Upload className="h-4 w-4 text-warning" />Upload Prescription</CardTitle>
              </CardHeader>
              <CardContent>
                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium text-foreground">Click to upload</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG — max 5MB</p>
                  <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                </label>
              </CardContent>
            </Card>

            {/* Save button */}
            <Button variant="hero" size="lg" className="w-full gap-2" onClick={handleSave}>
              <CheckCircle2 className="h-5 w-5" /> Save Record
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ── Search Screen ───────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Patient Lookup</h1>
        <p className="text-muted-foreground">Search for a patient by their ID to view and update their records</p>
      </div>

      <Card className="shadow-elevated max-w-lg">
        <CardContent className="p-6 space-y-4">
          <div className="text-center mb-2">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Search className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-lg font-bold text-foreground">Enter Patient ID</h2>
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="e.g. PAT-2025-001"
              value={searchId}
              onChange={(e) => { setSearchId(e.target.value); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="h-12 text-center font-mono tracking-wider"
            />
            <Button variant="default" size="lg" className="gap-2 px-6" onClick={handleSearch}>
              <Search className="h-4 w-4" /> Search
            </Button>
          </div>

          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <p className="text-xs text-muted-foreground text-center">
            Try: PAT-2025-001, PAT-2025-002, PAT-2025-003
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
