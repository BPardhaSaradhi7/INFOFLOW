import { motion } from "framer-motion";
import { FileText } from "lucide-react";

interface Props {
  type: "user" | "ai";
  text: string;
  sources?: number[];
  userName: string;
}

const logoUri = (window as unknown as Record<string, string>).__INFOFLOW_LOGO_URI__ || "/logo.svg";

export default function MessageBubble({ type, text, sources = [], userName }: Props) {
  if (type === "user") {
    return (
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}
      >
        <div style={{ maxWidth: "70%" }}>
          <p className="mono" style={{ fontSize: 10, color: "var(--text-ghost)", textAlign: "right", marginBottom: 6, letterSpacing: "0.04em" }}>
            {userName}
          </p>
          <div
            style={{
              backgroundColor: "var(--bg-raised)",
              border: "1px solid var(--border)",
              borderRadius: "16px 16px 4px 16px",
              padding: "14px 18px",
              boxShadow: "var(--shadow-sm)",
              transition: "all 0.3s",
            }}
          >
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-primary)" }}>{text}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", gap: 12, marginBottom: 24 }}
    >
      <img
        src={logoUri}
        alt="AI"
        style={{
          width: 30,
          height: 30,
          borderRadius: 10,
          flexShrink: 0,
          marginTop: 2,
          boxShadow: "0 2px 8px rgba(99,102,241,0.08)",
        }}
      />

      <div style={{ flex: 1, maxWidth: "80%" }}>
        <p className="mono" style={{ fontSize: 10, color: "var(--text-ghost)", marginBottom: 6, letterSpacing: "0.04em" }}>
          InfoFlow AI · RAG
        </p>
        <div
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "16px 16px 16px 4px",
            padding: "16px 20px",
            boxShadow: "var(--shadow-sm)",
            transition: "all 0.3s",
          }}
        >
          <p style={{ fontSize: 14, lineHeight: 1.75, color: "var(--text-primary)", whiteSpace: "pre-wrap", letterSpacing: "-0.005em" }}>{text}</p>

          {sources.length > 0 && (
            <div style={{
              marginTop: 14,
              paddingTop: 12,
              borderTop: "1px solid var(--border)",
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              alignItems: "center",
              transition: "border-color 0.3s",
            }}>
              <FileText size={12} color="var(--text-muted)" />
              <span className="mono" style={{ fontSize: 10, color: "var(--text-ghost)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Sources
              </span>
              {sources.map((s, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                  className="mono"
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: "var(--accent-text)",
                    backgroundColor: "var(--accent-soft)",
                    border: "1px solid var(--accent-border)",
                    borderRadius: 6,
                    padding: "2px 8px",
                  }}
                >
                  Page {s}
                </motion.span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}