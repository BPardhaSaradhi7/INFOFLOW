import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, User } from "lucide-react";

interface Props {
  onSubmit: (name: string) => void;
}

const logoUri = (window as unknown as Record<string, string>).__INFOFLOW_LOGO_URI__ || "/logo.svg";

export default function WelcomeGate({ onSubmit }: Props) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [exiting, setExiting] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = name.trim();
    if (!t) { setError("Enter your name to continue."); return; }
    if (t.length < 2) { setError("At least 2 characters."); return; }
    setExiting(true);
    setTimeout(() => onSubmit(t), 400);
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "var(--bg)",
            overflow: "hidden",
          }}
        >
          {/* Animated background orbs */}
          <div
            className="animate-float"
            style={{
              position: "absolute",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
              top: "10%",
              left: "15%",
              pointerEvents: "none",
            }}
          />
          <div
            className="animate-float-delayed"
            style={{
              position: "absolute",
              width: 350,
              height: 350,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)",
              bottom: "10%",
              right: "15%",
              pointerEvents: "none",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: "100%", maxWidth: 420, padding: "0 24px", position: "relative", zIndex: 1 }}
          >
            {/* Branding */}
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <motion.img
                src={logoUri}
                alt="InfoFlow AI"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 180, damping: 14 }}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  marginBottom: 20,
                  display: "inline-block",
                  boxShadow: "0 4px 20px rgba(99,102,241,0.12)",
                }}
              />
              <motion.h1
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  color: "var(--text-primary)",
                  marginBottom: 6,
                }}
              >
                InfoFlow AI
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                style={{ fontSize: 14, color: "var(--text-muted)", letterSpacing: "-0.01em" }}
              >
                Intelligent knowledge assistant
              </motion.p>
            </div>

            {/* Card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 18,
                padding: "36px 32px",
                boxShadow: "var(--shadow-lg)",
                transition: "all 0.3s",
              }}
            >
              <p style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", textAlign: "center", marginBottom: 4, letterSpacing: "-0.01em" }}>
                What should we call you?
              </p>
              <p style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "center", marginBottom: 28 }}>
                Enter your name to get started
              </p>

              <form onSubmit={handleSubmit}>
                <div
                  style={{
                    position: "relative",
                    marginBottom: error ? 8 : 20,
                    borderRadius: 12,
                    padding: 2,
                    background: focused
                      ? "linear-gradient(135deg, rgba(99,102,241,0.4), rgba(6,182,212,0.4))"
                      : "transparent",
                    transition: "background 0.3s",
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <User
                      size={16}
                      color="var(--text-muted)"
                      style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", zIndex: 1 }}
                    />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => { setName(e.target.value); setError(""); }}
                      onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(e); }}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      placeholder="Your name"
                      autoFocus
                      maxLength={30}
                      style={{
                        width: "100%",
                        height: 48,
                        backgroundColor: "var(--bg-input)",
                        border: focused ? "none" : "1px solid var(--border)",
                        borderRadius: 10,
                        padding: "0 16px 0 42px",
                        fontSize: 14,
                        color: "var(--text-primary)",
                        outline: "none",
                        fontFamily: "Inter, system-ui, sans-serif",
                        transition: "all 0.2s",
                      }}
                    />
                  </div>
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ fontSize: 12, color: "var(--error)", marginBottom: 16 }}
                  >
                    {error}
                  </motion.p>
                )}

                <motion.button
                  whileHover={{ scale: 1.01, boxShadow: "0 4px 20px rgba(99,102,241,0.25)" }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  style={{
                    width: "100%",
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
                    justifyContent: "center",
                    gap: 8,
                    boxShadow: "0 2px 16px rgba(99,102,241,0.18)",
                    transition: "all 0.2s",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Continue
                  <ArrowRight size={16} />
                </motion.button>
              </form>

              <p
                className="mono"
                style={{
                  fontSize: 10,
                  color: "var(--text-ghost)",
                  textAlign: "center",
                  marginTop: 24,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Session only · Resets on reload
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}