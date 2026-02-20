import { useState, useEffect } from "react";
import WelcomeGate from "./components/WelcomeGate";
import AppShell from "./components/AppShell";

export default function App() {
  const [userName, setUserName] = useState("");
  const [activeTab, setActiveTab] = useState("home");
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [docsCount, setDocsCount] = useState(0);

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  // Set light mode on first load
  useEffect(() => {
    document.body.classList.add("light");
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const handleUploadSuccess = () => {
    setDocsCount((c) => c + 1);
    setActiveTab("chat");
  };

  if (!userName) {
    return <WelcomeGate onSubmit={(name) => setUserName(name)} />;
  }

  return (
    <AppShell
      userName={userName}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      theme={theme}
      onToggleTheme={toggleTheme}
      docsCount={docsCount}
      onUploadSuccess={handleUploadSuccess}
    />
  );
}