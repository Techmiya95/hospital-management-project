import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft, User, Heart, Stethoscope, CheckCircle2, Copy, Printer,
  Phone, Mail, MapPin, Droplets, Ruler, Weight, CreditCard, AlertTriangle,
} from "lucide-react";

// ── Types ───────────────────────────────────────────────────────────────

interface FormData {
  fullName: string;
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
  allergies: string;
  existingConditions: string;
}

const initialFormData: FormData = {
  fullName: "", phone: "", email: "", dob: "", gender: "", address: "",
  bloodGroup: "", height: "", weight: "", cardType: "", cardNumber: "",
  problemDescription: "", allergies: "", existingConditions: "",
};

interface Props {
  onBack: () => void;
}

// ── Helpers ─────────────────────────────────────────────────────────────

function generatePatientId() {
  const year = new Date().getFullYear();
  const suffix = String(Math.floor(100 + Math.random() * 900)); // 3-digit
  return `PAT-${year}-${suffix}`;
}

// ── Component ───────────────────────────────────────────────────────────

export default function KioskRegistrationForm({ onBack }: Props) {
  const [form, setForm] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [generatedId, setGeneratedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const setSelect = (field: keyof FormData) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // ── Validation ──────────────────────────────────────────────────────
  function validate(): boolean {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    else if (!/^\+?\d{10,13}$/.test(form.phone.replace(/\s/g, "")))
      errs.phone = "Enter a valid 10-13 digit phone number";
    if (!form.gender) errs.gender = "Please select gender";
    if (!form.bloodGroup) errs.bloodGroup = "Please select blood group";
    if (!form.problemDescription.trim())
      errs.problemDescription = "Please describe your problem";
    if (form.cardType && form.cardType !== "none" && !form.cardNumber.trim())
      errs.cardNumber = "Card number is required for BPL/APL holders";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setGeneratedId(generatePatientId());
  }

  function handleCopy() {
    if (generatedId) {
      navigator.clipboard.writeText(generatedId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  // ── Success Screen ──────────────────────────────────────────────────
  if (generatedId) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="bg-gradient-hero p-6 text-center">
          <h1 className="text-3xl font-bold text-primary-foreground font-display">Registration Successful</h1>
          <p className="text-primary-foreground/80 text-lg mt-1">Your details have been recorded</p>
        </header>

        <main className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-lg text-center space-y-8">
            {/* Animated check */}
            <div className="mx-auto h-24 w-24 rounded-full bg-green-100 flex items-center justify-center animate-in zoom-in-50 duration-500">
              <CheckCircle2 className="h-14 w-14 text-green-600" />
            </div>

            {/* Patient ID card */}
            <Card className="shadow-elevated">
              <CardContent className="p-8 space-y-4">
                <p className="text-muted-foreground text-sm">Your Patient ID</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-4xl font-bold font-mono text-primary tracking-wider">{generatedId}</span>
                  <button onClick={handleCopy} className="p-2 rounded-lg hover:bg-muted transition-colors" title="Copy ID">
                    {copied ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-muted-foreground" />}
                  </button>
                </div>
                <p className="text-foreground font-semibold text-lg">{form.fullName}</p>
                <p className="text-muted-foreground text-sm">{form.phone}</p>

                <div className="pt-4 border-t border-border grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Blood Group</p>
                    <p className="font-semibold text-foreground">{form.bloodGroup}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Gender</p>
                    <p className="font-semibold text-foreground">{form.gender}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Card</p>
                    <p className="font-semibold text-foreground">{form.cardType && form.cardType !== "none" ? form.cardType.toUpperCase() : "N/A"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" size="lg" className="gap-2" onClick={() => window.print()}>
                <Printer className="h-5 w-5" /> Print Token
              </Button>
              <Button variant="hero" size="lg" className="gap-2" onClick={onBack}>
                Back to Kiosk
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Please save your Patient ID. You will need it for all future visits.
            </p>
          </div>
        </main>
      </div>
    );
  }

  // ── Form ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-gradient-hero p-6">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button onClick={onBack} className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
            <ArrowLeft className="h-5 w-5 text-primary-foreground" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-primary-foreground font-display">New Patient Registration</h1>
            <p className="text-primary-foreground/80 mt-0.5">Fill in the details below to register</p>
          </div>
        </div>
      </header>

      {/* Form body */}
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">

          {/* ─── Section 1: Personal Details ─────────────────── */}
          <Card className="shadow-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                Personal Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="fullName" className="flex items-center gap-1.5 text-sm font-medium">
                    <User className="h-3.5 w-3.5 text-muted-foreground" /> Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input id="fullName" placeholder="Enter full name" value={form.fullName} onChange={set("fullName")} className="h-12 text-base" />
                  {errors.fullName && <p className="text-xs text-destructive flex items-center gap-1"><AlertTriangle className="h-3 w-3" />{errors.fullName}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="flex items-center gap-1.5 text-sm font-medium">
                    <Phone className="h-3.5 w-3.5 text-muted-foreground" /> Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <Input id="phone" placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} className="h-12 text-base" />
                  {errors.phone && <p className="text-xs text-destructive flex items-center gap-1"><AlertTriangle className="h-3 w-3" />{errors.phone}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="flex items-center gap-1.5 text-sm font-medium">
                    <Mail className="h-3.5 w-3.5 text-muted-foreground" /> Email <span className="text-muted-foreground text-xs">(optional)</span>
                  </Label>
                  <Input id="email" type="email" placeholder="email@example.com" value={form.email} onChange={set("email")} className="h-12 text-base" />
                </div>

                {/* DOB */}
                <div className="space-y-1.5">
                  <Label htmlFor="dob" className="flex items-center gap-1.5 text-sm font-medium">
                    Date of Birth
                  </Label>
                  <Input id="dob" type="date" value={form.dob} onChange={set("dob")} className="h-12 text-base" />
                </div>

                {/* Gender */}
                <div className="space-y-1.5">
                  <Label className="flex items-center gap-1.5 text-sm font-medium">
                    Gender <span className="text-destructive">*</span>
                  </Label>
                  <Select value={form.gender} onValueChange={setSelect("gender")}>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && <p className="text-xs text-destructive flex items-center gap-1"><AlertTriangle className="h-3 w-3" />{errors.gender}</p>}
                </div>
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <Label htmlFor="address" className="flex items-center gap-1.5 text-sm font-medium">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" /> Address
                </Label>
                <Textarea id="address" placeholder="Enter full address" value={form.address} onChange={set("address")} className="text-base min-h-[70px]" />
              </div>
            </CardContent>
          </Card>

          {/* ─── Section 2: Health Information ───────────────── */}
          <Card className="shadow-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="h-8 w-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Heart className="h-4 w-4 text-secondary" />
                </div>
                Health Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Blood Group */}
                <div className="space-y-1.5">
                  <Label className="flex items-center gap-1.5 text-sm font-medium">
                    <Droplets className="h-3.5 w-3.5 text-destructive" /> Blood Group <span className="text-destructive">*</span>
                  </Label>
                  <Select value={form.bloodGroup} onValueChange={setSelect("bloodGroup")}>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                        <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.bloodGroup && <p className="text-xs text-destructive flex items-center gap-1"><AlertTriangle className="h-3 w-3" />{errors.bloodGroup}</p>}
                </div>

                {/* Height */}
                <div className="space-y-1.5">
                  <Label htmlFor="height" className="flex items-center gap-1.5 text-sm font-medium">
                    <Ruler className="h-3.5 w-3.5 text-muted-foreground" /> Height (cm)
                  </Label>
                  <Input id="height" type="number" placeholder="e.g. 170" value={form.height} onChange={set("height")} className="h-12 text-base" />
                </div>

                {/* Weight */}
                <div className="space-y-1.5">
                  <Label htmlFor="weight" className="flex items-center gap-1.5 text-sm font-medium">
                    <Weight className="h-3.5 w-3.5 text-muted-foreground" /> Weight (kg)
                  </Label>
                  <Input id="weight" type="number" placeholder="e.g. 65" value={form.weight} onChange={set("weight")} className="h-12 text-base" />
                </div>

                {/* BPL / APL */}
                <div className="space-y-1.5">
                  <Label className="flex items-center gap-1.5 text-sm font-medium">
                    <CreditCard className="h-3.5 w-3.5 text-muted-foreground" /> BPL / APL
                  </Label>
                  <Select value={form.cardType} onValueChange={setSelect("cardType")}>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Not Applicable</SelectItem>
                      <SelectItem value="bpl">BPL Card Holder</SelectItem>
                      <SelectItem value="apl">APL Card Holder</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Card Number — conditional */}
              {form.cardType && form.cardType !== "none" && (
                <div className="mt-4 space-y-1.5 max-w-sm">
                  <Label htmlFor="cardNumber" className="flex items-center gap-1.5 text-sm font-medium">
                    <CreditCard className="h-3.5 w-3.5 text-muted-foreground" /> {form.cardType.toUpperCase()} Card Number <span className="text-destructive">*</span>
                  </Label>
                  <Input id="cardNumber" placeholder="Enter card number" value={form.cardNumber} onChange={set("cardNumber")} className="h-12 text-base" />
                  {errors.cardNumber && <p className="text-xs text-destructive flex items-center gap-1"><AlertTriangle className="h-3 w-3" />{errors.cardNumber}</p>}
                </div>
              )}
            </CardContent>
          </Card>

          {/* ─── Section 3: Medical Details ──────────────────── */}
          <Card className="shadow-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="h-8 w-8 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Stethoscope className="h-4 w-4 text-warning" />
                </div>
                Medical Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Problem Description */}
              <div className="space-y-1.5">
                <Label htmlFor="problem" className="flex items-center gap-1.5 text-sm font-medium">
                  Problem Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="problem"
                  placeholder="Describe your symptoms or reason for visit…"
                  value={form.problemDescription}
                  onChange={set("problemDescription")}
                  className="text-base min-h-[100px]"
                />
                {errors.problemDescription && <p className="text-xs text-destructive flex items-center gap-1"><AlertTriangle className="h-3 w-3" />{errors.problemDescription}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Allergies */}
                <div className="space-y-1.5">
                  <Label htmlFor="allergies" className="flex items-center gap-1.5 text-sm font-medium">
                    Known Allergies <span className="text-muted-foreground text-xs">(optional)</span>
                  </Label>
                  <Input id="allergies" placeholder="e.g. Penicillin, Peanuts" value={form.allergies} onChange={set("allergies")} className="h-12 text-base" />
                </div>

                {/* Existing Conditions */}
                <div className="space-y-1.5">
                  <Label htmlFor="conditions" className="flex items-center gap-1.5 text-sm font-medium">
                    Existing Conditions <span className="text-muted-foreground text-xs">(optional)</span>
                  </Label>
                  <Input id="conditions" placeholder="e.g. Diabetes, Hypertension" value={form.existingConditions} onChange={set("existingConditions")} className="h-12 text-base" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ─── Actions ─────────────────────────────────────── */}
          <div className="flex items-center justify-between pb-8">
            <Button type="button" variant="outline" size="lg" className="gap-2 h-14 px-8 text-base" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" /> Back
            </Button>
            <Button type="submit" variant="hero" size="lg" className="gap-2 h-14 px-10 text-base">
              <CheckCircle2 className="h-5 w-5" /> Register Patient
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
