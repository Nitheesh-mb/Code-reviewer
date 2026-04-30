import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Sparkles, Code2, AlertCircle, CheckCircle2, Zap, Send, Loader2 } from "lucide-react";

const Review = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReview = async () => {
    if (!code.trim()) return;

    setLoading(true);
    setError("");
    setReview(null);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "https://code-reviewer-c437.onrender.com/api/ai/review",
        { code, language },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setReview(res.data.review.review);
      } else {
        setError(res.data.message || "Review failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden">
      <div className="md:w-1/2 w-full border-r border-zinc-800 flex flex-col bg-zinc-950">
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <Code2 size={18} className="text-indigo-400" />
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Input Code</span>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300 outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
            </select>
            <button
              onClick={handleReview}
              disabled={!code.trim() || loading}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20"
            >
              {loading ? <Loader2 className="animate-spin" size={14} /> : <Zap size={14} />}
              {loading ? "Analyzing..." : "Review Code"}
            </button>
          </div>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="// Paste your code snippet here..."
          spellCheck={false}
          className="flex-1 bg-transparent resize-none p-6 text-sm font-mono text-zinc-300 outline-none placeholder:text-zinc-700"
        />
        <div className="px-6 py-3 border-t border-zinc-800 bg-zinc-900/30 flex items-center justify-between">
          <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
            {code.length > 0 ? `${code.split("\n").length} Lines` : "Ready"}
          </span>
        </div>
      </div>

      <div className="md:w-1/2 w-full overflow-y-auto bg-[#050505] p-6 lg:p-8 custom-scrollbar">
        {loading && (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-zinc-500 animate-pulse">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center">
              <Loader2 className="animate-spin text-indigo-500" size={24} />
            </div>
            <p className="text-sm font-medium tracking-wide">Synthesizing analysis...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 text-sm text-red-400 flex items-start gap-4">
            <AlertCircle size={20} className="shrink-0" />
            <div>
              <p className="font-bold mb-1 uppercase tracking-widest text-xs">Error</p>
              <p className="leading-relaxed opacity-80">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && !review && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 bg-zinc-900 rounded-3xl flex items-center justify-center mb-6 shadow-2xl border border-zinc-800">
              <Code2 size={40} className="text-zinc-700" />
            </div>
            <h3 className="text-xl font-bold text-zinc-300">Intelligent Code Analysis</h3>
            <p className="text-zinc-500 mt-2 max-w-xs text-sm leading-relaxed">
              Paste your code on the left and let AI identify bugs, suggest improvements, and refactor for performance.
            </p>
          </div>
        )}

        {review && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="text-indigo-500" size={20} />
                Analysis Results
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
                <div className="bg-red-500/5 px-6 py-4 border-b border-zinc-800 flex items-center gap-3">
                  <AlertCircle size={18} className="text-red-400" />
                  <span className="text-xs font-bold text-red-400 uppercase tracking-widest">Bugs & Issues</span>
                </div>
                <div className="p-6 text-sm text-zinc-300 prose prose-invert max-w-none prose-sm">
                  <ReactMarkdown>{review.bugs || "No bugs detected."}</ReactMarkdown>
                </div>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
                <div className="bg-amber-500/5 px-6 py-4 border-b border-zinc-800 flex items-center gap-3">
                  <Zap size={18} className="text-amber-400" />
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Suggested Improvements</span>
                </div>
                <div className="p-6 text-sm text-zinc-300 prose prose-invert max-w-none prose-sm">
                  <ReactMarkdown>{review.improvements || "Code looks good!"}</ReactMarkdown>
                </div>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
                <div className="bg-indigo-500/5 px-6 py-4 border-b border-zinc-800 flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-indigo-400" />
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Refactored Solution</span>
                </div>
                <div className="p-0 border-t border-zinc-800">
                  <SyntaxHighlighter
                    language={language}
                    style={vscDarkPlus}
                    customStyle={{ margin: 0, padding: "1.5rem", background: "#050505", fontSize: "13px" }}
                  >
                    {review.refactoredCode || "// No refactoring needed"}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
