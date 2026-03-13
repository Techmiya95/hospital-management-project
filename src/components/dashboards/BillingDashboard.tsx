import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Search, FileText, IndianRupee, Printer } from "lucide-react";
import { useState } from "react";

const bills = [
  {
    id: "BIL-001", patient: "Rajesh Kumar", patientId: "PAT-2025-001", status: "Unpaid",
    items: [
      { desc: "Consultation - Cardiology", amount: 800 },
      { desc: "CBC Test", amount: 450 },
      { desc: "ECG", amount: 600 },
      { desc: "Amlodipine 5mg (30)", amount: 120 },
      { desc: "Metformin 500mg (30)", amount: 85 },
    ],
  },
  {
    id: "BIL-002", patient: "Priya Nair", patientId: "PAT-2025-012", status: "Paid",
    items: [
      { desc: "Consultation - Neurology", amount: 1000 },
      { desc: "MRI Brain", amount: 4500 },
      { desc: "Sumatriptan 50mg (10)", amount: 280 },
    ],
  },
];

export default function BillingDashboard() {
  const [search, setSearch] = useState("");
  const [selectedBill, setSelectedBill] = useState(bills[0]);

  const filtered = bills.filter(b =>
    b.patientId.toLowerCase().includes(search.toLowerCase()) ||
    b.patient.toLowerCase().includes(search.toLowerCase())
  );

  const total = selectedBill.items.reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Billing</h1>
        <div className="flex items-center gap-2 w-80">
          <Input placeholder="Search Patient ID..." value={search} onChange={e => setSearch(e.target.value)} />
          <Button variant="default" size="icon"><Search className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Unpaid Bills", value: bills.filter(b => b.status === "Unpaid").length, color: "text-warning" },
          { label: "Collected Today", value: "₹5,780", color: "text-success" },
          { label: "Total Bills", value: bills.length, color: "text-primary" },
        ].map(s => (
          <Card key={s.label} className="shadow-card">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                <IndianRupee className={`h-5 w-5 ${s.color}`} />
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
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> Bills</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {filtered.map(b => (
              <button
                key={b.id}
                onClick={() => setSelectedBill(b)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${selectedBill.id === b.id ? "bg-primary/10 border border-primary/20" : "bg-muted/50 hover:bg-muted"}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{b.patient}</p>
                    <p className="text-sm text-muted-foreground">{b.patientId}</p>
                  </div>
                  <Badge variant={b.status === "Paid" ? "secondary" : "default"}>{b.status}</Badge>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2"><CreditCard className="h-5 w-5 text-secondary" /> Invoice - {selectedBill.id}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="font-medium text-foreground">{selectedBill.patient}</p>
              <p className="text-sm text-muted-foreground">{selectedBill.patientId}</p>
            </div>

            <div className="space-y-2 mb-4">
              {selectedBill.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm text-foreground">{item.desc}</span>
                  <span className="text-sm font-mono text-foreground">₹{item.amount}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 font-bold">
              <span className="text-foreground">Total</span>
              <span className="text-primary text-lg">₹{total.toLocaleString()}</span>
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="hero" className="flex-1"><IndianRupee className="h-4 w-4 mr-1" /> Collect Payment</Button>
              <Button variant="outline"><Printer className="h-4 w-4" /></Button>
            </div>

            <div className="flex gap-2 mt-3">
              {["UPI", "Card", "Cash", "Insurance"].map(m => (
                <Badge key={m} variant="outline" className="cursor-pointer hover:bg-muted">{m}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
