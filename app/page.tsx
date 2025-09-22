"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardContent } from "@/components/dashboard-content"
import { OverviewSection } from "@/components/overview-section"

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("overview")

  const handleNavigate = (section: string) => {
    setActiveSection(section)
  }

  return (
    <div className="min-h-screen flex">
      <AppSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 flex flex-col">
        {activeSection === "overview" ? (
          <div className="flex-1 flex flex-col">
            <header className="flex h-16 shrink-0 items-center gap-4 bg-slate-50 px-6">
              <div className="flex-1">
                <h2 className="text-xl font-black text-slate-900">Dashboard</h2>
              </div>
            </header>
            <div className="flex-1 overflow-auto">
              <OverviewSection onNavigate={handleNavigate} />
            </div>
          </div>
        ) : (
          <DashboardContent activeSection={activeSection} onNavigate={handleNavigate} />
        )}
      </main>
    </div>
  )
}
