import HeroSection from "@/components/hero-section";
import Image from "next/image";
import Link from "next/link";
import LogoSA from "/public/logo-sa.svg";

export default function Home() {
  return (
    <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <header className="mb-8 flex items-center justify-between border-b py-4 md:mb-12 md:py-8 xl:mb-16">
          {/* logo - start */}
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl"
            aria-label="logo"
          >
            <Image src={LogoSA} alt="Logo Salvatore Academy" width={48} />
            SA
          </Link>
          {/* logo - end */}

          {/* buttons - start */}
          <a
            href="https://salvatore.academy"
            target="_blank"
            className="rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
          >
            Go to salvatore.academy 🔗
          </a>
          {/* buttons - end */}
        </header>

        <HeroSection />
      </div>
    </div>
  );
}
