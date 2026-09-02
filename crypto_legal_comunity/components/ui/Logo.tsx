import Image from "next/image";

type LogoProps = {
  className?: string;
};

export default function Logo({ className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/image/logo.jpeg"
        alt="Crypto Legal Community"
        width={160}
        height={40}
        priority
        className="h-8 w-auto"
      />
      <span className="font-display text-lg tracking-[0.08em] text-paper">
        Crypto Legal Community
      </span>
    </span>
  );
}