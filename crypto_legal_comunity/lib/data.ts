// Central content store for Crypto Legal Community (CLC).
// No backend — everything the site renders is typed, static data.
// Keeping copy here (instead of scattered inline in components) means
// every section component stays a clean, reusable template.

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Insights", href: "#insights" },
  { label: "Programs", href: "#programs" },
  { label: "Community", href: "#community" },
  { label: "Contact", href: "#contact" },
];

export type Principle = {
  number: string;
  title: string;
  description: string;
};

export const principles: Principle[] = [
  {
    number: "01",
    title: "Legal Literacy",
    description:
      "Meningkatkan pemahaman hukum dalam menghadapi perkembangan teknologi dan ekonomi digital.",
  },
  {
    number: "02",
    title: "Digital Awareness",
    description:
      "Mendorong generasi muda memahami risiko, regulasi, dan peluang di dunia digital.",
  },
  {
    number: "03",
    title: "Community",
    description:
      "Membangun ruang diskusi antara mahasiswa, praktisi, akademisi, dan masyarakat.",
  },
];

// The six fields the community sits at the intersection of.
export type FieldNode = {
  id: string;
  label: string;
};

export const fieldNodes: FieldNode[] = [
  { id: "law", label: "Law" },
  { id: "regulation", label: "Regulation" },
  { id: "crypto", label: "Crypto" },
  { id: "investment", label: "Investment" },
  { id: "technology", label: "Technology" },
  { id: "economy", label: "Digital Economy" },
];

// Cross-references between fields.
export const fieldConnections: [string, string][] = [
  ["law", "regulation"],
  ["regulation", "crypto"],
  ["crypto", "investment"],
  ["investment", "economy"],
  ["economy", "technology"],
  ["technology", "law"],
  ["law", "crypto"],
  ["regulation", "economy"],
];

export type Insight = {
  number: string;
  date: string;
  category: string;
  title: string;
  description: string;
};

export const insights: Insight[] = [
  {
    number: "01",
    date: "12 Jan 2026",
    category: "Regulation",
    title: "Understanding Crypto Regulation in Indonesia",
    description:
      "How the country's evolving digital asset framework is redrawing the line between speculation and lawful participation.",
  },
  {
    number: "02",
    date: "28 Jan 2026",
    category: "Legal",
    title: "Digital Assets and Legal Responsibility",
    description:
      "What custody, ownership, and liability actually mean once an asset only exists on a ledger.",
  },
  {
    number: "03",
    date: "09 Feb 2026",
    category: "Investment",
    title: "Investment Literacy for the Digital Generation",
    description:
      "Why understanding risk and regulation matters as much as understanding the market itself.",
  },
  {
    number: "04",
    date: "21 Feb 2026",
    category: "Economy",
    title: "The Future of Law in a Decentralized Economy",
    description:
      "As systems decentralize, the frameworks meant to govern them are being rewritten in real time.",
  },
];

export type Program = {
  icon: "gavel" | "book" | "mic" | "search" | "handshake";
  title: string;
  description: string;
};

export const programs: Program[] = [
  {
    icon: "gavel",
    title: "Legal Discussion",
    description:
      "Forum diskusi mengenai isu hukum dan teknologi terbaru.",
  },
  {
    icon: "book",
    title: "Crypto & Investment Literacy",
    description:
      "Edukasi mengenai cryptocurrency, investasi, risiko, dan regulasi.",
  },
  {
    icon: "mic",
    title: "Public Talk",
    description:
      "Diskusi bersama praktisi, akademisi, dan profesional ekonomi digital.",
  },
  {
    icon: "search",
    title: "Legal Research",
    description:
      "Mendorong mahasiswa melakukan penelitian mengenai perkembangan hukum digital.",
  },
  {
    icon: "handshake",
    title: "Community Gathering",
    description:
      "Tempat bertemu dan bertukar wawasan antaranggota.",
  },
];

export type Stat = {
  value: string;
  label: string;
};

export const communityStats: Stat[] = [
  { value: "50+", label: "Members" },
  { value: "10+", label: "Discussions" },
  { value: "5+", label: "Programs" },
  { value: "1", label: "Growing Community" },
];

export type GalleryItem = {
  id: string;
  caption: string;
  variant: "a" | "b" | "c" | "d" | "e" | "f";
  span: "tall" | "wide" | "regular";
  image: string;
};
export const galleryItems: GalleryItem[] = [
  {
    id: "legal-discussion",
    caption: "Legal Discussion",
    variant: "a",
    span: "tall",
    image: "/image/gallery-1.jpeg",
  },
  {
    id: "seminar",
    caption: "Seminar",
    variant: "b",
    span: "regular",
    image: "/image/gallery-2.jpeg",
  },
  {
    id: "students",
    caption: "Students",
    variant: "c",
    span: "regular",
    image: "/image/gallery-3.jpeg",
  },
  {
    id: "presentation",
    caption: "Presentation",
    variant: "d",
    span: "wide",
    image: "/image/gallery-4.jpeg",
  },
  {
    id: "networking",
    caption: "Networking",
    variant: "e",
    span: "regular",
    image: "/image/gallery-5.jpeg",
  },
  {
    id: "idbw-2026-1",
    caption: "IDBW 2026",
    variant: "f",
    span: "regular",
    image: "/image/gallery-6.jpeg",
  },
  {
    id: "idbw-2026-2",
    caption: "IDBW 2026",
    variant: "f",
    span: "regular",
    image: "/image/imge1.jpeg",
  },
];
  

export type Discussion = {
  number: string;
  category: string;
  title: string;
};

export const discussions: Discussion[] = [
  {
    number: "01",
    category: "Legal × Crypto",
    title: "Understanding Digital Asset Regulation",
  },
  {
    number: "02",
    category: "Investment × Law",
    title: "Risk, Responsibility & Regulation",
  },
  {
    number: "03",
    category: "Digital Economy",
    title: "The Future of Regulation",
  },
];

// Contact
export type ContactChannel = {
  icon: "mail" | "at" | "whatsapp" | "users";
  label: string;
  value: string;
  href: string;
};

export const contactChannels: ContactChannel[] = [
  {
    icon: "mail",
    label: "Email",
    value: "mkaysan5b@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=mkaysan5b@gmail.com",
  },
  {
    icon: "at",
    label: "Instagram",
    value: "@cryptolegalcommunity",
    href: "https://www.instagram.com/cryptolegalcommunity_?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==",
  },
  {
    icon: "whatsapp",
    label: "WhatsApp",
    value: "Crypto Legal Community",
    href: " https://chat.whatsapp.com/BQOBBC4E5z72r7iv0vzYik",
  },
  {
    icon: "users",
    label: "Community",
    value: "Join the discussion space",
    href: "https://discord.gg/cryptolegalcommunity",
  },
];

export const siteMeta = {
  name: "Crypto Legal Community",
  shortName: "CLC",
  tagline: "Law × Digital × Community",
  established: "EST. 2026",
  location: "Indonesia",
};
