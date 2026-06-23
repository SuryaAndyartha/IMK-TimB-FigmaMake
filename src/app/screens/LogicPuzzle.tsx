import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Clock,
  Star,
  Zap,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Lightbulb,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

// ── Tipe soal ─────────────────────────────────────────────────────────────────
type Puzzle = {
  question: string;
  options: string[];
  answer: number; // index of correct option
  explanation: string;
};

const PUZZLES: Puzzle[] = [
  {
    question:
      "Jika semua kucing adalah hewan, dan Milo adalah kucing, maka...",
    options: [
      "Milo adalah hewan",
      "Milo bukan hewan",
      "Tidak bisa ditentukan",
      "Milo adalah anjing",
    ],
    answer: 0,
    explanation: "Silogisme dasar: semua A adalah B, X adalah A → X adalah B.",
  },
  {
    question:
      "Urutan: 2, 4, 8, 16, ... Angka berikutnya adalah?",
    options: ["24", "32", "28", "20"],
    answer: 1,
    explanation: "Setiap angka dikali 2: 2×2=4, 4×2=8, 8×2=16, 16×2=32.",
  },
  {
    question:
      "Andi lebih tinggi dari Budi. Budi lebih tinggi dari Cici. Siapa yang paling pendek?",
    options: ["Andi", "Budi", "Cici", "Tidak bisa ditentukan"],
    answer: 2,
    explanation: "Andi > Budi > Cici, jadi Cici paling pendek.",
  },
  {
    question:
      "Sebuah jam menunjukkan pukul 3:00. Berapa derajat sudut antara jarum jam dan jarum menit?",
    options: ["45°", "60°", "90°", "120°"],
    answer: 2,
    explanation:
      "Pukul 3:00 → jarum jam di angka 3 (90° dari 12), jarum menit di angka 12 (0°). Selisihnya 90°.",
  },
  {
    question:
      "Jika KUCING = NXFLQJ dalam suatu kode, maka ANJING = ?",
    options: ["DQMLQJ", "DQMKQJ", "CPMLQJ", "DQMJQJ"],
    answer: 0,
    explanation:
      "Setiap huruf digeser +3 dalam alfabet: A→D, N→Q, J→M, I→L, N→Q, G→J.",
  },
  {
    question:
      "Dalam sebuah balapan, kamu menyalip orang di posisi ke-2. Kamu sekarang di posisi berapa?",
    options: ["Posisi 1", "Posisi 2", "Posisi 3", "Posisi 4"],
    answer: 1,
    explanation:
      "Kamu mengambil posisi orang ke-2, bukan posisi ke-1. Jadi kamu di posisi ke-2.",
  },
  {
    question:
      "Berapa banyak bulan yang memiliki 28 hari?",
    options: ["1", "2", "6", "12"],
    answer: 3,
    explanation:
      "Semua 12 bulan memiliki setidaknya 28 hari.",
  },
  {
    question:
      "Urutan huruf: A, C, F, J, ... Huruf berikutnya adalah?",
    options: ["M", "N", "O", "P"],
    answer: 2,
    explanation:
      "Selisih urutan: +2, +3, +4, +5 → J (ke-10) + 5 = ke-15 = O.",
  },
];

// ── Fungsi shuffle ────────────────────────────────────────────────────────────
function shufflePuzzles(arr: Puzzle[]): Puzzle[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, 5);
}

// ── Komponen pilihan jawaban ──────────────────────────────────────────────────
function OptionButton({
  label,
  index,
  selected,
  correct,
  revealed,
  onSelect,
}: {
  label: string;
  index: number;
  selected: boolean;
  correct: boolean;
  revealed: boolean;
  onSelect: () => void;
}) {
  const { t } = useTheme();
  const letters = ["A", "B", "C", "D"];

  let bg = t.surface2;
  let border = t.surface2Border;
  let textColor = t.text;
  let Icon = null as React.ElementType | null;

  if (revealed) {
    if (correct) {
      bg = "rgba(132,204,22,0.18)";
      border = "rgba(132,204,22,0.45)";
      textColor = "#84CC16";
      Icon = CheckCircle2;
    } else if (selected && !correct) {
      bg = "rgba(239,68,68,0.15)";
      border = "rgba(239,68,68,0.4)";
      textColor = "#EF4444";
      Icon = XCircle;
    }
  } else if (selected) {
    bg = "rgba(124,58,237,0.18)";
    border = "rgba(124,58,237,0.45)";
    textColor = "#A78BFA";
  }

  return (
    <motion.button
      whileTap={!revealed ? { scale: 0.97 } : {}}
      onClick={!revealed ? onSelect : undefined}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-200"
      style={{
        background: bg,
        border: `1.5px solid ${border}`,
        cursor: revealed ? "default" : "pointer",
        fontFamily: "Poppins, sans-serif",
      }}
      aria-label={`Pilihan ${letters[index]}: ${label}`}
      aria-pressed={selected}
    >
      <div
        className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: revealed && correct
            ? "rgba(132,204,22,0.25)"
            : revealed && selected
            ? "rgba(239,68,68,0.2)"
            : selected
            ? "rgba(124,58,237,0.25)"
            : t.rankNumBg,
        }}
      >
        {revealed && Icon ? (
          <Icon size={14} style={{ color: textColor }} aria-hidden="true" />
        ) : (
          <span style={{ fontSize: 12, fontWeight: 700, color: textColor }}>
            {letters[index]}
          </span>
        )}
      </div>
      <span style={{ fontSize: 13, fontWeight: 500, color: textColor, lineHeight: 1.4 }}>
        {label}
      </span>
    </motion.button>
  );
}

// ── Modal hasil akhir ─────────────────────────────────────────────────────────
function ResultModal({
  correct,
  total,
  seconds,
  xp,
  onReplay,
  onBack,
}: {
  correct: number;
  total: number;
  seconds: number;
  xp: number;
  onReplay: () => void;
  onBack: () => void;
}) {
  const { t } = useTheme();
  const stars = correct >= total ? 3 : correct >= Math.ceil(total * 0.6) ? 2 : 1;
  const pct = Math.round((correct / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="mx-5 rounded-3xl p-6 w-full max-w-[320px]"
        style={{
          background: t.surface,
          border: "1px solid rgba(124,58,237,0.3)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
        }}
      >
        {/* Bintang */}
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3].map((s) => (
            <motion.div
              key={s}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: s * 0.15, type: "spring", stiffness: 400 }}
            >
              <Star
                size={36}
                fill={s <= stars ? "#F59E0B" : "transparent"}
                style={{ color: s <= stars ? "#F59E0B" : t.textFaint }}
              />
            </motion.div>
          ))}
        </div>

        <h2
          className="text-center mb-1"
          style={{ fontSize: 22, fontWeight: 800, color: t.text }}
        >
          {stars === 3 ? "Sempurna! 🎉" : stars === 2 ? "Bagus! 👍" : "Coba Lagi!"}
        </h2>
        <p
          className="text-center mb-2"
          style={{ fontSize: 13, color: t.textSub }}
        >
          Kamu menjawab benar {correct} dari {total} soal
        </p>

        {/* Akurasi */}
        <div className="flex justify-center mb-4">
          <div
            className="px-4 py-1.5 rounded-full"
            style={{
              background:
                pct >= 80
                  ? "rgba(132,204,22,0.18)"
                  : pct >= 60
                  ? "rgba(245,158,11,0.18)"
                  : "rgba(239,68,68,0.15)",
              border: `1px solid ${
                pct >= 80
                  ? "rgba(132,204,22,0.4)"
                  : pct >= 60
                  ? "rgba(245,158,11,0.4)"
                  : "rgba(239,68,68,0.3)"
              }`,
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: pct >= 80 ? "#84CC16" : pct >= 60 ? "#F59E0B" : "#EF4444",
              }}
            >
              Akurasi {pct}%
            </span>
          </div>
        </div>

        {/* Statistik */}
        <div
          className="flex rounded-2xl overflow-hidden mb-5"
          style={{
            background: t.surface2,
            border: `1px solid ${t.surface2Border}`,
          }}
        >
          {[
            { icon: CheckCircle2, label: "Benar",  value: `${correct}/${total}`, color: "#84CC16" },
            { icon: Clock,        label: "Waktu",  value: `${seconds}d`,         color: "#06B6D4" },
            { icon: Zap,          label: "XP",     value: `+${xp}`,              color: "#A78BFA" },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="flex-1 flex flex-col items-center py-3"
                style={{
                  borderRight: i < 2 ? `1px solid ${t.surfaceDivider}` : "none",
                }}
              >
                <Icon size={16} style={{ color: stat.color, marginBottom: 4 }} />
                <p style={{ fontSize: 15, fontWeight: 700, color: t.text }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: 10, color: t.textMuted }}>{stat.label}</p>
              </div>
            );
          })}
        </div>

        <button
          onClick={onReplay}
          className="w-full py-3 rounded-2xl mb-2"
          style={{
            background: "linear-gradient(90deg, #7C3AED, #06B6D4)",
            boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
            fontSize: 15,
            fontWeight: 700,
            color: "#fff",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          🔄 Main Lagi
        </button>
        <button
          onClick={onBack}
          className="w-full py-3 rounded-2xl"
          style={{
            background: t.surface2,
            border: `1px solid ${t.surface2Border}`,
            fontSize: 14,
            fontWeight: 600,
            color: t.textSub,
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Kembali ke Menu
        </button>
      </motion.div>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function LogicPuzzle() {
  const navigate = useNavigate();
  const { t } = useTheme();

  const [puzzles, setPuzzles] = useState<Puzzle[]>(() => shufflePuzzles(PUZZLES));
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const total = puzzles.length;
  const puzzle = puzzles[current];

  // ── Timer ──
  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  const handleSelect = useCallback(
    (idx: number) => {
      if (revealed) return;
      if (!isRunning) setIsRunning(true);
      setSelected(idx);
      setRevealed(true);
      setShowHint(false);
      if (idx === puzzle.answer) {
        setCorrectCount((c) => c + 1);
      }
    },
    [revealed, isRunning, puzzle]
  );

  const handleNext = () => {
    if (current + 1 >= total) {
      setIsRunning(false);
      setShowResult(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setRevealed(false);
      setShowHint(false);
    }
  };

  const calcXP = () => {
    const base = 200;
    const bonus = correctCount * 30;
    const timePenalty = Math.max(0, (seconds - 60) * 0.3);
    return Math.max(20, Math.round(base * (correctCount / total) + bonus - timePenalty));
  };

  const handleReplay = () => {
    setPuzzles(shufflePuzzles(PUZZLES));
    setCurrent(0);
    setSelected(null);
    setRevealed(false);
    setCorrectCount(0);
    setSeconds(0);
    setIsRunning(false);
    setShowResult(false);
    setShowHint(false);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
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
      {/* Background glow */}
      <div
        className="fixed pointer-events-none"
        style={{
          width: 260,
          height: 260,
          top: -80,
          right: -60,
          background:
            "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-4">
        <button
          onClick={() => navigate("/app/games")}
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: t.iconBtnBg, border: `1px solid ${t.iconBtnBorder}` }}
          aria-label="Kembali ke menu game"
        >
          <ArrowLeft size={18} style={{ color: t.text }} />
        </button>
        <div className="text-center">
          <h1 style={{ fontSize: 17, fontWeight: 700, color: t.text }}>
            🔮 Logic Puzzle
          </h1>
          <p style={{ fontSize: 11, color: t.textSub }}>Asah kemampuan logikamu!</p>
        </div>
        <button
          onClick={handleReplay}
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: t.iconBtnBg, border: `1px solid ${t.iconBtnBorder}` }}
          aria-label="Mulai ulang permainan"
        >
          <RotateCcw size={16} style={{ color: t.text }} />
        </button>
      </div>

      {/* Stats bar */}
      <div className="flex gap-3 px-5 mb-4">
        <div
          className="flex-1 flex items-center gap-2 px-3 py-2 rounded-2xl"
          style={{ background: t.surface, border: `1px solid ${t.surfaceBorder}` }}
        >
          <Clock size={14} style={{ color: "#06B6D4" }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: t.text }}>
            {formatTime(seconds)}
          </span>
        </div>
        <div
          className="flex-1 flex items-center gap-2 px-3 py-2 rounded-2xl"
          style={{ background: t.surface, border: `1px solid ${t.surfaceBorder}` }}
        >
          <CheckCircle2 size={14} style={{ color: "#84CC16" }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: t.text }}>
            {correctCount} benar
          </span>
        </div>
        <div
          className="flex-1 flex items-center gap-2 px-3 py-2 rounded-2xl"
          style={{ background: t.surface, border: `1px solid ${t.surfaceBorder}` }}
        >
          <Zap size={14} style={{ color: "#A78BFA" }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: t.text }}>
            {current + 1}/{total}
          </span>
        </div>
      </div>

      {/* Progress soal */}
      <div className="px-5 mb-5">
        <div className="flex gap-1.5">
          {puzzles.map((_, i) => (
            <div
              key={i}
              className="flex-1 rounded-full"
              style={{
                height: 4,
                background:
                  i < current
                    ? "linear-gradient(90deg, #7C3AED, #06B6D4)"
                    : i === current
                    ? "rgba(124,58,237,0.5)"
                    : t.xpBarTrack,
                transition: "background 0.3s",
              }}
            />
          ))}
        </div>
      </div>

      {/* Soal */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          className="px-5"
        >
          {/* Kartu soal */}
          <div
            className="rounded-2xl p-5 mb-4"
            style={{
              background:
                "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.1) 100%)",
              border: "1px solid rgba(124,58,237,0.25)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: "rgba(124,58,237,0.25)" }}
              >
                <span style={{ fontSize: 16 }}>🔮</span>
              </div>
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: t.text,
                  lineHeight: 1.55,
                }}
              >
                {puzzle.question}
              </p>
            </div>
          </div>

          {/* Pilihan jawaban */}
          <div className="flex flex-col gap-2.5 mb-4">
            {puzzle.options.map((opt, idx) => (
              <OptionButton
                key={idx}
                label={opt}
                index={idx}
                selected={selected === idx}
                correct={idx === puzzle.answer}
                revealed={revealed}
                onSelect={() => handleSelect(idx)}
              />
            ))}
          </div>

          {/* Penjelasan setelah menjawab */}
          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl p-4 mb-4"
                style={{
                  background:
                    selected === puzzle.answer
                      ? "rgba(132,204,22,0.1)"
                      : "rgba(239,68,68,0.08)",
                  border: `1px solid ${
                    selected === puzzle.answer
                      ? "rgba(132,204,22,0.3)"
                      : "rgba(239,68,68,0.25)"
                  }`,
                }}
              >
                <div className="flex items-start gap-2">
                  {selected === puzzle.answer ? (
                    <CheckCircle2
                      size={16}
                      style={{ color: "#84CC16", flexShrink: 0, marginTop: 1 }}
                    />
                  ) : (
                    <XCircle
                      size={16}
                      style={{ color: "#EF4444", flexShrink: 0, marginTop: 1 }}
                    />
                  )}
                  <div>
                    <p
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color:
                          selected === puzzle.answer ? "#84CC16" : "#EF4444",
                        marginBottom: 2,
                      }}
                    >
                      {selected === puzzle.answer ? "Benar! ✓" : "Kurang tepat ✗"}
                    </p>
                    <p style={{ fontSize: 12, color: t.textSub, lineHeight: 1.5 }}>
                      {puzzle.explanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hint */}
          <AnimatePresence>
            {showHint && !revealed && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl p-4 mb-4"
                style={{
                  background: "rgba(245,158,11,0.1)",
                  border: "1px solid rgba(245,158,11,0.3)",
                }}
              >
                <div className="flex items-start gap-2">
                  <Lightbulb size={15} style={{ color: "#F59E0B", flexShrink: 0 }} />
                  <p style={{ fontSize: 12, color: t.textSub, lineHeight: 1.5 }}>
                    Coba baca soal perlahan dan perhatikan kata kunci logisnya.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tombol aksi */}
          <div className="flex gap-2.5 pb-6">
            {!revealed && (
              <button
                onClick={() => setShowHint((h) => !h)}
                className="flex items-center gap-1.5 px-4 py-3 rounded-2xl"
                style={{
                  background: "rgba(245,158,11,0.12)",
                  border: "1px solid rgba(245,158,11,0.3)",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#F59E0B",
                  fontFamily: "Poppins, sans-serif",
                }}
                aria-label="Tampilkan petunjuk"
              >
                <Lightbulb size={15} />
                Petunjuk
              </button>
            )}
            {revealed && (
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleNext}
                className="flex-1 py-3 rounded-2xl"
                style={{
                  background: "linear-gradient(90deg, #7C3AED, #06B6D4)",
                  boxShadow: "0 4px 16px rgba(124,58,237,0.4)",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#fff",
                  fontFamily: "Poppins, sans-serif",
                }}
                aria-label={
                  current + 1 >= total ? "Lihat hasil" : "Soal berikutnya"
                }
              >
                {current + 1 >= total ? "Lihat Hasil 🏆" : "Soal Berikutnya →"}
              </motion.button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Result modal */}
      <AnimatePresence>
        {showResult && (
          <ResultModal
            correct={correctCount}
            total={total}
            seconds={seconds}
            xp={calcXP()}
            onReplay={handleReplay}
            onBack={() => navigate("/app/games")}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
