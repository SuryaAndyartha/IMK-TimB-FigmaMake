import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, Users, Star, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { useTheme } from "../contexts/ThemeContext";
import { TransitionLoader } from "../components/TransitionLoader";

const categories = ["Semua", "Logika", "Memori", "Fokus", "Kecepatan"];

const allGames = [
  {
    id: 1,
    name: "Memory Match",
    desc: "Temukan pasangan kartu dalam waktu sesingkat mungkin.",
    emoji: "🧩",
    category: "Memori",
    difficulty: "Mudah",
    diffColor: "#84CC16",
    diffBg: "rgba(132,204,22,0.18)",
    gradient: "linear-gradient(135deg, #06B6D4 0%, #0284C7 100%)",
    glow: "0 8px 32px rgba(6,182,212,0.35)",
    time: "3 mnt",
    players: "12.4K",
    rating: 4.8,
    xp: 120,
    route: "/app/games/memory-match",
    available: true,
  },
  {
    id: 2,
    name: "Logic Puzzle",
    desc: "Selesaikan teka-teki logika dengan pola berpikir kritis.",
    emoji: "🔮",
    category: "Logika",
    difficulty: "Sedang",
    diffColor: "#F59E0B",
    diffBg: "rgba(245,158,11,0.18)",
    gradient: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",
    glow: "0 8px 32px rgba(124,58,237,0.35)",
    time: "5 mnt",
    players: "9.8K",
    rating: 4.9,
    xp: 200,
    route: "/app/games/logic-puzzle",
    available: true,
  },
  {
    id: 3,
    name: "Speed Math",
    desc: "Kalkulasi matematika cepat sebelum waktu habis!",
    emoji: "⚡",
    category: "Kecepatan",
    difficulty: "Sulit",
    diffColor: "#EF4444",
    diffBg: "rgba(239,68,68,0.18)",
    gradient: "linear-gradient(135deg, #EC4899 0%, #9D174D 100%)",
    glow: "0 8px 32px rgba(236,72,153,0.35)",
    time: "2 mnt",
    players: "7.2K",
    rating: 4.7,
    xp: 350,
    route: null,
    available: false,
  },
  {
    id: 4,
    name: "Pattern Find",
    desc: "Identifikasi pola tersembunyi dalam urutan angka dan simbol.",
    emoji: "🎯",
    category: "Fokus",
    difficulty: "Mudah",
    diffColor: "#84CC16",
    diffBg: "rgba(132,204,22,0.18)",
    gradient: "linear-gradient(135deg, #84CC16 0%, #4D7C0F 100%)",
    glow: "0 8px 32px rgba(132,204,22,0.3)",
    time: "4 mnt",
    players: "11.1K",
    rating: 4.6,
    xp: 150,
    route: null,
    available: false,
  },
  {
    id: 5,
    name: "Word Chain",
    desc: "Hubungkan kata-kata dalam rantai asosiasi yang logis.",
    emoji: "📝",
    category: "Logika",
    difficulty: "Sedang",
    diffColor: "#F59E0B",
    diffBg: "rgba(245,158,11,0.18)",
    gradient: "linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)",
    glow: "0 8px 32px rgba(59,130,246,0.3)",
    time: "5 mnt",
    players: "6.5K",
    rating: 4.5,
    xp: 180,
    route: null,
    available: false,
  },
  {
    id: 6,
    name: "Visual Maze",
    desc: "Navigasi labirin visual yang semakin kompleks.",
    emoji: "🌀",
    category: "Fokus",
    difficulty: "Sulit",
    diffColor: "#EF4444",
    diffBg: "rgba(239,68,68,0.18)",
    gradient: "linear-gradient(135deg, #F97316 0%, #C2410C 100%)",
    glow: "0 8px 32px rgba(249,115,22,0.3)",
    time: "6 mnt",
    players: "5.3K",
    rating: 4.8,
    xp: 300,
    route: null,
    available: false,
  },
  {
    id: 7,
    name: "Number Sequence",
    desc: "Temukan angka berikutnya dalam deret yang rumit.",
    emoji: "🔢",
    category: "Logika",
    difficulty: "Sulit",
    diffColor: "#EF4444",
    diffBg: "rgba(239,68,68,0.18)",
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #4C1D95 100%)",
    glow: "0 8px 32px rgba(139,92,246,0.3)",
    time: "4 mnt",
    players: "8.9K",
    rating: 4.9,
    xp: 280,
    route: null,
    available: false,
  },
  {
    id: 8,
    name: "Reaction Test",
    desc: "Uji kecepatan reaksimu terhadap stimulus visual.",
    emoji: "🎮",
    category: "Kecepatan",
    difficulty: "Mudah",
    diffColor: "#84CC16",
    diffBg: "rgba(132,204,22,0.18)",
    gradient: "linear-gradient(135deg, #06B6D4 0%, #7C3AED 100%)",
    glow: "0 8px 32px rgba(6,182,212,0.3)",
    time: "2 mnt",
    players: "15.2K",
    rating: 4.7,
    xp: 100,
    route: null,
    available: false,
  },
];

export function GameModes() {
  const [activeTab, setActiveTab] = useState("Semua");
  const { t } = useTheme();
  const navigate = useNavigate();

  // ── State loading ──────────────────────────────────────────────────────────
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Memuat permainan...");

  const filtered =
    activeTab === "Semua"
      ? allGames
      : allGames.filter((g) => g.category === activeTab);

  // ── Handle tombol main ─────────────────────────────────────────────────────
  const handlePlay = (game: typeof allGames[0]) => {
    if (!game.available || !game.route) return;

    setLoadingMessage(`Memuat ${game.name}...`);
    setIsLoading(true);

    setTimeout(() => {
      navigate(game.route!);
    }, 1200);
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        background: t.pageBg,
        minHeight: "100%",
        transition: "background 0.3s",
      }}
    >
      {/* Status Bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1">
        <span style={{ color: t.statusText, fontSize: 13, fontWeight: 600 }}>
          09:41
        </span>
        <div className="flex gap-[3px] items-end">
          {[3, 5, 7, 9].map((h, i) => (
            <div
              key={i}
              className="rounded-sm"
              style={{
                width: 3,
                height: h,
                background: i < 3 ? t.signalOn : t.signalOff,
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="px-5 pt-4 pb-4">
        <h1
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: t.text,
            lineHeight: 1.1,
          }}
        >
          Mode{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #A78BFA, #06B6D4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Permainan
          </span>
        </h1>
        <p style={{ fontSize: 13, color: t.textSub, marginTop: 4 }}>
          Pilih game dan asah kemampuanmu 🚀
        </p>
      </div>

      {/* Category Tabs */}
      <div
        className="overflow-x-auto px-5 mb-5"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex gap-2" style={{ width: "max-content" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className="px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: 13,
                fontWeight: 600,
                background:
                  activeTab === cat
                    ? "linear-gradient(90deg, #7C3AED, #06B6D4)"
                    : t.categoryTabBg,
                color: activeTab === cat ? "#fff" : t.categoryTabText,
                border:
                  activeTab === cat
                    ? "none"
                    : `1px solid ${t.categoryTabBorder}`,
                boxShadow:
                  activeTab === cat
                    ? "0 4px 16px rgba(124,58,237,0.4)"
                    : "none",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Games Grid */}
      <div className="px-5 pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-4"
          >
            {filtered.map((game, i) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: t.gamecardBg,
                  border: `1px solid ${t.gamecardBorder}`,
                  backdropFilter: "blur(12px)",
                  opacity: game.available ? 1 : 0.75,
                }}
              >
                {/* Card top accent bar */}
                <div style={{ height: 3, background: game.gradient }} />

                <div className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className="flex-shrink-0 rounded-2xl flex items-center justify-center"
                      style={{
                        width: 60,
                        height: 60,
                        background: game.gradient,
                        boxShadow: game.glow,
                      }}
                    >
                      <span style={{ fontSize: 28 }}>{game.emoji}</span>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <h3
                            style={{
                              fontSize: 16,
                              fontWeight: 700,
                              color: t.gameNameColor,
                            }}
                          >
                            {game.name}
                          </h3>
                          {game.available && (
                            <span
                              className="flex items-center gap-1 px-1.5 py-0.5 rounded-full"
                              style={{
                                fontSize: 9,
                                fontWeight: 700,
                                color: "#84CC16",
                                background: "rgba(132,204,22,0.15)",
                                border: "1px solid rgba(132,204,22,0.3)",
                              }}
                            >
                              <PlayCircle size={9} />
                              DEMO
                            </span>
                          )}
                        </div>
                        <span
                          className="px-2 py-0.5 rounded-full flex-shrink-0 ml-2"
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: game.diffColor,
                            background: game.diffBg,
                          }}
                        >
                          {game.difficulty}
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: 12,
                          color: t.gameDescColor,
                          lineHeight: 1.5,
                          marginBottom: 10,
                        }}
                      >
                        {game.desc}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-1">
                          <Clock size={11} style={{ color: t.textMuted }} />
                          <span style={{ fontSize: 11, color: t.textMuted }}>
                            {game.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={11} style={{ color: t.textMuted }} />
                          <span style={{ fontSize: 11, color: t.textMuted }}>
                            {game.players}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star size={11} style={{ color: "#F59E0B" }} />
                          <span
                            style={{
                              fontSize: 11,
                              color: "#F59E0B",
                              fontWeight: 600,
                            }}
                          >
                            {game.rating}
                          </span>
                        </div>
                        <span
                          className="ml-auto px-2 py-0.5 rounded-full"
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: "#A78BFA",
                            background: "rgba(124,58,237,0.15)",
                          }}
                        >
                          +{game.xp} XP
                        </span>
                      </div>

                      {/* Play button */}
                      <button
                        className="w-full py-2.5 rounded-xl transition-all duration-200 active:scale-95"
                        style={{
                          background: game.available
                            ? game.gradient
                            : t.surface2,
                          boxShadow: game.available ? game.glow : "none",
                          border: game.available
                            ? "none"
                            : `1px solid ${t.surface2Border}`,
                          fontSize: 13,
                          fontWeight: 700,
                          color: game.available ? "#fff" : t.textMuted,
                          fontFamily: "Poppins, sans-serif",
                          letterSpacing: 0.3,
                          cursor: game.available ? "pointer" : "not-allowed",
                        }}
                        onClick={() => handlePlay(game)}
                        disabled={!game.available}
                        aria-label={
                          game.available
                            ? `Main ${game.name}`
                            : `${game.name} belum tersedia`
                        }
                      >
                        {game.available ? "🎮 Main Sekarang" : "🔒 Segera Hadir"}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── TransitionLoader: tampil saat navigasi ke game ── */}
      <AnimatePresence>
        {isLoading && <TransitionLoader message={loadingMessage} />}
      </AnimatePresence>
    </div>
  );
}
