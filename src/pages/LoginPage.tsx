import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, type UserRole } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, User, Stethoscope, FlaskConical, Pill, CreditCard, ShieldCheck } from "lucide-react";

const roles: { value: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
  { value: "patient", label: "Patient", icon: <User className="h-6 w-6" />, desc: "Book appointments, view records" },
  { value: "admin", label: "Admin", icon: <ShieldCheck className="h-6 w-6" />, desc: "Hospital management" },
  { value: "doctor", label: "Doctor", icon: <Stethoscope className="h-6 w-6" />, desc: "Consultations & prescriptions" },
  { value: "lab", label: "Lab / Diagnostics", icon: <FlaskConical className="h-6 w-6" />, desc: "Test requests & reports" },
  { value: "pharmacy", label: "Pharmacy", icon: <Pill className="h-6 w-6" />, desc: "Dispense medicines" },
  { value: "billing", label: "Billing", icon: <CreditCard className="h-6 w-6" />, desc: "Generate invoices" },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password, selectedRole);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Activity className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground font-display">MediFlow AI</h1>
          </div>
          <p className="text-muted-foreground">Select your role and sign in to continue</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {roles.map((role) => (
            <button
              key={role.value}
              onClick={() => setSelectedRole(role.value)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                selectedRole === role.value
                  ? "border-primary bg-medical-blue-light"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <div className={`mb-2 ${selectedRole === role.value ? "text-primary" : "text-muted-foreground"}`}>
                {role.icon}
              </div>
              <div className="font-semibold text-sm text-foreground">{role.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{role.desc}</div>
            </button>
          ))}
        </div>

        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle className="text-lg">Sign In as {roles.find(r => r.value === selectedRole)?.label}</CardTitle>
            <CardDescription>Demo mode — any credentials will work</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
              <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
              <Button type="submit" className="w-full" variant="hero" size="lg">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-4">
          <button onClick={() => navigate("/")} className="text-primary hover:underline">← Back to Home</button>
        </p>
      </div>
    </div>
  );
}
