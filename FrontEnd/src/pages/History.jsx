import React, { useState, useEffect } from "react";
import axios from "axios";
import { History as HistoryIcon, Code, Calendar, ChevronRight, Loader2, Search, Filter } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const History = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:5000/api/ai/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(data.reviews);
    } catch (err) {
      setError("Failed to fetch history");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-indigo-500" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <HistoryIcon className="text-indigo-500" size={32} />
            Review History
          </h1>
          <p className="text-zinc-400 mt-2">View and manage your previous code analyses</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input 
              type="text" 
              placeholder="Search history..." 
              className="bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 mb-6">
          {error}
        </div>
      )}

      {reviews.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900/50 rounded-3xl border border-zinc-800 border-dashed">
          <Code className="mx-auto text-zinc-700 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-zinc-300">No reviews found</h3>
          <p className="text-zinc-500 mt-2">Start by reviewing some code to see your history here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
            {reviews.map((review) => (
              <div
                key={review._id}
                onClick={() => setSelectedReview(review)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedReview?._id === review._id
                    ? "bg-indigo-600/10 border-indigo-500 shadow-lg shadow-indigo-500/5"
                    : "bg-zinc-900 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                    {review.language}
                  </span>
                  <div className="flex items-center gap-1 text-zinc-500 text-xs">
                    <Calendar size={12} />
                    {formatDate(review.createdAt)}
                  </div>
                </div>
                <h4 className="text-white font-medium truncate mb-1">
                  Snippet: {review.code.substring(0, 30)}...
                </h4>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-zinc-500">
                    {review.review.bugs ? "Issues found" : "Clean code"}
                  </span>
                  <ChevronRight size={16} className="text-zinc-600" />
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2">
            {selectedReview ? (
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 lg:p-8 animate-in fade-in duration-300">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Review Details</h2>
                  <div className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-bold border border-indigo-500/20">
                    {selectedReview.language.toUpperCase()}
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-3">Original Code</h3>
                    <div className="rounded-xl overflow-hidden border border-zinc-800">
                      <SyntaxHighlighter
                        language={selectedReview.language}
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, padding: "1.5rem", background: "#050505" }}
                      >
                        {selectedReview.code}
                      </SyntaxHighlighter>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
                      <h4 className="text-red-400 font-bold text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                        Bugs & Issues
                      </h4>
                      <div className="text-zinc-300 text-sm prose prose-invert max-w-none">
                        <ReactMarkdown>{selectedReview.review.bugs}</ReactMarkdown>
                      </div>
                    </div>
                    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
                      <h4 className="text-amber-400 font-bold text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                        Improvements
                      </h4>
                      <div className="text-zinc-300 text-sm prose prose-invert max-w-none">
                        <ReactMarkdown>{selectedReview.review.improvements}</ReactMarkdown>
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
                    <h4 className="text-emerald-400 font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                      Refactored Code
                    </h4>
                    <div className="rounded-xl overflow-hidden border border-zinc-800">
                      <SyntaxHighlighter
                        language={selectedReview.language}
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, padding: "1.5rem", background: "#000" }}
                      >
                        {selectedReview.review.refactoredCode}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-zinc-900/30 border border-zinc-800 border-dashed rounded-3xl">
                <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                  <ChevronRight size={32} className="text-zinc-600" />
                </div>
                <h3 className="text-zinc-400 font-medium">Select a review from the list to see details</h3>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
