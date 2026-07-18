import Image from "next/image";
import MatchSection from "./Components/MatchSection";
import Dashboard from "./dashboard/page";
export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-[#09041b] px-5 py-3">
        <div className="flex justify-center rounded-3xl">
          <Image
            src="/Final Hero Image.png"
            alt="FantasyPilot Logo"
            width={1000}
            height={200}
            className="rounded-xl "
            priority
          ></Image>
        </div>
        <MatchSection />
      </div>
      <footer className=" bg-[#06030c] border-t border-slate-800">
        <div className="max-w-7xl mx-auto py-4 px-6 flex justify-center items-center gap-2 text-gray-300 text-sm">
          <i className="fa-regular fa-copyright"></i>
          <p>
            {new Date().getFullYear()}{" "}
            <span className="font-semibold text-cyan-400">FantasyPilot</span>.
            All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
