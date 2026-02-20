import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Loader } from "lucide-react";
import { askQuestion } from "../lib/api";
import MessageBubble from "./MessageBubble";

interface ConvoItem {
  type: "user" | "ai";
  text: string;
  sources?: number[];
}

interface Props {
  userName: string;
}

const logoUri = (window as unknown as Record<string, string>).__INFOFLOW_LOGO_URI__ || "/logo.svg";

export default function ChatPanel({ userName }: Props) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [convo, setConvo] = useState<ConvoItem[]>([]);
  const [error, setError] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [convo, loading]);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || loading) return;
    const q = question.trim();
    setQuestion("");
    setError("");
    setLoading(true);
    setConvo((p) => [...p, { type: "user", text: q }]);
    try {
      const data = await askQuestion(q);
      setConvo((p) => [...p, { type: "ai", text: data.answer, sources: data.sources || [] }]);
    } catch (err: unknown) {
      const e = err as { response?: { data?: { detail?: string } } };
      setError(e.response?.data?.detail || "Failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "36px 0" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 28px" }}>
          {convo.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{ textAlign: "center", paddingTop: 80 }}
            >
              <img
                src={logoUri}
                alt="InfoFlow AI"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  marginBottom: 20,
                  display: "inline-block",
                  boxShadow: "0 4px 16px rgba(99,102,241,0.1)",
                }}
              />
              <p style={{ fontSize: 18, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 6 }}>
                Ready to help
              </p>
              <p style={{ fontSize: 14, color: "var(--text-muted)", maxWidth: 320, margin: "0 auto", lineHeight: 1.6 }}>
                Upload a PDF first, then ask anything about your documents
              </p>

              {/* Suggestions */}
              <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
                {["Summarize the document", "What are the key points?", "Explain section 2"].map((s) => (
                  <motion.button
                    key={s}
                    whileHover={{ scale: 1.02, borderColor: "var(--border-hover)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setQuestion(s)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 10,
                      border: "1px solid var(--border)",
                      backgroundColor: "var(--bg-raised)",
                      color: "var(--text-secondary)",
                      fontSize: 12,
                      fontWeight: 500,
                      fontFamily: "Inter, system-ui, sans-serif",
                      cursor: "pointer",
                      transition: "all 0.15s",
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >
                    {s}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {convo.map((item, i) => (
            <MessageBubble key={i} type={item.type} text={item.text} sources={item.sources} userName={userName} />
          ))}

          {/* Typing indicator */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}
              >
                <img src={logoUri} alt="AI" style={{ width: 30, height: 30, borderRadius: 10 }} />
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        backgroundColor: "var(--accent)",
                      }}
                    />
                  ))}
                  <span className="mono" style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: 6 }}>
                    Thinking...
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid rgba(248, 113, 113, 0.2)",
                backgroundColor: "var(--error-soft)",
                marginBottom: 16,
                transition: "all 0.3s",
              }}
            >
              <p style={{ fontSize: 13, color: "var(--error)" }}>{error}</p>
            </motion.div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input bar */}
      <div style={{ padding: "16px 28px 28px", maxWidth: 720, margin: "0 auto", width: "100%" }}>
        <form
          onSubmit={handleAsk}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            borderRadius: 16,
            padding: 2,
            background: inputFocused
              ? "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(6,182,212,0.3))"
              : "transparent",
            transition: "background 0.3s",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flex: 1,
              backgroundColor: "var(--bg-card)",
              border: inputFocused ? "none" : "1px solid var(--border)",
              borderRadius: 14,
              padding: "8px 8px 8px 18px",
              boxShadow: inputFocused ? "var(--shadow-lg)" : "var(--shadow-md)",
              transition: "all 0.3s",
            }}
          >
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              placeholder={`Ask anything, ${userName}...`}
              disabled={loading}
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                color: "var(--text-primary)",
                fontSize: 14,
                outline: "none",
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={!question.trim() || loading}
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                border: "none",
                background: question.trim()
                  ? "linear-gradient(135deg, #6366f1, #06b6d4)"
                  : "var(--border)",
                color: question.trim() ? "#ffffff" : "var(--text-muted)",
                cursor: question.trim() ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.15s",
                flexShrink: 0,
                boxShadow: question.trim() ? "0 2px 12px rgba(99,102,241,0.2)" : "none",
              }}
            >
              {loading ? <Loader size={16} className="animate-spin" /> : <ArrowUp size={16} />}
            </motion.button>
          </div>
        </form>
        <p className="mono" style={{ fontSize: 10, color: "var(--text-ghost)", textAlign: "center", marginTop: 10, letterSpacing: "0.04em" }}>
          Answers are generated from your uploaded documents via RAG
        </p>
      </div>
    </div>
  );
}