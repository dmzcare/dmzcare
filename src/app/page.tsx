import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 font-sans">
      <main className="max-w-lg text-center">
        <p className="mb-6 text-base font-semibold uppercase tracking-[0.2em] text-zinc-400">
          LAUNCHING SOON...
        </p>
        <Image
          src="/DMZ%20Care%20Favicon.webp"
          alt="DMZ Care"
          width={512}
          height={512}
          priority
          className="mx-auto mb-10 h-[min(36rem,78vh)] w-auto max-w-[min(100%,60rem)] object-contain sm:h-[min(42rem,78vh)] sm:max-w-[min(100%,72rem)]"
        />
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-400">
          Louisville, Kentucky
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50">
          Non-emergency medical transportation
        </h1>
      </main>
    </div>
  );
}
