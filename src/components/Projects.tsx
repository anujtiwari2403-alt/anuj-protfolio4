import React, { useState } from "react";
import { sound } from "../utils/sound";
import { TiltCard } from "./TiltCard";

interface ProjectsProps {
  onNotify: (msg: string) => void;
}

interface Transaction {
  id: string;
  title: string;
  amt: string;
  type: "credit" | "debit";
  time: string;
}

interface Candidate {
  name: string;
  role: string;
  round: "Aptitude" | "Technical" | "HR Final";
  cgpa: string;
  status: string;
}

export const Projects: React.FC<ProjectsProps> = ({ onNotify }) => {
  // BankFlow State
  const [balance, setBalance] = useState<number>(42850);
  const [recipient, setRecipient] = useState<string>("Tech Systems Ltd");
  const [amount, setAmount] = useState<number>(1500);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "TXN-9021",
      title: "Stipend Disbursed (NEFT)",
      amt: "+ ₹ 5,000.00",
      type: "credit",
      time: "Today, 10:42 AM",
    },
    {
      id: "TXN-8842",
      title: "Cloud Infrastructure Subscription",
      amt: "- ₹ 850.00",
      type: "debit",
      time: "Yesterday",
    },
    {
      id: "TXN-7619",
      title: "Developer Tooling Suite",
      amt: "- ₹ 1,200.00",
      type: "debit",
      time: "3 days ago",
    },
  ]);

  // Smart Placement Tracker State
  const [roundFilter, setRoundFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const candidateList: Candidate[] = [
    { name: "Aditya S.", role: "SDE Intern", round: "Technical", cgpa: "8.9", status: "Offer Received" },
    { name: "Priya M.", role: "Java Backend", round: "HR Final", cgpa: "9.2", status: "Interview Scheduled" },
    { name: "Rohan K.", role: "AI/ML Intern", round: "Technical", cgpa: "8.7", status: "Shortlisted" },
    { name: "Sneha P.", role: "Web Developer", round: "Aptitude", cgpa: "8.4", status: "In Review" },
    { name: "Vikas N.", role: "Java Developer", round: "Technical", cgpa: "9.0", status: "Shortlisted" },
  ];

  // EVM State
  const [votes, setVotes] = useState<Record<string, number>>({
    "Alpha (Clean Tech)": 142,
    "Beta (Open Source Systems)": 188,
    "Gamma (AI Research)": 215,
  });
  const [userVoted, setUserVoted] = useState<string | null>(null);

  // BankFlow Transfer Handler
  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();

    if (balance < amount) {
      onNotify("BankFlow Exception: Insufficient account balance");
      return;
    }

    setBalance((prev) => prev - amount);
    const newTxn: Transaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      title: `Transfer to ${recipient || "Beneficiary"}`,
      amt: `- ₹ ${amount.toLocaleString("en-IN")}.00`,
      type: "debit",
      time: "Just now",
    };
    setTransactions((prev) => [newTxn, ...prev.slice(0, 4)]);
    sound.playSuccess();
    onNotify(`BankFlow: Transferred ₹${amount.toLocaleString("en-IN")} successfully`);
  };

  // EVM Vote Handler
  const handleVote = (candidateName: string) => {
    sound.playClick();
    if (userVoted) {
      onNotify(`One-Voter Rule: Ballot already registered for "${userVoted}"`);
      return;
    }
    setVotes((prev) => ({
      ...prev,
      [candidateName]: (prev[candidateName] || 0) + 1,
    }));
    setUserVoted(candidateName);
    sound.playSuccess();
    onNotify(`EVM: Ballot recorded securely for ${candidateName}`);
  };

  const filteredCandidates = candidateList.filter((c) => {
    const matchRound = roundFilter === "All" || c.round === roundFilter;
    const matchQuery =
      !searchQuery ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchRound && matchQuery;
  });

  return (
    <section id="projects" className="py-20 md:py-32 border-b border-white/10 relative">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-baseline justify-between mb-12 sm:mb-16 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="font-sans font-light text-2xl sm:text-4xl text-white/20 tracking-tight">
              02
            </span>
            <div>
              <span className="text-xs sm:text-[13px] text-[#FF6A00] font-sans font-semibold tracking-normal block">
                02 · Featured work
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-[46px] font-bold text-white tracking-[-0.025em] leading-[1.15] mt-1 break-words">
                Crafted software projects.
              </h2>
            </div>
          </div>
          <span className="text-xs sm:text-[13px] text-[#B8B8B8] hidden sm:inline-block font-sans">
            Engineering & live simulators
          </span>
        </div>

        {/* PROJECTS CONTAINER */}
        <div className="space-y-16 sm:space-y-24">
          {/* PROJECT 1: BANKFLOW */}
          <TiltCard
            maxTilt={3.5}
            scale={1.01}
            className="rounded-3xl bg-[#202020] border border-white/10 p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden group hover:border-[#FF6A00]/40"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Details */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6A00]/15 border border-[#FF6A00]/30 text-xs font-semibold text-[#FF8C38]">
                  <span>Featured Flagship Project</span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-white tracking-[-0.02em] leading-tight">
                    BankFlow — Banking Management System
                  </h3>
                  <p className="font-sans text-[15px] sm:text-[17px] text-[#B8B8B8] leading-[1.75] font-normal">
                    A Java-based Banking Management System developed using Object-Oriented Programming principles. The project demonstrates practical application of Encapsulation, Abstraction, Polymorphism, and robust business exception handling.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  {["Java 21", "OOP Principles", "Exception Handling", "Transaction Safety", "Encapsulation"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-lg bg-[#151515] border border-white/10 text-white font-medium font-mono text-[11px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="https://github.com/anujtiwari2403-alt/BankFlow"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="px-6 py-3 rounded-full bg-[#FF6A00] hover:bg-[#FF8C38] text-white font-sans text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(255,106,0,0.35)] active:scale-95"
                  >
                    <span>View on GitHub</span>
                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Interactive Live Banking Terminal */}
              <div className="lg:col-span-6 w-full">
                <div className="rounded-2xl bg-[#151515] border border-white/10 p-5 sm:p-6 shadow-xl space-y-5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF6A00] animate-pulse" />
                      <span className="font-mono text-xs font-semibold text-white uppercase tracking-wider">
                        BankFlow Core v2.4
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      Active Ledger
                    </span>
                  </div>

                  {/* Account Balance Card */}
                  <div className="p-4 rounded-xl bg-[#202020] border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-[#B8B8B8] font-sans block">Primary Checking Account</span>
                      <span className="font-bold text-2xl sm:text-3xl text-white tracking-tight">
                        ₹ {balance.toLocaleString("en-IN")}.00
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#FF8C38] bg-[#FF6A00]/10 px-3 py-1 rounded-lg border border-[#FF6A00]/20">
                      INR ₹
                    </span>
                  </div>

                  {/* Transfer Simulation Form */}
                  <form onSubmit={handleTransfer} className="space-y-3 pt-1">
                    <span className="text-xs font-bold text-white uppercase tracking-wider block">
                      Initiate Fund Transfer
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-[#B8B8B8] block mb-1">Beneficiary Name</label>
                        <input
                          type="text"
                          value={recipient}
                          onChange={(e) => setRecipient(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#202020] border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF6A00]"
                          placeholder="Recipient name"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-[#B8B8B8] block mb-1">Transfer Amount (₹)</label>
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(Number(e.target.value))}
                          min={1}
                          className="w-full px-3 py-2 rounded-xl bg-[#202020] border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF6A00]"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-[#FF6A00] hover:bg-[#FF8C38] text-white text-xs font-bold transition-all shadow-md active:scale-98"
                    >
                      Execute Transfer (validateAndDebit)
                    </button>
                  </form>

                  {/* Recent Ledger Transactions */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <span className="text-[11px] text-[#B8B8B8] font-mono uppercase block">Recent Ledger Transactions</span>
                    <div className="space-y-2 max-h-[140px] overflow-y-auto">
                      {transactions.map((tx) => (
                        <div
                          key={tx.id}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-[#202020] border border-white/5 text-xs"
                        >
                          <div>
                            <span className="text-white font-medium block truncate max-w-[180px] sm:max-w-xs">
                              {tx.title}
                            </span>
                            <span className="text-[10px] text-zinc-500 font-mono">{tx.id} • {tx.time}</span>
                          </div>
                          <span
                            className={`font-semibold font-mono ${
                              tx.type === "credit" ? "text-emerald-400" : "text-rose-400"
                            }`}
                          >
                            {tx.amt}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* PROJECT 2: SMART PLACEMENT TRACKER */}
          <TiltCard
            maxTilt={3.5}
            scale={1.01}
            className="rounded-3xl bg-[#202020] border border-white/10 p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden group hover:border-[#FF6A00]/40"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Details */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white">
                  <span>Core Java & Data Structures</span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-white tracking-[-0.02em] leading-tight">
                    Smart Placement Tracker
                  </h3>
                  <p className="font-sans text-[15px] sm:text-[17px] text-[#B8B8B8] leading-[1.75] font-normal">
                    Core Java & DSA project designed to streamline and track campus placement applicant pipelines. Filter applicants by interview stages, review eligibility metrics, and inspect shortlisted candidates across rounds.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  {["Core Java", "DSA Filtering", "Pipeline Architecture", "Candidate Lifecycle"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-lg bg-[#151515] border border-white/10 text-white font-medium font-mono text-[11px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-[#151515] border border-white/5 space-y-2 text-xs text-[#B8B8B8]">
                  <span className="text-white font-bold block">Key Architectural Modules:</span>
                  <p>• Fast multi-stage candidate status evaluation using custom comparator sorts.</p>
                  <p>• Dynamic CGPA cut-off validation and automated round eligibility progression.</p>
                </div>
              </div>

              {/* Right Column: Interactive Candidate Pipeline Table */}
              <div className="lg:col-span-6 w-full">
                <div className="rounded-2xl bg-[#151515] border border-white/10 p-5 sm:p-6 shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="font-mono text-xs font-semibold text-white uppercase tracking-wider">
                      Student Placement Pipeline
                    </span>
                    {/* Search input */}
                    <input
                      type="text"
                      placeholder="Search candidate or role..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="px-3 py-1.5 rounded-lg bg-[#202020] border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF6A00]"
                    />
                  </div>

                  {/* Filter tabs */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["All", "Aptitude", "Technical", "HR Final"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => {
                          sound.playClick();
                          setRoundFilter(tab);
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                          roundFilter === tab
                            ? "bg-[#FF6A00] text-white shadow-sm"
                            : "bg-[#202020] text-[#B8B8B8] hover:text-white border border-white/5"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Candidates List */}
                  <div className="space-y-2 pt-2 max-h-[220px] overflow-y-auto">
                    {filteredCandidates.map((cand, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-[#202020] border border-white/5 flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-bold text-white block">{cand.name}</span>
                          <span className="text-[11px] text-[#B8B8B8]">{cand.role} • CGPA: {cand.cgpa}</span>
                        </div>
                        <div className="text-right">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#FF6A00]/15 text-[#FF8C38] border border-[#FF6A00]/30 block mb-1">
                            {cand.round}
                          </span>
                          <span className="text-[10px] text-zinc-400 font-medium">{cand.status}</span>
                        </div>
                      </div>
                    ))}
                    {filteredCandidates.length === 0 && (
                      <p className="text-xs text-zinc-500 text-center py-4">No candidates match current criteria.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* PROJECT 3: EVM */}
          <TiltCard
            maxTilt={3.5}
            scale={1.01}
            className="rounded-3xl bg-[#202020] border border-white/10 p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden group hover:border-[#FF8C38]/40"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Details */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8C38]/15 border border-[#FF8C38]/30 text-xs font-semibold text-[#FF8C38]">
                  <span>System Integrity Demo</span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-white tracking-[-0.02em] leading-tight">
                    EVM — Electronic Voting Machine
                  </h3>
                  <p className="font-sans text-[15px] sm:text-[17px] text-[#B8B8B8] leading-[1.75] font-normal">
                    A web development project demonstrating a digital voting interface and voting interactions. Features tamper-resistant ballot integrity and strict one-voter validation.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  {["Web Development", "Ballot Integrity", "Single Voter Rule", "Real-Time Tally"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-lg bg-[#151515] border border-white/10 text-white font-medium font-mono text-[11px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: EVM Ballot Simulator */}
              <div className="lg:col-span-6 w-full">
                <div className="rounded-2xl bg-[#151515] border border-white/10 p-5 sm:p-6 shadow-xl space-y-4 font-sans">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-mono text-xs font-semibold text-white uppercase tracking-wider">
                      EVM Secure Ballot Console
                    </span>
                    <span className="text-[11px] font-mono text-[#FF6A00] bg-[#FF6A00]/10 px-2.5 py-0.5 rounded-full border border-[#FF6A00]/20">
                      Voter ID: VTN-2026-X
                    </span>
                  </div>

                  <div className="space-y-3 pt-1">
                    {Object.entries(votes).map(([candidate, count]) => {
                      const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
                      const pct = Math.round((count / (totalVotes || 1)) * 100);
                      const isSelected = userVoted === candidate;

                      return (
                        <div
                          key={candidate}
                          className={`p-3.5 rounded-xl border transition-all ${
                            isSelected
                              ? "bg-[#202020] border-[#FF6A00]"
                              : "bg-[#202020] border-white/5 hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <span className="font-bold text-white text-xs sm:text-sm block">{candidate}</span>
                              <span className="text-[11px] text-[#B8B8B8] font-mono">{count} verified votes ({pct}%)</span>
                            </div>
                            <button
                              onClick={() => handleVote(candidate)}
                              disabled={Boolean(userVoted)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                isSelected
                                  ? "bg-emerald-500 text-white"
                                  : userVoted
                                  ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                                  : "bg-[#FF6A00] hover:bg-[#FF8C38] text-white active:scale-95"
                              }`}
                            >
                              {isSelected ? "Voted ✓" : "Cast Ballot"}
                            </button>
                          </div>
                          {/* Progress bar */}
                          <div className="w-full h-1.5 rounded-full bg-[#151515] overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#FF6A00] to-[#FF8C38] transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {userVoted && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">verified</span>
                      <span>Single-Voter Rule Enforced: Ballot securely registered for "{userVoted}".</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};
