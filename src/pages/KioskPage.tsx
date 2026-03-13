import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Search, QrCode, Calendar, Monitor } from "lucide-react";

export default function KioskPage() {
  const navigate = useNavigate();
  const [patientId, setPatientId] = useState("");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-gradient-hero p-6 text-center">
        <h1 className="text-3xl font-bold text-primary-foreground font-display">Welcome to MediFlow Hospital</h1>
        <p className="text-primary-foreground/80 text-lg mt-1">Self-Service Kiosk</p>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-3xl space-y-8">
          {/* Search */}
          <div className="flex gap-3">
            <Input
              placeholder="Enter Patient ID (e.g., PAT-2025-001)"
              value={patientId}
              onChange={e => setPatientId(e.target.value)}
              className="text-lg h-14 text-center"
            />
            <Button variant="kiosk" size="lg" className="px-8"><Search className="h-5 w-5 mr-2" /> Search</Button>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: UserPlus, label: "New Patient Registration", desc: "Register as a new patient", color: "bg-primary" },
              { icon: QrCode, label: "Scan QR Code", desc: "Scan your patient QR code", color: "bg-secondary" },
              { icon: Calendar, label: "Book Appointment", desc: "Schedule a consultation", color: "bg-teal" },
              { icon: Monitor, label: "Check Status", desc: "View your appointment status", color: "bg-info" },
            ].map((action) => (
              <Card key={action.label} className="shadow-elevated hover:shadow-glow transition-all cursor-pointer group">
                <CardContent className="p-8 text-center">
                  <div className={`h-16 w-16 rounded-2xl ${action.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{action.label}</h3>
                  <p className="text-muted-foreground">{action.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-center">
            <button onClick={() => navigate("/")} className="text-primary hover:underline text-sm">← Back to Home</button>
          </p>
        </div>
      </main>
    </div>
  );
}
