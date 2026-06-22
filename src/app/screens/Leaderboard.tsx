import { useState } from "react";
import { motion } from "motion/react";
import { Crown, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useTheme } from "../contexts/ThemeContext";

const AVATAR1 =
  "https://images.unsplash.com/photo-1565016941625-2bee25d37f72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGFzaWFuJTIwbWFuJTIwc3R1ZGVudCUyMGF2YXRhciUyMHBvcnRyYWl0fGVufDF8fHx8MTc3ODU1ODczM3ww&ixlib=rb-4.1.0&q=80&w=400";
const AVATAR2 =
  "https://images.unsplash.com/photo-1619431667975-e93b820cde63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwYXNpYW4lMjBzdHVkZW50JTIwc21pbGluZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3ODU1ODczNnww&ixlib=rb-4.1.0&q=80&w=400";
const AVATAR3 =
  "https://images.unsplash.com/photo-1758270705555-015de348a48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGFzaWFuJTIwd29tYW4lMjB1bml2ZXJzaXR5JTIwc3R1ZGVudCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3ODU1ODczNXww&ixlib=rb-4.1.0&q=80&w=400";
const AVATAR4 =
  "https://images.unsplash.com/photo-1744501109103-41cdc196a5d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGluZG9uZXNpYW4lMjB1bml2ZXJzaXR5JTIwc3R1ZGVudCUyMHNtaWxpbmclMjBwb3J0cmFpdHxlbnwxfHx8fDE3Nzg1NTg3MzN8MA&ixlib=rb-4.1.0&q=80&w=400";

const periods = ["Mingguan", "Bulanan", "Semua Waktu"];

const topThree = [
  { rank: 1, name: "Sari Dewi", xp: "12,450", avatar: AVATAR2, level: 15, school: "UI Jakarta" },
  { rank: 2, name: "Budi Santoso", xp: "11,280", avatar: AVATAR1, level: 12, school: "ITB Bandung", isMe: true },
  { rank: 3, name: "Anisa Putri", xp: "10,890", avatar: AVATAR3, level: 11, school: "UGM Jogja" },
];

const rankedList = [
  { rank: 4, name: "Rian Pratama", xp: "9,850", avatar: AVATAR4, level: 10, trend: "up", change: 2 },
  { rank: 5, name: "Dewi Lestari", xp: "9,120", avatar: AVATAR2, level: 10, trend: "down", change: 1 },
  { rank: 6, name: "Ahmad Fauzi", xp: "8,740", avatar: AVATAR1, level: 9, trend: "up", change: 3 },
  { rank: 7, name: "Mega Wati", xp: "8,320", avatar: AVATAR3, level: 9, trend: "same", change: 0 },
  { rank: 8, name: "Rizki Maulana", xp: "7,980", avatar: AVATAR4, level: 8, trend: "down", change: 2 },
  { rank: 9, name: "Putri Indah", xp: "7,650", avatar: AVATAR2, level: 8, trend: "up", change: 1 },
  { rank: 10, name: "Hendra Kusuma", xp: "7,200", avatar: AVATAR1, level: 7, trend: "same", change: 0 },
];

const medalColors = {
  1: {
    bg: "linear-gradient(135deg, #F59E0B, #FCD34D)",
    ring: "#F59E0B",
    shadow: "0 8px 32px rgba(245,158,11,0.5)",
    platform: "linear-gradient(180deg, #F59E0B 0%, #D97706 100%)",
    height: 80,
    badge: "👑",
    textColor: "#F59E0B",
  },
  2: {
    bg: "linear-gradient(135deg, #94A3B8, #CBD5E1)",
    ring: "#94A3B8",
    shadow: "0 8px 24px rgba(148,163,184,0.4)",
    platform: "linear-gradient(180deg, #94A3B8 0%, #64748B 100%)",
    height: 56,
    badge: "🥈",
    textColor: "#94A3B8",
  },
  3: {
    bg: "linear-gradient(135deg, #CD7F32, #E8A95E)",
    ring: "#CD7F32",
    shadow: "0 8px 24px rgba(205,127,50,0.4)",
    platform: "linear-gradient(180deg, #CD7F32 0%, #A0522D 100%)",
    height: 44,
    badge: "🥉",
    textColor: "#CD7F32",
  },
};

export function Leaderboard() {
  const [activePeriod, setActivePeriod] = useState("Mingguan");
  const { t } = useTheme();

  // Podium order: 2nd, 1st, 3rd
  const podiumOrder = [topThree[1], topThree[0], topThree[2]];

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        background: t.pageBg,
        minHeight: "100%",
        transition: "background 0.3s",
      }}
    >
      {/* Gradient header bg */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 280,
          background:
            "linear-gradient(180deg, rgba(124,58,237,0.2) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Status Bar */}
      <div className="relative flex items-center justify-between px-5 pt-3 pb-1">
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
      <div className="relative px-5 pt-3 pb-2 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Crown size={22} style={{ color: "#F59E0B" }} />
          <h1 style={{ fontSize: 22, fontWeight: 800, color: t.text }}>
            Papan{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #F59E0B, #FBBF24)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Peringkat
            </span>
          </h1>
          <Crown size={22} style={{ color: "#F59E0B" }} />
        </div>
        <p style={{ fontSize: 13, color: t.textSub }}>
          Bersaing dengan sesama mahasiswa! 🚀
        </p>
      </div>

      {/* Period Tabs */}
      <div className="flex gap-2 px-5 mb-6 justify-center">
        {periods.map((p) => (
          <button
            key={p}
            onClick={() => setActivePeriod(p)}
            className="px-3 py-1.5 rounded-full transition-all duration-200"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: 12,
              fontWeight: 600,
              background:
                activePeriod === p
                  ? "linear-gradient(90deg, #7C3AED, #06B6D4)"
                  : t.categoryTabBg,
              color: activePeriod === p ? "#fff" : t.categoryTabText,
              border:
                activePeriod === p
                  ? "none"
                  : `1px solid ${t.categoryTabBorder}`,
              boxShadow:
                activePeriod === p
                  ? "0 4px 12px rgba(124,58,237,0.4)"
                  : "none",
            }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Podium */}
      <div className="relative px-5 mb-6">
        <div
          className="rounded-3xl p-4 pb-0"
          style={{
            background: t.podiumCardBg,
            border: `1px solid ${t.podiumCardBorder}`,
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="flex items-end justify-center gap-3">
            {podiumOrder.map((user, idx) => {
              const rank = user.rank as 1 | 2 | 3;
              const medal = medalColors[rank];
              const isFirst = rank === 1;

              return (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: idx * 0.1 + 0.1,
                    duration: 0.5,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="flex flex-col items-center"
                  style={{ width: isFirst ? 110 : 90 }}
                >
                  {/* Crown for first place */}
                  {isFirst && (
                    <motion.div
                      animate={{ y: [-3, 3, -3] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{ marginBottom: 4 }}
                    >
                      <Crown
                        size={24}
                        style={{
                          color: "#F59E0B",
                          filter: "drop-shadow(0 0 8px #F59E0B)",
                        }}
                      />
                    </motion.div>
                  )}

                  {/* Avatar */}
                  <div
                    className="rounded-full overflow-hidden mb-2"
                    style={{
                      width: isFirst ? 68 : 54,
                      height: isFirst ? 68 : 54,
                      border: `3px solid ${medal.ring}`,
                      boxShadow: medal.shadow,
                    }}
                  >
                    <ImageWithFallback
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name */}
                  <p
                    style={{
                      fontSize: isFirst ? 12 : 11,
                      fontWeight: 700,
                      color: (user as any).isMe ? "#A78BFA" : t.text,
                      textAlign: "center",
                      marginBottom: 2,
                      lineHeight: 1.2,
                    }}
                  >
                    {user.name.split(" ")[0]}
                    {(user as any).isMe && (
                      <span style={{ color: "#A78BFA", fontSize: 9 }}>
                        {" "}
                        ★
                      </span>
                    )}
                  </p>
                  <p
                    style={{
                      fontSize: 10,
                      color: t.podiumSubText,
                      marginBottom: 4,
                      textAlign: "center",
                    }}
                  >
                    Lv.{user.level}
                  </p>
                  <p
                    style={{
                      fontSize: isFirst ? 13 : 11,
                      fontWeight: 700,
                      color: medal.textColor,
                      marginBottom: 8,
                      textAlign: "center",
                    }}
                  >
                    {user.xp}
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 500,
                        color: t.textMuted,
                      }}
                    >
                      {" "}
                      XP
                    </span>
                  </p>

                  {/* Platform */}
                  <div
                    className="w-full flex items-center justify-center rounded-t-xl"
                    style={{
                      height: medal.height,
                      background: medal.platform,
                      boxShadow: `0 -4px 20px ${medal.ring}30`,
                    }}
                  >
                    <span style={{ fontSize: isFirst ? 26 : 22 }}>
                      {medal.badge}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Ranked List */}
      <div className="px-5 pb-6">
        <h2
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: t.text,
            marginBottom: 12,
          }}
        >
          Peringkat Lainnya
        </h2>
        <div className="flex flex-col gap-2">
          {rankedList.map((user, i) => (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl"
              style={{
                background: t.rankedItemBg,
                border: `1px solid ${t.rankedItemBorder}`,
                backdropFilter: "blur(8px)",
              }}
            >
              {/* Rank number */}
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: t.rankNumBg }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: t.rankNumColor,
                  }}
                >
                  {user.rank}
                </span>
              </div>

              {/* Avatar */}
              <div
                className="rounded-full overflow-hidden flex-shrink-0"
                style={{
                  width: 38,
                  height: 38,
                  border: `2px solid ${t.surfaceBorder}`,
                }}
              >
                <ImageWithFallback
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: t.text,
                    marginBottom: 1,
                  }}
                >
                  {user.name}
                </p>
                <p style={{ fontSize: 10, color: t.rankLevelColor }}>
                  Level {user.level}
                </p>
              </div>

              {/* XP */}
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: t.rankXpColor,
                  marginRight: 4,
                }}
              >
                {user.xp}
                <span
                  style={{
                    fontSize: 9,
                    color: t.textFaint,
                    fontWeight: 400,
                  }}
                >
                  {" "}
                  XP
                </span>
              </p>

              {/* Trend */}
              <div className="flex items-center gap-0.5">
                {user.trend === "up" ? (
                  <>
                    <TrendingUp size={13} style={{ color: "#84CC16" }} />
                    <span
                      style={{
                        fontSize: 10,
                        color: "#84CC16",
                        fontWeight: 600,
                      }}
                    >
                      +{user.change}
                    </span>
                  </>
                ) : user.trend === "down" ? (
                  <>
                    <TrendingDown size={13} style={{ color: "#EF4444" }} />
                    <span
                      style={{
                        fontSize: 10,
                        color: "#EF4444",
                        fontWeight: 600,
                      }}
                    >
                      -{user.change}
                    </span>
                  </>
                ) : (
                  <Minus size={13} style={{ color: t.textMuted }} />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* My rank highlight */}
        <div
          className="mt-4 flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{
            background: "rgba(124,58,237,0.15)",
            border: "1px solid rgba(124,58,237,0.35)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 4px 20px rgba(124,58,237,0.15)",
          }}
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(124,58,237,0.3)" }}
          >
            <span style={{ fontSize: 13, fontWeight: 700, color: "#A78BFA" }}>
              2
            </span>
          </div>
          <div
            className="rounded-full overflow-hidden flex-shrink-0"
            style={{
              width: 38,
              height: 38,
              border: "2px solid #7C3AED",
              boxShadow: "0 0 12px rgba(124,58,237,0.5)",
            }}
          >
            <ImageWithFallback
              src={AVATAR1}
              alt="Budi Santoso"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <p style={{ fontSize: 13, fontWeight: 700, color: "#A78BFA" }}>
              Budi Santoso (Kamu)
            </p>
            <p style={{ fontSize: 10, color: "rgba(167,139,250,0.6)" }}>
              Level 12 · ITB Bandung
            </p>
          </div>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#A78BFA" }}>
            11,280{" "}
            <span style={{ fontSize: 9, fontWeight: 400, color: "rgba(167,139,250,0.5)" }}>
              XP
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
