import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Stethoscope, TrendingUp, Activity, Building2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const patientData = [
  { day: "Mon", patients: 45 }, { day: "Tue", patients: 52 }, { day: "Wed", patients: 49 },
  { day: "Thu", patients: 63 }, { day: "Fri", patients: 58 }, { day: "Sat", patients: 35 },
];

const revenueData = [
  { month: "Jan", revenue: 42 }, { month: "Feb", revenue: 48 }, { month: "Mar", revenue: 55 },
  { month: "Apr", revenue: 51 }, { month: "May", revenue: 60 }, { month: "Jun", revenue: 67 },
];

const deptData = [
  { name: "Cardiology", value: 30 }, { name: "Neurology", value: 20 },
  { name: "Orthopedics", value: 25 }, { name: "Pediatrics", value: 15 }, { name: "General", value: 10 },
];

const COLORS = ["hsl(209,78%,46%)", "hsl(168,42%,48%)", "hsl(38,92%,50%)", "hsl(142,71%,45%)", "hsl(210,15%,70%)"];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Hospital Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Patients Today", value: "127", icon: Users, trend: "+12%", color: "text-primary" },
          { label: "Appointments", value: "84", icon: Calendar, trend: "+5%", color: "text-secondary" },
          { label: "Active Doctors", value: "32", icon: Stethoscope, trend: "On duty", color: "text-success" },
          { label: "Revenue Today", value: "₹4.2L", icon: TrendingUp, trend: "+18%", color: "text-warning" },
        ].map((s) => (
          <Card key={s.label} className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <s.icon className={`h-5 w-5 ${s.color}`} />
                <span className="text-xs text-success font-medium">{s.trend}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Activity className="h-5 w-5 text-primary" /> Patient Inflow</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={patientData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,20%,90%)" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="patients" fill="hsl(209,78%,46%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><TrendingUp className="h-5 w-5 text-secondary" /> Revenue Trend (₹ Lakhs)</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,20%,90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="hsl(168,42%,48%)" strokeWidth={2} dot={{ fill: "hsl(168,42%,48%)" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Building2 className="h-5 w-5 text-primary" /> Department Workload</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center gap-8">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie data={deptData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {deptData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {deptData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-sm text-foreground">{d.name}</span>
                  <span className="text-sm text-muted-foreground ml-auto">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
