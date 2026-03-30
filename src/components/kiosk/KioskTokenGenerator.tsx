import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft, Search, UserPlus, CheckCircle2, Ticket, Clock, Calendar,
  Copy, Printer, AlertCircle, User,
} from "lucide-react";

// ── Dummy patient lookup ────────────────────────────────────────────────

const KNOWN_PATIENTS: Record<string, { name: string; phone: string; bloodGroup: string }> = {
  "PAT-2025-001": { name: "Rajesh Kumar", phone: "+91 98765 43210", bloodGroup: "B+" },
  "PAT-2025-002": { name: "Priya Sharma", phone: "+91 87654 32109", bloodGroup: "A+" },
  "PAT-2025-003": { name: "Arun Mehta", phone: "+91 76543 21098", bloodGroup: "O+" },
  "PAT-2026-534": { name: "Priya Sharma", phone: "9876543210", bloodGroup: "A+" },
};

function generateToken() {
  return `TKN-${String(Math.floor(100 + Math.random() * 900))}`;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-IN", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true,
  });
}

// ── Component ───────────────────────────────────────────────────────────

interface Props {
  onBack: () => void;
  onNewRegistration: () => void;
}

export default function KioskTokenGenerator({ onBack, onNewRegistration }: Props) {
  const [patientId, setPatientId] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState<{
    tokenNo: string; patientId: string; name: string; phone: string;
    bloodGroup: string; date: Date;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  function handleSearch() {
    const id = patientId.trim().toUpperCase();
    if (!id) {
      setError("Please enter your Patient ID");
      return;
    }
    const patient = KNOWN_PATIENTS[id];
    if (!patient) {
      setError("Patient ID not found. Please check your ID or register as a new patient.");
      return;
    }
    setError("");
    setToken({
      tokenNo: generateToken(),
      patientId: id,
      name: patient.name,
      phone: patient.phone,
      bloodGroup: patient.bloodGroup,
      date: new Date(),
    });
  }

  function handleCopy() {
    if (token) {
      navigator.clipboard.writeText(token.tokenNo);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  // ── Token Success Screen ────────────────────────────────────────────
  if (token) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="bg-gradient-hero p-6 text-center">
          <h1 className="text-3xl font-bold text-primary-foreground font-display">Token Generated</h1>
          <p className="text-primary-foreground/80 text-lg mt-1">Please proceed to the waiting area</p>
        </header>

        <main className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-lg text-center space-y-8">
            {/* Animated check */}
            <div className="mx-auto h-24 w-24 rounded-full bg-green-100 flex items-center justify-center animate-in zoom-in-50 duration-500">
              <Ticket className="h-14 w-14 text-green-600" />
            </div>

            <Card className="shadow-elevated">
              <CardContent className="p-8 space-y-5">
                {/* Token number */}
                <div>
                  <p className="text-muted-foreground text-sm">Token Number</p>
                  <div className="flex items-center justify-center gap-3 mt-1">
                    <span className="text-5xl font-bold font-mono text-primary tracking-wider">{token.tokenNo}</span>
                    <button onClick={handleCopy} className="p-2 rounded-lg hover:bg-muted transition-colors" title="Copy Token">
                      {copied ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-muted-foreground" />}
                    </button>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />{formatDate(token.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />{formatTime(token.date)}
                  </span>
                </div>

                {/* Patient info */}
                <div className="pt-4 border-t border-border space-y-2">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="text-left">
                      <p className="text-muted-foreground">Patient</p>
                      <p className="font-semibold text-foreground">{token.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground">Patient ID</p>
                      <p className="font-semibold font-mono text-foreground">{token.patientId}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="text-left">
                      <p className="text-muted-foreground">Phone</p>
                      <p className="font-semibold text-foreground">{token.phone}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground">Blood Group</p>
                      <p className="font-semibold text-foreground">{token.bloodGroup}</p>
                    </div>
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
          </div>
        </main>
      </div>
    );
  }

  // ── Patient ID Input Screen ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-gradient-hero p-6">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <button onClick={onBack} className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
            <ArrowLeft className="h-5 w-5 text-primary-foreground" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-primary-foreground font-display">Generate Token</h1>
            <p className="text-primary-foreground/80 mt-0.5">Enter your Patient ID to generate a visit token</p>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-lg space-y-6">
          <Card className="shadow-elevated">
            <CardContent className="p-8 space-y-6">
              {/* Icon */}
              <div className="text-center">
                <div className="mx-auto h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Ticket className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Enter Patient ID</h2>
                <p className="text-sm text-muted-foreground mt-1">Your ID was given during registration</p>
              </div>

              {/* Input */}
              <div className="space-y-2">
                <Input
                  id="token-patient-id"
                  placeholder="e.g. PAT-2025-001"
                  value={patientId}
                  onChange={(e) => { setPatientId(e.target.value); setError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="h-14 text-lg text-center font-mono tracking-wider"
                />
                {error && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
              </div>

              {/* Search button */}
              <Button
                variant="hero"
                size="lg"
                className="w-full h-14 text-base gap-2"
                onClick={handleSearch}
              >
                <Search className="h-5 w-5" /> Generate Token
              </Button>
            </CardContent>
          </Card>

          {/* New registration link */}
          <Card className="shadow-card border-dashed">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                <UserPlus className="h-6 w-6 text-secondary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">Don't have a Patient ID?</p>
                <p className="text-sm text-muted-foreground">Register as a new patient first</p>
              </div>
              <Button variant="outline" className="shrink-0 gap-2" onClick={onNewRegistration}>
                <User className="h-4 w-4" /> Register
              </Button>
            </CardContent>
          </Card>

          <p className="text-center">
            <button onClick={onBack} className="text-primary hover:underline text-sm">← Back to Kiosk</button>
          </p>
        </div>
      </main>
    </div>
  );
}
