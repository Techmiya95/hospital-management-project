import React, { createContext, useContext, useState, useCallback } from "react";

export type UserRole = "patient" | "admin" | "doctor" | "lab" | "pharmacy" | "billing";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USERS: Record<UserRole, User> = {
  patient: { id: "PAT-2025-001", name: "Rajesh Kumar", email: "patient@hospital.com", role: "patient" },
  admin: { id: "ADM-001", name: "Dr. Priya Sharma", email: "admin@hospital.com", role: "admin" },
  doctor: { id: "DOC-001", name: "Dr. Anand Rao", email: "doctor@hospital.com", role: "doctor" },
  lab: { id: "LAB-001", name: "Suresh Technician", email: "lab@hospital.com", role: "lab" },
  pharmacy: { id: "PHR-001", name: "Meena Pharmacist", email: "pharmacy@hospital.com", role: "pharmacy" },
  billing: { id: "BIL-001", name: "Arun Billing", email: "billing@hospital.com", role: "billing" },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((_email: string, _password: string, role: UserRole) => {
    setUser(DEMO_USERS[role]);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
