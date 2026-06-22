import { Outlet } from "react-router";
import { BottomNav } from "./BottomNav";
import { useTheme } from "../contexts/ThemeContext";

export function MobileLayout() {
  const { t } = useTheme();

  return (
    <div
      className="min-h-screen flex justify-center transition-colors duration-300"
      style={{ background: t.outerBg }}
    >
      <div
        className="w-full max-w-[390px] flex flex-col overflow-hidden transition-colors duration-300"
        style={{ minHeight: "100svh", background: t.pageBg }}
      >
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
