import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Bell,
  ChevronRight,
  Flame,
  Zap,
  Trophy,
  Star,
  TrendingUp,
  TrendingDown,
  Medal,
  type LucideIcon,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useTheme } from "../contexts/ThemeContext";
import { CognitiveResultCard } from "../components/CognitiveResultCard";

const AVATAR_URL =
  "https://images.unsplash.com/photo-1565016941625-2bee25d37f72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGFzaWFuJTIwbWFuJTIwc3R1ZGVudCUyMGF2YXRhciUyMHBvcnRyYWl0fGVufDF8fHx8MTc3ODU1ODczM3ww&ixlib=rb-4.1.0&q=80&w=400";
const AVATAR2 =
  "https://images.unsplash.com/photo-1619431667975-e93b820cde63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwYXNpYW4lMjBzdHVkZW50JTIwc21pbGluZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3ODU1ODczNnww&ixlib=rb-4.1.0&q=80&w=400";
const AVATAR3 =
  "https://images.unsplash.com/photo-1758270705555-015de348a48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGFzaWFuJTIwd29tYW4lMjB1bml2ZXJzaXR5JTIwc3R1ZGVudCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3ODU1ODczNXww&ixlib=rb-4.1.0&q=80&w=400";

const gameModes = [
  {
    id: 1,
    name: "Memory Match",
    desc: "Latih daya ingat",
    emoji: "🧩",
    difficulty: "Mudah",
    diffColor: "#84CC16",
    diffBg: "rgba(132,204,22,0.15)",
    // ── Accessibility: ikon untuk tingkat kesulitan ──
    diffIcon: "●",
    gradient: "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)",
    glow: "rgba(6,182,212,0.3)",
    xp: "+120 XP",
  },
  {
    id: 2,
    name: "Logic Puzzle",
    desc: "Asah penalaran",
    emoji: "🔮",
    difficulty: "Sedang",
    diffColor: "#F59E0B",
    diffBg: "rgba(245,158,11,0.15)",
    diffIcon: "◆",
    gradient: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
    glow: "rgba(124,58,237,0.3)",
    xp: "+200 XP",
  },
  {
    id: 3,
    name: "Speed Math",
    desc: "Kalkulasi cepat",
    emoji: "⚡",
    difficulty: "Sulit",
    diffColor: "#EF4444",
    diffBg: "rgba(239,68,68,0.15)",
    diffIcon: "▲",
    gradient: "linear-gradient(135deg, #EC4899 0%, #BE185D 100%)",
    glow: "rgba(236,72,153,0.3)",
    xp: "+350 XP",
  },
  {
    id: 4,
    name: "Pattern Find",
    desc: "Temukan polanya",
    emoji: "🎯",
    difficulty: "Mudah",
    diffColor: "#84CC16",
    diffBg: "rgba(132,204,22,0.15)",
    diffIcon: "●",
    gradient: "linear-gradient(135deg, #84CC16 0%, #65A30D 100%)",
    glow: "rgba(132,204,22,0.3)",
    xp: "+150 XP",
  },
];

// ── Accessibility: rank badge config dengan ikon + label ──────────────────────
const rankConfig: Record<
  number,
  { badge: string; icon: LucideIcon; label: string; iconColor: string }
> = {
  1: { badge: "🥇", icon: Trophy,    label: "Peringkat 1", iconColor: "#F59E0B" },
  2: { badge: "🥈", icon: Medal,     label: "Peringkat 2", iconColor: "#94A3B8" },
  3: { badge: "🥉", icon: Medal,     label: "Peringkat 3", iconColor: "#CD7F32" },
};

const leaderboardPreview = [
  { rank: 1, name: "Sari Dewi",    xp: "12,450", avatar: AVATAR2,    badge: "🥇" },
  { rank: 2, name: "Budi Santoso",  xp: "11,280", avatar: AVATAR_URL, badge: "🥈", isMe: true },
  { rank: 3, name: "Anisa Putri",   xp: "10,890", avatar: AVATAR3,    badge: "🥉" },
];

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
  bg,
  glow,
  // ── Accessibility: tambah ariaLabel ──
  ariaLabel,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  sub?: string;
  color: string;
  bg: string;
  glow: string;
  ariaLabel?: string;
}) {
  const { t } = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex-1 rounded-2xl p-3"
      style={{
        background: t.surface,
        border: `1px solid ${bg}`,
        backdropFilter: "blur(12px)",
        boxShadow: `0 4px 24px ${glow}`,
      }}
      role="group"
      aria-label={ariaLabel ?? label}
    >
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center mb-2"
        style={{ background: bg, boxShadow: `0 0 12px ${glow}` }}
        aria-hidden="true"
      >
        <Icon size={16} style={{ color }} />
      </div>
      <p
        style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: 18,
          fontWeight: 700,
          color: t.text,
          lineHeight: 1,
          marginBottom: 2,
        }}
        aria-label={`${value} ${label}`}
      >
        {value}
      </p>
      <p
        style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: 10,
          color: t.textSub,
          fontWeight: 500,
        }}
      >
        {label}
      </p>
      {sub && (
        <div className="flex items-center gap-1 mt-1">
          {/* ── Accessibility: ikon tren naik/turun ── */}
          {sub.startsWith("↑") && (
            <TrendingUp size={9} style={{ color }} aria-hidden="true" />
          )}
          {sub.startsWith("↓") && (
            <TrendingDown size={9} style={{ color }} aria-hidden="true" />
          )}
          <p
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: 9,
              color,
              fontWeight: 600,
            }}
          >
            {sub}
          </p>
        </div>
      )}
    </motion.div>
  );
}

export function Dashboard() {
  const navigate = useNavigate();
  const { t } = useTheme();
  const hour = new Date().getHours();
  const greeting =
    hour < 11
      ? "Selamat pagi"
      : hour < 15
      ? "Selamat siang"
      : hour < 18
      ? "Selamat sore"
      : "Selamat malam";
  const greetEmoji =
    hour < 11 ? "🌅" : hour < 15 ? "☀️" : hour < 18 ? "🌇" : "🌙";

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        background: t.pageBg,
        minHeight: "100%",
        transition: "background 0.3s",
      }}
    >
      {/* Background blobs */}
      <div
        className="fixed pointer-events-none"
        style={{
          width: 250,
          height: 250,
          top: -60,
          right: -60,
          background:
            "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      {/* Status Bar */}
      <div className="flex items-center justify-between px-5 pt-3 pb-1">
        <span style={{ color: t.statusText, fontSize: 13, fontWeight: 600 }}>
          09:41
        </span>
        <div className="flex items-center gap-1.5" aria-hidden="true">
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
          <div
            style={{
              width: 22,
              height: 11,
              borderRadius: 3,
              border: `1.5px solid ${t.signalOn}`,
              padding: "1.5px",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "75%",
                height: "100%",
                borderRadius: 1.5,
                background: "#84CC16",
              }}
            />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <div>
          <p style={{ fontSize: 13, color: t.textSub, fontWeight: 400 }}>
            {greeting} {greetEmoji}
          </p>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: t.text,
              lineHeight: 1.2,
              marginTop: 2,
            }}
          >
            Budi Santoso! 👋
          </h1>
          <div className="flex items-center gap-1.5 mt-1.5">
            {/* ── Accessibility: level badge dengan ikon ── */}
            <div
              className="flex items-center gap-1 px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(124,58,237,0.2)",
                border: "1px solid rgba(124,58,237,0.3)",
              }}
              aria-label="Level 12"
            >
              <Star size={10} style={{ color: "#A78BFA" }} aria-hidden="true" />
              <span style={{ fontSize: 11, color: "#A78BFA", fontWeight: 600 }}>
                Level 12
              </span>
            </div>
            {/* ── Accessibility: streak badge dengan ikon api ── */}
            <div
              className="flex items-center gap-1 px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(132,204,22,0.15)",
                border: "1px solid rgba(132,204,22,0.3)",
              }}
              aria-label="Streak 7 hari berturut-turut"
            >
              <Flame size={10} style={{ color: "#84CC16" }} aria-hidden="true" />
              <span
                style={{ fontSize: 11, color: "#84CC16", fontWeight: 600 }}
              >
                7 Hari Streak
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="relative w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              background: t.iconBtnBg,
              border: `1px solid ${t.iconBtnBorder}`,
            }}
            aria-label="Notifikasi — ada notifikasi baru"
          >
            <Bell size={18} style={{ color: t.textSub }} aria-hidden="true" />
            <div
              className="absolute top-1 right-1 rounded-full"
              style={{
                width: 7,
                height: 7,
                background: "#EF4444",
                boxShadow: "0 0 6px #EF4444",
              }}
              aria-hidden="true"
            />
          </button>
          <div
            className="rounded-full overflow-hidden"
            style={{
              width: 44,
              height: 44,
              border: "2px solid #7C3AED",
              boxShadow: "0 0 12px rgba(124,58,237,0.5)",
            }}
          >
            <ImageWithFallback
              src={AVATAR_URL}
              alt="Foto profil Budi Santoso"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="px-5 mb-5">
        <div
          className="rounded-2xl p-3"
          style={{
            background: "rgba(124,58,237,0.12)",
            border: "1px solid rgba(124,58,237,0.25)",
          }}
          role="group"
          aria-label="Progres XP menuju Level 13"
        >
          <div className="flex justify-between items-center mb-2">
            <span style={{ fontSize: 12, color: t.textSub, fontWeight: 500 }}>
              Menuju Level 13
            </span>
            <span style={{ fontSize: 12, color: "#A78BFA", fontWeight: 600 }}>
              4,280 / 5,000 XP
            </span>
          </div>
          <div
            className="w-full rounded-full overflow-hidden"
            style={{ height: 8, background: t.xpBarTrack }}
            role="progressbar"
            aria-valuenow={4280}
            aria-valuemin={0}
            aria-valuemax={5000}
            aria-label="4280 dari 5000 XP"
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "85.6%" }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #7C3AED, #06B6D4)",
                borderRadius: 9999,
                boxShadow: "0 0 8px rgba(124,58,237,0.5)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="flex gap-3 px-5 mb-6">
        <StatCard
          icon={Zap}
          label="Total XP"
          value="4,280"
          sub="↑ +320 hari ini"
          color="#06B6D4"
          bg="rgba(6,182,212,0.2)"
          glow="rgba(6,182,212,0.15)"
          ariaLabel="Total XP: 4280, naik 320 hari ini"
        />
        <StatCard
          icon={Flame}
          label="Streak"
          value="7 🔥"
          sub="Terbaik: 14"
          color="#F59E0B"
          bg="rgba(245,158,11,0.2)"
          glow="rgba(245,158,11,0.15)"
          ariaLabel="Streak saat ini 7 hari, terbaik 14 hari"
        />
        <StatCard
          icon={Trophy}
          label="Peringkat"
          value="#42"
          sub="Top 5%"
          color="#A78BFA"
          bg="rgba(124,58,237,0.2)"
          glow="rgba(124,58,237,0.15)"
          ariaLabel="Peringkat ke-42, masuk top 5 persen"
        />
      </div>

      {/* REVISI: Rekomendasi Hasil Evaluasi Kognitif */}
      <div className="px-5">
        <CognitiveResultCard 
          recommendedCategory="Logika" 
          gameName="Logic Puzzle" 
        />
      </div>

      {/* Game Modes Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between px-5 mb-3">
          <h2 style={{ fontSize: 17, fontWeight: 700, color: t.text }}>
            Mode Permainan
          </h2>
          <button
            onClick={() => navigate("/app/games")}
            className="flex items-center gap-0.5"
            style={{ color: "#A78BFA", fontSize: 13, fontWeight: 600 }}
            aria-label="Lihat semua mode permainan"
          >
            Lihat semua <ChevronRight size={14} aria-hidden="true" />
          </button>
        </div>
        <div
          className="flex gap-3 overflow-x-auto px-5 pb-2"
          style={{ scrollbarWidth: "none" }}
          role="list"
          aria-label="Daftar mode permainan"
        >
          {gameModes.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
              className="flex-shrink-0 rounded-2xl p-4"
              style={{
                width: 150,
                background: t.gamecardBg,
                border: `1px solid ${t.gamecardBorder}`,
                backdropFilter: "blur(12px)",
              }}
              role="listitem"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                style={{
                  background: game.gradient,
                  boxShadow: `0 4px 16px ${game.glow}`,
                }}
                aria-hidden="true"
              >
                <span style={{ fontSize: 22 }}>{game.emoji}</span>
              </div>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: t.gameNameColor,
                  marginBottom: 2,
                }}
              >
                {game.name}
              </p>
              <p
                style={{
                  fontSize: 11,
                  color: t.gameDescColor,
                  marginBottom: 10,
                }}
              >
                {game.desc}
              </p>
              <div className="flex items-center justify-between">
                {/* ── Accessibility: badge kesulitan dengan simbol bentuk + warna ── */}
                <span
                  className="px-2 py-0.5 rounded-full flex items-center gap-1"
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: game.diffColor,
                    background: game.diffBg,
                  }}
                  aria-label={`Tingkat kesulitan: ${game.difficulty}`}
                >
                  <span aria-hidden="true" style={{ fontSize: 7 }}>
                    {game.diffIcon}
                  </span>
                  {game.difficulty}
                </span>
                <span
                  style={{ fontSize: 10, color: "#A78BFA", fontWeight: 600 }}
                  aria-label={`Reward ${game.xp}`}
                >
                  {game.xp}
                </span>
              </div>
              <button
                className="w-full mt-3 py-2 rounded-xl"
                style={{
                  background: game.gradient,
                  boxShadow: `0 4px 12px ${game.glow}`,
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#fff",
                  fontFamily: "Poppins, sans-serif",
                }}
                onClick={() => navigate("/app/games")}
                aria-label={`Main ${game.name}`}
              >
                Main →
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Leaderboard Preview */}
      <div className="px-5 mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 style={{ fontSize: 17, fontWeight: 700, color: t.text }}>
            🏆 Leaderboard
          </h2>
          <button
            onClick={() => navigate("/app/leaderboard")}
            className="flex items-center gap-0.5"
            style={{ color: "#A78BFA", fontSize: 13, fontWeight: 600 }}
            aria-label="Lihat semua leaderboard"
          >
            Lihat semua <ChevronRight size={14} aria-hidden="true" />
          </button>
        </div>
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: t.surface2,
            border: `1px solid ${t.surface2Border}`,
            backdropFilter: "blur(12px)",
          }}
          role="list"
          aria-label="Peringkat teratas"
        >
          {leaderboardPreview.map((user, i) => {
            const rankCfg = rankConfig[user.rank as 1 | 2 | 3];
            const RankIcon = rankCfg.icon;
            return (
              <div
                key={user.rank}
                className="flex items-center gap-3 px-4 py-3"
                style={{
                  borderBottom:
                    i < leaderboardPreview.length - 1
                      ? `1px solid ${t.leaderboardRowBorder}`
                      : "none",
                  background: user.isMe ? t.myRowBg : "transparent",
                }}
                role="listitem"
                aria-label={`${rankCfg.label}: ${user.name}, ${user.xp} XP${user.isMe ? " (kamu)" : ""}`}
              >
                {/* ── Accessibility: ikon medali + emoji + nomor ── */}
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{ width: 28 }}
                  aria-hidden="true"
                >
                  <RankIcon
                    size={18}
                    style={{ color: rankCfg.iconColor }}
                  />
                </div>

                <div
                  className="rounded-full overflow-hidden flex-shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    border: user.isMe
                      ? "2px solid #7C3AED"
                      : `2px solid ${t.surfaceBorder}`,
                  }}
                >
                  <ImageWithFallback
                    src={user.avatar}
                    alt={`Foto profil ${user.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: user.isMe ? 700 : 600,
                      color: user.isMe ? "#A78BFA" : t.text,
                    }}
                  >
                    {user.name}{" "}
                    {user.isMe && (
                      <span style={{ fontSize: 10, color: "#A78BFA" }}>
                        (Kamu)
                      </span>
                    )}
                  </p>
                  <p style={{ fontSize: 11, color: t.textMuted }}>
                    {user.xp} XP
                  </p>
                </div>

                {/* ── Accessibility: rank badge dengan ikon + nomor + teks ── */}
                <div
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full"
                  style={{
                    background: user.isMe
                      ? "rgba(124,58,237,0.25)"
                      : t.rankNumBg,
                    border: user.isMe
                      ? "1px solid rgba(124,58,237,0.4)"
                      : `1px solid ${t.surfaceBorder}`,
                  }}
                  aria-hidden="true"
                >
                  <span style={{ fontSize: 14 }}>{user.badge}</span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: user.isMe ? "#A78BFA" : t.rankNumColor,
                    }}
                  >
                    #{user.rank}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}