import { CalendarDays, MessageSquareText, Share2, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionMark from "@/components/ui/SectionMark";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { WHATSAPP_URL } from "@/lib/config";

type CommunityFeature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const features: CommunityFeature[] = [
  {
    icon: MessageSquareText,
    title: "Diskusi Komunitas",
    description: "Berdiskusi seputar hukum, crypto, dan ekonomi digital.",
  },
  {
    icon: CalendarDays,
    title: "Event Komunitas",
    description: "Update event, seminar, dan kegiatan komunitas terbaru.",
  },
  {
    icon: Users,
    title: "Networking",
    description: "Terhubung dengan anggota, praktisi, dan akademisi.",
  },
  {
    icon: Share2,
    title: "Sharing & Informasi",
    description: "Berbagi wawasan, berita, dan informasi terbaru.",
  },
];

const COMMUNITY_MESSAGE =
  "Halo Admin, saya ingin bergabung ke Komunitas.\n\n" +
  "Saya mengetahui komunitas ini melalui website.\n\n" +
  "Mohon informasi mengenai cara bergabung.";

const whatsAppUrl = `${WHATSAPP_URL}?text=${encodeURIComponent(COMMUNITY_MESSAGE)}`;

export default function JoinCommunityPage() {
  return (
    <>
      <Navbar />
      <main id="top">
        <section className="relative overflow-hidden pt-24 pb-20 md:pt-28 md:pb-28">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <Reveal>
                <div className="flex justify-center">
                  <SectionMark clause="Ps. 11" label="Join Komunitas" align="center" />
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="font-display mt-8 text-3xl leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-[4rem]">
                  Join Komunitas
                </h1>
              </Reveal>

              <Reveal delay={0.18}>
                <p className="mx-auto mt-6 max-w-xl text-balance-pretty font-display text-lg italic text-bronze-soft sm:text-xl">
                  Temukan komunitas, berdiskusi, berbagi informasi, dan
                  terhubung dengan anggota lainnya.
                </p>
              </Reveal>
            </div>

            <div className="mx-auto mt-14 grid max-w-3xl gap-px border border-surface-2 bg-surface-2 sm:grid-cols-2">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <Reveal
                    key={feature.title}
                    delay={i * 0.05}
                    className="bg-void p-8"
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5 text-bronze"
                    />
                    <h2 className="mt-4 font-display text-lg text-paper">
                      {feature.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-mute">
                      {feature.description}
                    </p>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.1} className="mt-14 flex justify-center">
              <WhatsAppButton href={whatsAppUrl} className="px-8 py-4">
                Join Via WhatsApp
              </WhatsAppButton>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
