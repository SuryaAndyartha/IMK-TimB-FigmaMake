import { motion } from "motion/react";
import { useId } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  TrendingUp,
  Target,
  Zap,
  Brain,
  Award,
  CheckCircle2,
  XCircle,
  Star,
  ThumbsUp,
  Minus,
  type LucideIcon,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const weeklyData = [
  { day: "Sen", xp: 320, accuracy: 72 },
  { day: "Sel", xp: 450, accuracy: 80 },
  { day: "Rab", xp: 280, accuracy: 65 },
  { day: "Kam", xp: 620, accuracy: 88 },
  { day: "Jum", xp: 540, accuracy: 85 },
  { day: "Sab", xp: 710, accuracy: 91 },
  { day: "Min", xp: 360, accuracy: 78 },
];

// ── Accessibility: result config dengan ikon + warna + label ──────────────────
const resultConfig: Record<
  string,
  { color: string; bg: string; border: string; icon: LucideIcon; label: string; ariaLabel: string }
> = {
  "Terbaik!": {
    color: "#84CC16",
    bg: "rgba(132,204,22,0.18)",
    border: "rgba(132,204,22,0.35)",
    icon: Star,
    label: "Terbaik!",
    ariaLabel: "Hasil terbaik",
  },
  Bagus: {
    color: "#06B6D4",
    bg: "rgba(6,182,212,0.15)",
    border: "rgba(6,182,212,0.3)",
    icon: ThumbsUp,
    label: "Bagus",
    ariaLabel: "Hasil bagus",
  },
  Oke: {
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.15)",
    border: "rgba(245,158,11,0.3)",
    icon: CheckCircle2,
    label: "Oke",
    ariaLabel: "Hasil cukup",
  },
  Kurang: {
    color: "#EF4444",
    bg: "rgba(239,68,68,0.15)",
    border: "rgba(239,68,68,0.3)",
    icon: XCircle,
    label: "Kurang",
    ariaLabel: "Hasil kurang",
  },
};

const recentGames = [
  {
    game: "Speed Math",
    score: 980,
    xp: 350,
    acc: 94,
    time: "2 mnt",
    emoji: "⚡",
    color: "#EC4899",
    result: "Terbaik!",
  },
  {
    game: "Memory Match",
    score: 760,
    xp: 120,
    acc: 85,
    time: "3 mnt",
    emoji: "🧩",
    color: "#06B6D4",
    result: "Bagus",
  },
  {
    game: "Logic Puzzle",
    score: 840,
    xp: 200,
    acc: 88,
    time: "5 mnt",
    emoji: "🔮",
    color: "#7C3AED",
    result: "Bagus",
  },
  {
    game: "Pattern Find",
    score: 690,
    xp: 150,
    acc: 79,
    time: "4 mnt",
    emoji: "🎯",
    color: "#84CC16",
    result: "Oke",
  },
  {
    game: "Word Chain",
    score: 720,
    xp: 180,
    acc: 82,
    time: "5 mnt",
    emoji: "📝",
    color: "#3B82F6",
    result: "Bagus",
  },
];

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
  gradient,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  sub: string;
  color: string;
  gradient: string;
}) {
  const { t } = useTheme();
  return (
    <div
      className="flex-1 rounded-2xl p-3"
      style={{
        background: t.surface,
        border: `1px solid ${t.surfaceBorder}`,
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center mb-2"
        style={{ background: gradient, boxShadow: `0 4px 12px ${color}40` }}
      >
        <Icon size={17} style={{ color: "#fff" }} />
      </div>
      <p
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: t.text,
          lineHeight: 1,
          marginBottom: 2,
        }}
      >
        {value}
      </p>
      <p style={{ fontSize: 10, color: t.textSub, fontWeight: 500 }}>
        {label}
      </p>
      <p style={{ fontSize: 9, color, fontWeight: 600, marginTop: 2 }}>{sub}</p>
    </div>
  );
}

function CustomTooltipInner({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
}) {
  const { t } = useTheme();
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: t.tooltipBg,
          border: `1px solid ${t.tooltipBorder}`,
          borderRadius: 12,
          padding: "8px 12px",
          fontFamily: "Poppins, sans-serif",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}
      >
        <p
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: t.tooltipText,
            marginBottom: 4,
          }}
        >
          {label}
        </p>
        <p style={{ fontSize: 11, color: "#A78BFA" }}>
          XP: <strong>{payload[0]?.value}</strong>
        </p>
        <p style={{ fontSize: 11, color: "#06B6D4" }}>
          Akurasi: <strong>{payload[1]?.value}%</strong>
        </p>
      </div>
    );
  }
  return null;
}

export function Performance() {
  const { t } = useTheme();
  const uid = useId().replace(/:/g, "");
  const xpGradId = `xpGrad-${uid}`;
  const accGradId = `accGrad-${uid}`;
  const totalXP = weeklyData.reduce((acc, d) => acc + d.xp, 0);
  const avgAcc = Math.round(
    weeklyData.reduce((acc, d) => acc + d.accuracy, 0) / weeklyData.length
  );

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        background: t.pageBg,
        minHeight: "100%",
        transition: "background 0.3s",
      }}
    >
      {/* Background glow */}
      <div
        className="fixed pointer-events-none"
        style={{
          width: 200,
          height: 200,
          top: 100,
          left: -60,
          background:
            "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

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
        <h1 style={{ fontSize: 24, fontWeight: 800, color: t.text }}>
          <span
            style={{
              background: "linear-gradient(90deg, #A78BFA, #06B6D4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Performa
          </span>{" "}
          Minggu Ini
        </h1>
        <p style={{ fontSize: 13, color: t.textSub, marginTop: 4 }}>
          Pantau perkembanganmu setiap hari 📈
        </p>
      </div>

      {/* Level Card */}
      <div className="px-5 mb-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl p-4"
          style={{
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(6,182,212,0.15) 100%)",
            border: "1px solid rgba(124,58,237,0.3)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="px-2.5 py-0.5 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #7C3AED, #06B6D4)",
                    boxShadow: "0 4px 12px rgba(124,58,237,0.4)",
                  }}
                >
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>
                    Level 12
                  </span>
                </div>
                <Award size={16} style={{ color: "#F59E0B" }} />
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                XP Minggu Ini:{" "}
                <strong style={{ color: "#A78BFA" }}>
                  {totalXP.toLocaleString()}
                </strong>
              </p>
            </div>
            <div className="text-right">
              <p
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                4,280
              </p>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
                Total XP
              </p>
            </div>
          </div>
          <div className="mb-1.5">
            <div className="flex justify-between mb-1">
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>
                Menuju Level 13
              </span>
              <span
                style={{ fontSize: 11, color: "#A78BFA", fontWeight: 600 }}
              >
                4,280 / 5,000
              </span>
            </div>
            <div
              className="w-full rounded-full overflow-hidden"
              style={{ height: 10, background: "rgba(255,255,255,0.12)" }}
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "85.6%" }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #7C3AED, #06B6D4)",
                  borderRadius: 9999,
                  boxShadow: "0 0 10px rgba(124,58,237,0.6)",
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Row */}
      <div className="flex gap-2.5 px-5 mb-5">
        <StatCard
          icon={TrendingUp}
          label="Total XP Minggu Ini"
          value={totalXP.toLocaleString()}
          sub="↑ +18% dari minggu lalu"
          color="#A78BFA"
          gradient="linear-gradient(135deg, #7C3AED, #5B21B6)"
        />
        <StatCard
          icon={Target}
          label="Rata-rata Akurasi"
          value={`${avgAcc}%`}
          sub="↑ +5% dari minggu lalu"
          color="#06B6D4"
          gradient="linear-gradient(135deg, #06B6D4, #0369A1)"
        />
        <StatCard
          icon={Zap}
          label="Game Selesai"
          value="23"
          sub="5 hari berturut-turut"
          color="#84CC16"
          gradient="linear-gradient(135deg, #84CC16, #4D7C0F)"
        />
        <StatCard
          icon={Brain}
          label="Skor Tertinggi"
          value="980"
          sub="Speed Math"
          color="#F59E0B"
          gradient="linear-gradient(135deg, #F59E0B, #B45309)"
        />
      </div>

      {/* Chart */}
      <div className="px-5 mb-5">
        <h2
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: t.text,
            marginBottom: 12,
          }}
        >
          📊 Grafik Mingguan
        </h2>
        <div
          className="rounded-2xl p-4"
          style={{
            background: t.surface2,
            border: `1px solid ${t.surface2Border}`,
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Legend */}
          <div className="flex gap-4 mb-3">
            <div className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: "#7C3AED" }}
              />
              <span style={{ fontSize: 11, color: t.xpLegendColor }}>XP</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: "#06B6D4" }}
              />
              <span style={{ fontSize: 11, color: t.xpLegendColor }}>
                Akurasi %
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart
              data={weeklyData}
              margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id={xpGradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
                <linearGradient id={accGradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={t.chartGrid} />
              <XAxis
                dataKey="day"
                tick={{
                  fill: t.chartAxis,
                  fontSize: 11,
                  fontFamily: "Poppins",
                }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{
                  fill: t.chartAxis,
                  fontSize: 10,
                  fontFamily: "Poppins",
                }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<CustomTooltipInner />}
                cursor={{ stroke: t.chartGrid }}
              />
              <Area
                type="monotone"
                dataKey="xp"
                stroke="#7C3AED"
                strokeWidth={2.5}
                fill={`url(#${xpGradId})`}
                dot={{ fill: "#7C3AED", r: 3, strokeWidth: 0 }}
                activeDot={{ r: 5, fill: "#A78BFA", strokeWidth: 0 }}
              />
              <Area
                type="monotone"
                dataKey="accuracy"
                stroke="#06B6D4"
                strokeWidth={2.5}
                fill={`url(#${accGradId})`}
                dot={{ fill: "#06B6D4", r: 3, strokeWidth: 0 }}
                activeDot={{ r: 5, fill: "#22D3EE", strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Games */}
      <div className="px-5 pb-6">
        <h2
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: t.text,
            marginBottom: 12,
          }}
        >
          🕹️ Riwayat Permainan
        </h2>

        {/* ── Accessibility: legenda hasil ── */}
        <div
          className="flex gap-2 flex-wrap mb-3"
          aria-label="Keterangan hasil permainan"
        >
          {Object.entries(resultConfig).map(([key, cfg]) => {
            const Icon = cfg.icon;
            return (
              <div
                key={key}
                className="flex items-center gap-1 px-2 py-1 rounded-full"
                style={{
                  background: cfg.bg,
                  border: `1px solid ${cfg.border}`,
                }}
              >
                <Icon size={10} style={{ color: cfg.color }} aria-hidden="true" />
                <span style={{ fontSize: 10, color: cfg.color, fontWeight: 600 }}>
                  {cfg.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-2.5">
          {recentGames.map((game, i) => {
            const cfg = resultConfig[game.result] ?? resultConfig["Oke"];
            const ResultIcon = cfg.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                style={{
                  background: t.recentGameBg,
                  border: `1px solid ${t.recentGameBorder}`,
                }}
                role="listitem"
                aria-label={`${game.game}: skor ${game.score}, ${cfg.ariaLabel}`}
              >
                {/* Game icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${game.color}22`,
                    border: `1px solid ${game.color}40`,
                  }}
                >
                  <span style={{ fontSize: 22 }} aria-hidden="true">
                    {game.emoji}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: t.text,
                      marginBottom: 2,
                    }}
                  >
                    {game.game}
                  </p>
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: 11, color: t.textMuted }}>
                      Akurasi {game.acc}%
                    </span>
                    <span style={{ fontSize: 11, color: t.textFaint }}>•</span>
                    <span style={{ fontSize: 11, color: t.textMuted }}>
                      {game.time}
                    </span>
                  </div>
                </div>

                {/* Score */}
                <div className="text-right">
                  <p
                    style={{ fontSize: 14, fontWeight: 700, color: game.color }}
                  >
                    {game.score}
                  </p>
                  <p
                    style={{ fontSize: 11, color: "#A78BFA", fontWeight: 600 }}
                  >
                    +{game.xp} XP
                  </p>
                </div>

                {/* ── Accessibility: badge hasil dengan ikon + teks + warna ── */}
                <div
                  className="flex items-center gap-1 px-2 py-1 rounded-full ml-1 flex-shrink-0"
                  style={{
                    background: cfg.bg,
                    border: `1px solid ${cfg.border}`,
                  }}
                  role="status"
                  aria-label={cfg.ariaLabel}
                >
                  <ResultIcon
                    size={11}
                    style={{ color: cfg.color }}
                    aria-hidden="true"
                  />
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: cfg.color,
                    }}
                  >
                    {cfg.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
