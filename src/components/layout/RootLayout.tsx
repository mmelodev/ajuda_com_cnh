import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="min-h-svh bg-asphalt-950 flex justify-center">
      <div className="w-full max-w-md min-h-svh bg-asphalt-950 relative flex flex-col shadow-2xl shadow-black/40 sm:my-0 sm:border-x sm:border-asphalt-800">
        <Outlet />
      </div>
    </div>
  );
}
