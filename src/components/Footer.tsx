import Image from "next/image";
// Bottom shell row with atom icon left and smile icon right.

export function Footer() {
  return (
    <div className="flex items-center justify-between pt-6 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:pt-8">
      <div className="lg:flex lg:justify-center">
        <Image src="/atom.svg" alt="Atom" width={32} height={32} />
      </div>
      <div className="lg:flex lg:justify-end">
        <Image src="/smile.svg" alt="Smile" width={55} height={31} />
      </div>
    </div>
  );
}
