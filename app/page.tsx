import Image from "next/image";
import { Shiba } from "./components/test";
export default function Home() {
  // bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-200 via-violet-600 to-sky-900
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <div className="w-screen h-screen">
        <Shiba />
      </div>
    </main>
  );
}
