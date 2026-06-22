import { useNavigate, useLocation } from "react-router";
import { Home, Gamepad2, BarChart2, Trophy, Settings2 } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const navItems = [
  { icon: Home, label: "Beranda", path: "/app" },
  { icon: Gamepad2, label: "Game", path: "/app/games" },
  { icon: BarChart2, label: "Performa", path: "/app/performance" },
  { icon: Trophy, label: "Ranking", path: "/app/leaderboard" },
  { icon: Settings2, label: "Setelan", path: "/app/settings" },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTheme();

  return (
    <nav
      style={{
        background: t.navBg,
        backdropFilter: "blur(20px)",
        borderTop: `1px solid ${t.navBorder}`,
        fontFamily: "Poppins, sans-serif",
        transition: "background 0.3s, border-color 0.3s",
      }}
      className="flex-shrink-0"
    >
      <div className="flex items-center justify-around h-[68px] px-2">
        {navItems.map((item) => {
          const isActive =
            item.path === "/app"
              ? location.pathname === "/app"
              : location.pathname.startsWith(item.path);
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1 min-w-[56px] py-1 transition-all duration-200 active:scale-95"
            >
              <div
                className="p-1.5 rounded-xl transition-all duration-200"
                style={{
                  background: isActive ? t.navActivePill : "transparent",
                  boxShadow: isActive
                    ? "0 0 12px rgba(124,58,237,0.3)"
                    : "none",
                }}
              >
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  style={{
                    color: isActive ? t.navIconActive : t.navIconInactive,
                    transition: "color 0.2s",
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? t.navLabelActive : t.navLabelInactive,
                  transition: "color 0.2s",
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
