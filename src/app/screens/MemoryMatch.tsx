import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Clock, RotateCcw, Star, Trophy, Zap } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { PauseControl } from "../components/PauseControl";

// ── Kartu emoji yang dipakai ──────────────────────────────────────────────────
const EMOJI_POOL = ["🍎", "🍊", "🍋", "🍇", "🍓", "🫐", "🍑", "🥭"];

type Card = {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildDeck(): Card[] {
  const pairs = [...EMOJI_POOL, ...EMOJI_POOL];
  return shuffle(pairs).map((emoji, i) => ({
    id: i,
    emoji,
    isFlipped: false,
    isMatched: false,
  }));
}

// ── Hasil setelah selesai ─────────────────────────────────────────────────────
function ResultModal({
  moves,
  seconds,
  xp,
  onReplay,
  onBack,
}: {
  moves: number;
  seconds: number;
  xp: number;
  onReplay: () => void;
  onBack: () => void;
}) {
  const { t } = useTheme();
  const stars = xp >= 120 ? 3 : xp >= 80 ? 2 : 1;

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
          border: `1px solid rgba(124,58,237,0.3)`,
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
          {stars === 3 ? "Luar Biasa! 🎉" : stars === 2 ? "Bagus! 👍" : "Selesai!"}
        </h2>
        <p
          className="text-center mb-5"
          style={{ fontSize: 13, color: t.textSub }}
        >
          Semua pasangan berhasil ditemukan
        </p>

        {/* Statistik */}
        <div
          className="flex rounded-2xl overflow-hidden mb-5"
          style={{ background: t.surface2, border: `1px solid ${t.surface2Border}` }}
        >
          {[
            { icon: Clock, label: "Waktu", value: `${seconds}d` },
            { icon: RotateCcw, label: "Langkah", value: `${moves}` },
            { icon: Zap, label: "XP", value: `+${xp}` },
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
                <Icon size={16} style={{ color: "#A78BFA", marginBottom: 4 }} />
                <p style={{ fontSize: 16, fontWeight: 700, color: t.text }}>{stat.value}</p>
                <p style={{ fontSize: 10, color: t.textMuted }}>{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Tombol */}
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
export function MemoryMatch() {
  const navigate = useNavigate();
  const { t } = useTheme();

  const [cards, setCards] = useState<Card[]>(buildDeck);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const matchedCount = cards.filter((c) => c.isMatched).length;
  const totalPairs = EMOJI_POOL.length;
  const isComplete = matchedCount === totalPairs * 2;

  const handlePause = () => {
    setIsRunning(false); // hentikan timer
    setIsPaused(true);
  };

  const handleResume = () => {
    if (!isComplete) setIsRunning(true); // lanjutkan timer
    setIsPaused(false);
  };

  const handleRestart = () => {
    handleReplay(); // fungsi reset yang sudah ada
    setIsPaused(false);
  };

  // ── Timer ──
  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  // ── Selesai ──
  useEffect(() => {
    if (isComplete && isRunning) {
      setIsRunning(false);
      // Hitung XP: makin sedikit langkah & waktu → makin banyak XP
      setTimeout(() => setShowResult(true), 600);
    }
  }, [isComplete, isRunning]);

  // ── Cek pasangan ──
  useEffect(() => {
    if (flipped.length !== 2) return;
    setIsChecking(true);
    const [a, b] = flipped;
    const cardA = cards.find((c) => c.id === a)!;
    const cardB = cards.find((c) => c.id === b)!;

    if (cardA.emoji === cardB.emoji) {
      // Cocok
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === a || c.id === b ? { ...c, isMatched: true } : c
          )
        );
        setFlipped([]);
        setIsChecking(false);
      }, 500);
    } else {
      // Tidak cocok — tutup kembali
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === a || c.id === b ? { ...c, isFlipped: false } : c
          )
        );
        setFlipped([]);
        setIsChecking(false);
      }, 900);
    }
    setMoves((m) => m + 1);
  }, [flipped]);

  const handleCardPress = useCallback(
    (card: Card) => {
      if (isPaused) return; 
      if (isChecking) return;
      if (card.isFlipped || card.isMatched) return;
      if (flipped.length >= 2) return;

      if (!isRunning) setIsRunning(true);

      setCards((prev) =>
        prev.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c))
      );
      setFlipped((prev) => [...prev, card.id]);
    },
    [isChecking, flipped, isRunning]
  );

  const calcXP = () => {
    // Max 120 XP, dikurangi berdasarkan langkah & waktu
    const base = 120;
    const movePenalty = Math.max(0, (moves - totalPairs) * 2);
    const timePenalty = Math.max(0, (seconds - 30) * 0.5);
    return Math.max(20, Math.round(base - movePenalty - timePenalty));
  };

  const handleReplay = () => {
    setCards(buildDeck());
    setFlipped([]);
    setMoves(0);
    setSeconds(0);
    setIsRunning(false);
    setIsChecking(false);
    setShowResult(false);
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
          left: -60,
          background: "radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)",
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
            🧩 Memory Match
          </h1>
          <p style={{ fontSize: 11, color: t.textSub }}>Temukan semua pasangan!</p>
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
      <div className="flex gap-3 px-5 mb-5">
        {/* Timer */}
        <div
          className="flex-1 flex items-center gap-2 px-3 py-2 rounded-2xl"
          style={{ background: t.surface, border: `1px solid ${t.surfaceBorder}` }}
        >
          <Clock size={14} style={{ color: "#06B6D4" }} />
          <span style={{ fontSize: 14, fontWeight: 700, color: t.text }}>
            {formatTime(seconds)}
          </span>
        </div>
        {/* Langkah */}
        <div
          className="flex-1 flex items-center gap-2 px-3 py-2 rounded-2xl"
          style={{ background: t.surface, border: `1px solid ${t.surfaceBorder}` }}
        >
          <RotateCcw size={14} style={{ color: "#A78BFA" }} />
          <span style={{ fontSize: 14, fontWeight: 700, color: t.text }}>
            {moves} langkah
          </span>
        </div>
        {/* Pasangan */}
        <div
          className="flex-1 flex items-center gap-2 px-3 py-2 rounded-2xl"
          style={{ background: t.surface, border: `1px solid ${t.surfaceBorder}` }}
        >
          <Trophy size={14} style={{ color: "#F59E0B" }} />
          <span style={{ fontSize: 14, fontWeight: 700, color: t.text }}>
            {matchedCount / 2}/{totalPairs}
          </span>
        </div>
      </div>

      {/* Progress bar pasangan */}
      <div className="px-5 mb-5">
        <div
          className="w-full rounded-full overflow-hidden"
          style={{ height: 6, background: t.xpBarTrack }}
          role="progressbar"
          aria-valuenow={matchedCount}
          aria-valuemax={totalPairs * 2}
          aria-label={`${matchedCount / 2} dari ${totalPairs} pasangan ditemukan`}
        >
          <motion.div
            animate={{ width: `${(matchedCount / (totalPairs * 2)) * 100}%` }}
            transition={{ duration: 0.4 }}
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #7C3AED, #06B6D4)",
              borderRadius: 9999,
            }}
          />
        </div>
      </div>

      {/* Grid kartu 4×4 */}
      <div
        className="grid px-5 gap-3"
        style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
        role="grid"
        aria-label="Papan Memory Match"
      >
        {cards.map((card) => (
          <motion.button
            key={card.id}
            onClick={() => handleCardPress(card)}
            className="relative rounded-2xl flex items-center justify-center"
            style={{
              aspectRatio: "1",
              cursor: card.isMatched || card.isFlipped ? "default" : "pointer",
              perspective: 600,
            }}
            whileTap={
              !card.isMatched && !card.isFlipped ? { scale: 0.92 } : {}
            }
            aria-label={
              card.isFlipped || card.isMatched
                ? `Kartu ${card.emoji} terbuka`
                : "Kartu tertutup"
            }
          >
            <AnimatePresence mode="wait">
              {card.isFlipped || card.isMatched ? (
                /* Sisi depan */
                <motion.div
                  key="front"
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 rounded-2xl flex items-center justify-center"
                  style={{
                    background: card.isMatched
                      ? "linear-gradient(135deg, rgba(6,182,212,0.25), rgba(124,58,237,0.2))"
                      : t.surface,
                    border: card.isMatched
                      ? "2px solid rgba(6,182,212,0.5)"
                      : `2px solid rgba(124,58,237,0.4)`,
                    boxShadow: card.isMatched
                      ? "0 0 16px rgba(6,182,212,0.3)"
                      : "0 4px 12px rgba(124,58,237,0.2)",
                  }}
                >
                  <span style={{ fontSize: 28 }}>{card.emoji}</span>
                </motion.div>
              ) : (
                /* Sisi belakang */
                <motion.div
                  key="back"
                  initial={{ rotateY: -90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)",
                    boxShadow: "0 4px 12px rgba(124,58,237,0.25)",
                  }}
                >
                  <span style={{ fontSize: 22, opacity: 0.6 }}>?</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      {/* Hint teks */}
      {!isRunning && !isComplete && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-6 px-5"
          style={{ fontSize: 13, color: t.textMuted }}
        >
          Ketuk kartu mana saja untuk mulai ⬆️
        </motion.p>
      )}

      {/* Result modal */}
      <AnimatePresence>
        {showResult && (
          <ResultModal
            moves={moves}
            seconds={seconds}
            xp={calcXP()}
            onReplay={handleReplay}
            onBack={() => navigate("/app/games")}
          />
        )}
      </AnimatePresence>

    <PauseControl
      onPause={handlePause}
      onResume={handleResume}
      onRestart={handleRestart}
    />

    </div>
  );
}
