import Image from "next/image";
// Bottom shell row with atom icon left and smile icon right.

export function Footer() {
  return (
    <div className="flex min-w-0 flex-wrap items-center justify-between gap-4 pt-6 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:flex-nowrap lg:pt-8">
      <div className="lg:flex lg:justify-center">
        <Image
          src="/atom.svg"
          alt="Atom"
          width={32}
          height={32}
          sizes="32px"
          loading="lazy"
          fetchPriority="low"
        />
      </div>
      <div className="lg:flex lg:justify-end">
        <Image
          src="/smile.svg"
          alt="Smile"
          width={55}
          height={31}
          sizes="55px"
          loading="lazy"
          fetchPriority="low"
        />
      </div>
    </div>
  );
}
