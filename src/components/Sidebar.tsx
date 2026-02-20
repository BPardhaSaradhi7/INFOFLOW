import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileUp,
  MessageCircle,
  Clock,
  Sun,
  Moon,
  LogOut,
} from "lucide-react";

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userName: string;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

const tabs = [
  { id: "home", label: "Home", icon: LayoutDashboard },
  { id: "upload", label: "Upload", icon: FileUp },
  { id: "chat", label: "Chat", icon: MessageCircle },
  { id: "history", label: "History", icon: Clock },
];

const logoUri = (window as unknown as Record<string, string>).__INFOFLOW_LOGO_URI__ || "/logo.svg";

export default function Sidebar({ activeTab, onTabChange, userName, theme, onToggleTheme }: Props) {
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        width: 240,
        backgroundColor: "var(--bg)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        padding: "28px 14px",
        zIndex: 50,
        transition: "background-color 0.3s, border-color 0.3s",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 10px", marginBottom: 40 }}>
        <img
          src={logoUri}
          alt="InfoFlow AI"
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            flexShrink: 0,
            boxShadow: "0 2px 10px rgba(99,102,241,0.1)",
          }}
        />
        <div>
          <span style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            InfoFlow AI
          </span>
          <p className="mono" style={{ fontSize: 9, color: "var(--text-ghost)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            RAG Engine
          </p>
        </div>
      </div>

      {/* Label */}
      <p
        className="mono"
        style={{
          fontSize: 10,
          color: "var(--text-ghost)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          padding: "0 10px",
          marginBottom: 10,
        }}
      >
        Navigation
      </p>

      {/* Tabs */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              whileTap={{ scale: 0.98 }}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
                padding: "10px 12px 10px 16px",
                borderRadius: 10,
                border: active ? "1px solid var(--border)" : "1px solid transparent",
                backgroundColor: active ? "var(--bg-raised)" : "transparent",
                color: active ? "var(--text-primary)" : "var(--text-secondary)",
                fontSize: 13,
                fontWeight: active ? 600 : 500,
                fontFamily: "Inter, system-ui, sans-serif",
                cursor: "pointer",
                textAlign: "left" as const,
                transition: "all 0.15s",
                boxShadow: active ? "var(--shadow-sm)" : "none",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.backgroundColor = "var(--bg-raised)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }
              }}
            >
              {/* Active indicator bar */}
              {active && (
                <motion.div
                  layoutId="sidebar-indicator"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "20%",
                    bottom: "20%",
                    width: 3,
                    borderRadius: "0 2px 2px 0",
                    background: "linear-gradient(180deg, #6366f1, #06b6d4)",
                  }}
                />
              )}
              <Icon size={16} strokeWidth={active ? 2.2 : 1.8} />
              {tab.label}
            </motion.button>
          );
        })}
      </nav>

      {/* Theme toggle */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onToggleTheme}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          width: "100%",
          padding: "10px 12px",
          borderRadius: 10,
          border: "1px solid var(--border)",
          backgroundColor: "var(--bg-raised)",
          color: "var(--text-secondary)",
          fontSize: 13,
          fontWeight: 500,
          fontFamily: "Inter, system-ui, sans-serif",
          cursor: "pointer",
          textAlign: "left" as const,
          transition: "all 0.15s",
          marginBottom: 12,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--border-hover)";
          e.currentTarget.style.color = "var(--text-primary)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.color = "var(--text-secondary)";
        }}
      >
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </motion.button>

      {/* Separator */}
      <div style={{ height: 1, backgroundColor: "var(--border)", margin: "0 4px 12px", transition: "background-color 0.3s" }} />

      {/* User */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 10px" }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #6366f1, #06b6d4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 600,
            color: "#fff",
            flexShrink: 0,
          }}
        >
          {userName.charAt(0).toUpperCase()}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "var(--text-primary)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              letterSpacing: "-0.01em",
            }}
          >
            {userName}
          </p>
          <p className="mono" style={{ fontSize: 10, color: "var(--text-ghost)" }}>
            Free Plan
          </p>
        </div>
        <LogOut
          size={14}
          color="var(--text-muted)"
          style={{ cursor: "pointer", flexShrink: 0, transition: "color 0.15s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        />
      </div>
    </div>
  );
}