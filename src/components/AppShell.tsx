import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Wifi,
  CloudUpload,
  MessageCircle,
  FileSearch,
  ArrowRight,
  Layers,
  Brain,
  Shield,
  Sparkles,
  LayoutDashboard,
  FileUp,
  Clock,
} from "lucide-react";
import Sidebar from "./Sidebar";
import UploadCard from "./UploadCard";
import ChatPanel from "./ChatPanel";

interface Props {
  userName: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
  docsCount: number;
  onUploadSuccess: () => void;
}

const pageIcons: Record<string, React.ReactNode> = {
  home: <LayoutDashboard size={14} />,
  upload: <FileUp size={14} />,
  chat: <MessageCircle size={14} />,
  history: <Clock size={14} />,
};

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function AppShell({
  userName,
  activeTab,
  onTabChange,
  theme,
  onToggleTheme,
  docsCount,
  onUploadSuccess,
}: Props) {

  const features = [
    {
      icon: CloudUpload,
      title: "Upload & Index",
      desc: "Drop any PDF and we split it into searchable chunks using FAISS vector indexing.",
      color: "#6366f1",
      glow: "rgba(99,102,241,0.12)",
    },
    {
      icon: Brain,
      title: "Ask Anything",
      desc: "Ask natural language questions and get precise answers grounded in your documents.",
      color: "#06b6d4",
      glow: "rgba(6,182,212,0.12)",
    },
    {
      icon: FileSearch,
      title: "Cited Sources",
      desc: "Every answer comes with exact page references so you can verify and trust the output.",
      color: "#8b5cf6",
      glow: "rgba(139,92,246,0.12)",
    },
  ];

  const steps = [
    { num: "01", title: "Upload", desc: "Drop a PDF document" },
    { num: "02", title: "Index", desc: "AI processes & indexes it" },
    { num: "03", title: "Ask", desc: "Get intelligent answers" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <motion.div
            key="home"
            variants={stagger}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -12 }}
            style={{ padding: "56px 48px 80px", maxWidth: 900, margin: "0 auto" }}
          >
            {/* Hero */}
            <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 64 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 16px",
                  borderRadius: 100,
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--bg-raised)",
                  marginBottom: 28,
                  transition: "all 0.3s",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <Sparkles size={12} color="var(--accent)" />
                <span className="mono" style={{ fontSize: 11, color: "var(--text-secondary)" }}>
                  Powered by RAG · Local AI
                </span>
              </motion.div>

              <h1
                style={{
                  fontSize: 46,
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.08,
                  marginBottom: 16,
                }}
              >
                Welcome back,{" "}
                <span className="gradient-text">{userName}</span>
              </h1>

              <p
                style={{
                  fontSize: 16,
                  color: "var(--text-secondary)",
                  maxWidth: 460,
                  margin: "0 auto",
                  lineHeight: 1.7,
                  letterSpacing: "-0.01em",
                }}
              >
                Your private AI assistant that reads your documents and answers questions —
                everything runs locally, nothing leaves your machine.
              </p>

              <motion.div
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: 80,
                  height: 2,
                  borderRadius: 1,
                  background: "linear-gradient(90deg, transparent, #6366f1, #06b6d4, transparent)",
                  margin: "28px auto 0",
                }}
              />
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              variants={fadeUp}
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 16,
                marginBottom: 56,
              }}
            >
              {[
                { label: "Documents Indexed", value: docsCount },
                { label: "Privacy Level", value: "100%" },
                { label: "Runs Locally", value: "Yes" },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    textAlign: "center",
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    padding: "20px 32px",
                    minWidth: 160,
                    boxShadow: "var(--shadow-sm)",
                    transition: "all 0.3s",
                  }}
                >
                  <p style={{ fontSize: 26, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                    {stat.value}
                  </p>
                  <p className="mono" style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Feature Cards */}
            <motion.div
              variants={fadeUp}
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 56 }}
            >
              {features.map((feat, i) => (
                <motion.div
                  key={i}
                  whileHover={{
                    y: -4,
                    borderColor: feat.color,
                    boxShadow: `0 8px 30px ${feat.glow}`,
                    transition: { duration: 0.2 },
                  }}
                  style={{
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: 14,
                    padding: 28,
                    cursor: "default",
                    boxShadow: "var(--shadow-sm)",
                    transition: "background-color 0.3s",
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 11,
                      backgroundColor: `${feat.color}10`,
                      border: `1px solid ${feat.color}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 18,
                    }}
                  >
                    <feat.icon size={19} color={feat.color} />
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8, letterSpacing: "-0.01em" }}>
                    {feat.title}
                  </h3>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65 }}>
                    {feat.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* How It Works */}
            <motion.div variants={fadeUp} style={{ marginBottom: 56 }}>
              <p className="mono" style={{ fontSize: 10, color: "var(--text-ghost)", textTransform: "uppercase", letterSpacing: "0.1em", textAlign: "center", marginBottom: 24 }}>
                How it works
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
                {steps.map((step, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <motion.div
                      whileHover={{ y: -3, boxShadow: "var(--shadow-md)", transition: { duration: 0.2 } }}
                      style={{
                        backgroundColor: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        borderRadius: 12,
                        padding: "20px 28px",
                        textAlign: "center",
                        minWidth: 160,
                        boxShadow: "var(--shadow-sm)",
                        transition: "background-color 0.3s, border-color 0.3s",
                      }}
                    >
                      <p className="mono" style={{ fontSize: 22, fontWeight: 700, color: "var(--accent)", marginBottom: 6 }}>
                        {step.num}
                      </p>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 2, letterSpacing: "-0.01em" }}>
                        {step.title}
                      </p>
                      <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{step.desc}</p>
                    </motion.div>
                    {i < steps.length - 1 && <ArrowRight size={16} color="var(--text-ghost)" />}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 48 }}>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 4px 24px rgba(99,102,241,0.25)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onTabChange("upload")}
                style={{
                  height: 50,
                  borderRadius: 12,
                  border: "none",
                  background: "linear-gradient(135deg, #818cf8, #6366f1, #06b6d4)",
                  color: "#ffffff",
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "Inter, system-ui, sans-serif",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "0 28px",
                  boxShadow: "0 2px 16px rgba(99,102,241,0.18)",
                  letterSpacing: "-0.01em",
                }}
              >
                <CloudUpload size={16} />
                Upload a Document
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onTabChange("chat")}
                style={{
                  height: 50,
                  borderRadius: 12,
                  border: "1px solid var(--border)",
                  background: "var(--bg-raised)",
                  color: "var(--text-secondary)",
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "Inter, system-ui, sans-serif",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "0 28px",
                  transition: "all 0.15s",
                  letterSpacing: "-0.01em",
                  boxShadow: "var(--shadow-sm)",
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
                <MessageCircle size={16} />
                Start Chatting
              </motion.button>
            </motion.div>

            {/* Security */}
            <motion.div
              variants={fadeUp}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 32 }}
            >
              <Shield size={13} color="var(--text-ghost)" />
              <p style={{ fontSize: 12, color: "var(--text-ghost)" }}>
                100% local — your data never leaves your machine
              </p>
            </motion.div>

            {/* Tech */}
            <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "center", gap: 20 }}>
              {["FastAPI", "FAISS", "Ollama", "RAG"].map((t) => (
                <span key={t} className="mono" style={{ fontSize: 10, color: "var(--text-ghost)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>
        );

      case "upload":
        return (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            style={{ padding: "64px 48px" }}
          >
            <UploadCard onUploadSuccess={onUploadSuccess} />
          </motion.div>
        );

      case "chat":
        return (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            style={{ height: "100vh" }}
          >
            <ChatPanel userName={userName} />
          </motion.div>
        );

      case "history":
        return (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--bg-raised)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                  transition: "all 0.3s",
                }}
              >
                <Layers size={24} color="var(--text-ghost)" />
              </div>
              <p style={{ fontSize: 16, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "-0.01em" }}>History</p>
              <p style={{ fontSize: 13, color: "var(--text-ghost)", marginTop: 4 }}>Coming soon</p>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar
        activeTab={activeTab}
        onTabChange={onTabChange}
        userName={userName}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

      <div style={{ marginLeft: 240, flex: 1, position: "relative" }}>
        {/* Header */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 40px",
            borderBottom: "1px solid var(--border)",
            backgroundColor: "var(--bg)",
            backdropFilter: "blur(12px)",
            transition: "all 0.3s",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
            <span style={{ color: "var(--text-muted)" }}>Workspace</span>
            <span style={{ color: "var(--text-ghost)" }}>/</span>
            <span
              style={{
                color: "var(--text-primary)",
                fontWeight: 500,
                textTransform: "capitalize",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {pageIcons[activeTab]}
              {activeTab}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: "var(--text-secondary)",
                backgroundColor: "var(--bg-raised)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "5px 12px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "all 0.3s",
              }}
            >
              <Cpu size={12} color="var(--accent)" />
              RAG
            </div>
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: "var(--success)",
                backgroundColor: "var(--bg-raised)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "5px 12px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "all 0.3s",
              }}
            >
              <Wifi size={12} />
              Connected
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
      </div>
    </div>
  );
}