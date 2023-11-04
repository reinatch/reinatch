import Image from "next/image";
import { Shiba } from "./components/test";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-200 via-violet-600 to-sky-900">
      <div className="w-full ">
        <Shiba />
      </div>
    </main>
  );
}
