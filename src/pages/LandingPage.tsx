import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Activity, ArrowRight, Shield, Brain, Stethoscope, FlaskConical, Pill, CreditCard,
  Users, Monitor, Wifi, WifiOff, Globe, Lock, Mic, Languages, ChevronRight,
  CheckCircle, Star, Building2, HeartPulse, Clipboard, UserCheck,
} from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const features = [
  { icon: Users, title: "Patient Registration", desc: "Auto-generated Patient IDs with digital medical records" },
  { icon: Stethoscope, title: "Doctor Consultations", desc: "Digital prescriptions, lab orders, and patient timelines" },
  { icon: FlaskConical, title: "Diagnostics & Lab", desc: "Real-time test tracking with automated report delivery" },
  { icon: Pill, title: "Pharmacy", desc: "Barcode scanning, inventory management, and dispensing" },
  { icon: CreditCard, title: "Billing", desc: "Automated invoicing with UPI, Card, Cash & Insurance" },
  { icon: Monitor, title: "Kiosk Mode", desc: "Self-service patient registration and appointment booking" },
];

const aiFeatures = [
  { icon: Mic, title: "Voice Recording", desc: "Record doctor-patient conversations automatically" },
  { icon: Brain, title: "AI Summaries", desc: "Auto-generate medical summaries from consultations" },
  { icon: Languages, title: "Multilingual", desc: "Support for English, Kannada, Hindi, Tamil, Telugu, Malayalam" },
  { icon: Clipboard, title: "Smart Prescriptions", desc: "AI-assisted prescription generation with drug interactions" },
];

const workflow = [
  { step: "1", title: "Patient Entry", desc: "Registration at Kiosk or Reception" },
  { step: "2", title: "ID Generated", desc: "Unique Patient ID created" },
  { step: "3", title: "Appointment", desc: "Book with department & doctor" },
  { step: "4", title: "Consultation", desc: "Doctor examines & prescribes" },
  { step: "5", title: "Lab Tests", desc: "Diagnostics ordered & processed" },
  { step: "6", title: "Pharmacy", desc: "Medicines dispensed" },
  { step: "7", title: "Billing", desc: "Automated invoice generated" },
  { step: "8", title: "Discharge", desc: "Summary & follow-up scheduled" },
];

const testimonials = [
  { name: "Dr. Suresh Patel", role: "Chief Medical Officer, City Hospital", text: "MediFlow reduced our patient wait times by 60%. The AI transcription saves our doctors 2 hours daily.", rating: 5 },
  { name: "Kavitha Rao", role: "Hospital Administrator", text: "The kiosk mode transformed our outpatient department. Patients love the self-service experience.", rating: 5 },
  { name: "Dr. Anand Kumar", role: "Cardiologist", text: "Having instant access to patient timelines and AI summaries has dramatically improved our clinical workflow.", rating: 5 },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg text-foreground font-display">MediFlow AI</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            {["Features", "Workflow", "AI", "Security"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-muted-foreground hover:text-foreground transition-colors">{item}</a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/kiosk")}>Kiosk</Button>
            <Button variant="hero-outline" size="sm" onClick={() => navigate("/login")}>Login</Button>
            <Button variant="hero" size="sm">Request Demo</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
            <Badge variant="secondary" className="mb-4 bg-accent text-accent-foreground">
              <HeartPulse className="h-3 w-3 mr-1" /> Next-Gen Hospital Management
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight font-display mb-6">
              AI-Powered Smart{" "}
              <span className="text-gradient-hero">Hospital Automation</span>{" "}
              System
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              End-to-end digital transformation for multispeciality hospitals. From patient entry to discharge — fully automated, AI-powered, and kiosk-ready.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button variant="hero" size="lg" onClick={() => navigate("/login")}>
                Request Demo <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
              <Button variant="hero-outline" size="lg" onClick={() => navigate("/login")}>
                Login to Dashboard
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto" initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.3 }}>
            {[
              { value: "500+", label: "Hospitals" },
              { value: "2M+", label: "Patients Served" },
              { value: "60%", label: "Faster Workflow" },
              { value: "99.9%", label: "Uptime" },
            ].map(s => (
              <div key={s.label} className="text-center p-4">
                <p className="text-3xl font-bold text-primary">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-3 bg-accent text-accent-foreground">Core Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display">Complete Hospital Workflow</h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">Every department connected. Every process automated.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <Card className="shadow-card hover:shadow-elevated transition-all h-full group">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <f.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-3 bg-accent text-accent-foreground">Patient Journey</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display">Seamless Hospital Workflow</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {workflow.map((w, i) => (
                <motion.div key={w.step} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.3, delay: i * 0.08 }}>
                  <div className="text-center p-4 relative">
                    <div className="h-12 w-12 rounded-full bg-gradient-hero flex items-center justify-center mx-auto mb-3">
                      <span className="text-primary-foreground font-bold">{w.step}</span>
                    </div>
                    <h4 className="font-semibold text-sm text-foreground">{w.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{w.desc}</p>
                    {i < workflow.length - 1 && (
                      <ChevronRight className="hidden md:block absolute top-6 -right-2 h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI */}
      <section id="ai" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-3 bg-accent text-accent-foreground"><Brain className="h-3 w-3 mr-1" /> AI-Powered</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display">Intelligent Healthcare</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {aiFeatures.map((f, i) => (
              <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <Card className="shadow-card h-full text-center">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                      <f.icon className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Offline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <WifiOff className="h-8 w-8 text-primary" />
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
              <div className="h-16 w-16 rounded-2xl bg-secondary/10 flex items-center justify-center">
                <Building2 className="h-8 w-8 text-secondary" />
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
              <div className="h-16 w-16 rounded-2xl bg-success/10 flex items-center justify-center">
                <Wifi className="h-8 w-8 text-success" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-foreground font-display mb-3">Works Offline. Always.</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Local hospital server keeps everything running during internet outages. Data syncs automatically when connectivity returns.
            </p>
          </div>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-3 bg-accent text-accent-foreground"><Shield className="h-3 w-3 mr-1" /> Security</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display">Healthcare-Grade Security</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Lock, title: "Role-Based Access", desc: "Granular permissions for every role" },
              { icon: Shield, title: "MFA Authentication", desc: "Multi-factor for all accounts" },
              { icon: Globe, title: "E2E Encryption", desc: "All data encrypted in transit and at rest" },
              { icon: UserCheck, title: "Audit Logs", desc: "Complete access audit trail" },
            ].map(s => (
              <Card key={s.title} className="shadow-card text-center">
                <CardContent className="p-6">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground font-display">Trusted by Healthcare Leaders</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map(t => (
              <Card key={t.name} className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground mb-4 italic">"{t.text}"</p>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center bg-gradient-hero rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-primary-foreground font-display mb-3">Ready to Transform Your Hospital?</h2>
            <p className="text-primary-foreground/80 mb-6">Schedule a demo and see MediFlow AI in action.</p>
            <div className="flex items-center justify-center gap-3">
              <Button variant="hero-outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Request Demo
              </Button>
              <Button size="lg" className="bg-card text-foreground hover:bg-card/90">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Activity className="h-5 w-5 text-primary" />
                <span className="font-bold text-foreground font-display">MediFlow AI</span>
              </div>
              <p className="text-sm text-muted-foreground">AI-powered hospital management for the modern healthcare ecosystem.</p>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Security", "API"] },
              { title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
              { title: "Legal", links: ["Privacy", "Terms", "HIPAA", "Compliance"] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="font-semibold text-foreground mb-3">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(link => (
                    <li key={link}><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-8 pt-8 flex flex-col items-center gap-2 text-sm text-muted-foreground">
            <p>© 2025 MediFlow AI. All rights reserved. Built for Indian Healthcare.</p>
            <a href="https://hospital.techmiyaedtech.com" className="hover:text-primary transition-colors hover:underline">
              hospital.techmiyaedtech.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
