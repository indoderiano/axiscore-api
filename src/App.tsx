/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { User, Mail, Shield, Terminal } from "lucide-react";

interface UserData {
  name: string;
  email: string;
}

export default function App() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user data");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#E4E3E0] text-[#141414] font-sans selection:bg-[#141414] selection:text-[#E4E3E0]">
      {/* Header / Grid Line */}
      <header className="border-b border-[#141414] p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Terminal size={20} />
          <h1 className="font-mono text-sm uppercase tracking-widest font-bold">
            Wayne_Enterprises // Data_Server
          </h1>
        </div>
        <div className="font-mono text-[10px] opacity-50 uppercase">
          Status: {loading ? "Connecting..." : "Online"}
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-8 md:p-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-12"
        >
          {/* Hero Section */}
          <div className="space-y-4">
            <span className="font-serif italic text-xs opacity-50 uppercase tracking-widest">
              Identity Verification System
            </span>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none">
              SECURE ACCESS
            </h2>
          </div>

          {/* Data Grid */}
          <div className="border border-[#141414] divide-y divide-[#141414]">
            {/* Column Headers */}
            <div className="grid grid-cols-1 md:grid-cols-3 bg-[#141414] text-[#E4E3E0] p-3">
              <div className="font-serif italic text-[11px] uppercase tracking-wider">Field</div>
              <div className="font-serif italic text-[11px] uppercase tracking-wider md:col-span-2">Value</div>
            </div>

            {loading ? (
              <div className="p-12 text-center font-mono text-sm animate-pulse">
                DECRYPTING DATA...
              </div>
            ) : error ? (
              <div className="p-12 text-center font-mono text-sm text-red-600">
                ERROR: {error}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 p-6 group hover:bg-[#141414] hover:text-[#E4E3E0] transition-colors duration-200">
                  <div className="flex items-center gap-2 font-mono text-xs opacity-50 uppercase">
                    <User size={14} />
                    Subject_Name
                  </div>
                  <div className="md:col-span-2 font-mono text-xl md:text-2xl uppercase tracking-tight">
                    {user?.name}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 p-6 group hover:bg-[#141414] hover:text-[#E4E3E0] transition-colors duration-200">
                  <div className="flex items-center gap-2 font-mono text-xs opacity-50 uppercase">
                    <Mail size={14} />
                    Email_Address
                  </div>
                  <div className="md:col-span-2 font-mono text-xl md:text-2xl lowercase tracking-tight">
                    {user?.email}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 p-6 group hover:bg-[#141414] hover:text-[#E4E3E0] transition-colors duration-200">
                  <div className="flex items-center gap-2 font-mono text-xs opacity-50 uppercase">
                    <Shield size={14} />
                    Clearance_Level
                  </div>
                  <div className="md:col-span-2 font-mono text-xl md:text-2xl uppercase tracking-tight">
                    Class A / Administrator
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Info */}
          <div className="flex flex-col md:flex-row justify-between gap-8 pt-12 border-t border-[#141414]/20">
            <div className="max-w-xs space-y-2">
              <p className="font-mono text-[10px] uppercase opacity-40 leading-relaxed">
                This data is served from a secure Node.js backend using Express. 
                Identity verified via Wayne Enterprises cryptographic protocols.
              </p>
            </div>
            <div className="font-mono text-[10px] uppercase opacity-40">
              © 2026 Wayne Enterprises. All rights reserved.
            </div>
          </div>
        </motion.div>
      </main>

      {/* Background Grid Pattern */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#141414 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>
    </div>
  );
}
