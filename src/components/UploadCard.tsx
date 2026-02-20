import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloudUpload, File, CheckCircle, AlertTriangle, Loader, X } from "lucide-react";
import { uploadPDF } from "../lib/api";

type Status = "idle" | "uploading" | "success" | "error";

interface Props {
  onUploadSuccess?: () => void;
}

export default function UploadCard({ onUploadSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [chunks, setChunks] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: globalThis.File | undefined) => {
    if (f && f.type === "application/pdf") {
      setFile(f);
      setStatus("idle");
      setMessage("");
    } else {
      setStatus("error");
      setMessage("Only PDF files are accepted.");
    }
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    setStatus("uploading");
    setMessage("");
    try {
      const data = await uploadPDF(file);
      setStatus("success");
      setMessage(data.message || "Indexed successfully! Redirecting to Chat...");
      setChunks(data.total_chunks || 0);
      setTimeout(() => {
        onUploadSuccess?.();
      }, 1500);
    } catch (err: unknown) {
      const e = err as { response?: { data?: { detail?: string } } };
      setStatus("error");
      setMessage(e.response?.data?.detail || "Upload failed. Check backend.");
    }
  };

  const clearFile = () => {
    setFile(null);
    setStatus("idle");
    setMessage("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const canUpload = file && status !== "uploading";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        maxWidth: 520,
        margin: "0 auto",
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        padding: 32,
        boxShadow: "var(--shadow-md)",
        transition: "all 0.3s",
      }}
    >
      <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4, letterSpacing: "-0.01em" }}>
        Upload Document
      </h2>
      <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 28 }}>
        Drop a PDF to index into your knowledge base
      </p>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setDragging(false); }}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
        onClick={() => inputRef.current?.click()}
        style={{
          border: dragging ? "2px dashed var(--accent)" : "2px dashed var(--border)",
          borderRadius: 12,
          padding: "48px 24px",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: dragging ? "var(--accent-soft)" : "transparent",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => { if (!dragging) e.currentTarget.style.borderColor = "var(--border-hover)"; }}
        onMouseLeave={(e) => { if (!dragging) e.currentTarget.style.borderColor = "var(--border)"; }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          onChange={(e) => handleFile(e.target.files?.[0])}
          style={{ display: "none" }}
        />
        <CloudUpload size={32} color="var(--text-muted)" style={{ margin: "0 auto 12px", display: "block" }} />
        <p style={{ fontSize: 14, fontWeight: 500, color: "var(--text-secondary)" }}>
          Drag & drop your PDF here
        </p>
        <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>or click to browse</p>
      </div>

      {/* File pill */}
      <AnimatePresence>
        {file && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                marginTop: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "var(--bg-input)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: "10px 14px",
                transition: "all 0.3s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                <File size={18} color="var(--accent)" />
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {file.name}
                  </p>
                  <p className="mono" style={{ fontSize: 11, color: "var(--text-muted)" }}>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={clearFile}
                style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: 4, display: "flex" }}
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload button */}
      <motion.button
        whileHover={{ scale: 1.01, boxShadow: canUpload ? "0 4px 24px rgba(99, 102, 241, 0.3)" : "none" }}
        whileTap={{ scale: 0.99 }}
        onClick={handleUpload}
        disabled={!file || status === "uploading"}
        style={{
          width: "100%",
          height: 48,
          marginTop: 20,
          borderRadius: 10,
          border: "none",
          background: canUpload
            ? "linear-gradient(135deg, #818cf8, #6366f1, #06b6d4)"
            : "var(--border)",
          color: canUpload ? "#ffffff" : "var(--text-muted)",
          fontSize: 14,
          fontWeight: 600,
          fontFamily: "Inter, system-ui, sans-serif",
          cursor: canUpload ? "pointer" : "not-allowed",
          transition: "all 0.2s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          boxShadow: canUpload ? "0 2px 16px rgba(99, 102, 241, 0.2)" : "none",
        }}
      >
        {status === "uploading" ? (
          <>
            <Loader size={16} className="animate-spin" />
            Indexing...
          </>
        ) : (
          <>
            <CloudUpload size={16} />
            Upload & Index
          </>
        )}
      </motion.button>

      {/* Status */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              marginTop: 16,
              padding: "12px 14px",
              borderRadius: 10,
              border: status === "success"
                ? "1px solid rgba(52, 211, 153, 0.2)"
                : "1px solid rgba(248, 113, 113, 0.2)",
              backgroundColor: status === "success" ? "var(--success-soft)" : "var(--error-soft)",
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              transition: "all 0.3s",
            }}
          >
            {status === "success" ? (
              <CheckCircle size={16} color="var(--success)" style={{ marginTop: 1, flexShrink: 0 }} />
            ) : (
              <AlertTriangle size={16} color="var(--error)" style={{ marginTop: 1, flexShrink: 0 }} />
            )}
            <div>
              <p style={{ fontSize: 13, fontWeight: 500, color: status === "success" ? "var(--success)" : "var(--error)" }}>
                {message}
              </p>
              {status === "success" && chunks > 0 && (
                <p className="mono" style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
                  {chunks} chunks indexed
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}