"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Globe, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionMark from "@/components/ui/SectionMark";
import SplitText from "@/components/ui/SplitText";
import { officeLocation, officeHours } from "@/lib/config/location";
import { editorialEase } from "@/lib/motion";
import { useSound } from "@/lib/sound/use-sound";

function buildMapUrl(): string {
  const { latitude, longitude } = officeLocation;
  const query = encodeURIComponent(
    `${officeLocation.name}, ${officeLocation.address}, ${officeLocation.city}, ${officeLocation.country}`
  );
  return `https://www.openstreetmap.org/export/embed.html?bbox=${
    longitude - 0.01
  }%2C${latitude - 0.008}%2C${longitude + 0.01}%2C${latitude + 0.008}&layer=mapnik&marker=${latitude}%2C${longitude}&q=${query}`;
}

// Deep link that opens the user's maps app with directions to the office.
function buildDirectionsUrl(): string {
  const { latitude, longitude } = officeLocation;
  return `https://www.google.com/maps/dir/?api=1&destination=${latitude}%2C${longitude}`;
}

const MAP_URL = buildMapUrl();

const details = [
  {
    icon: MapPin,
    label: "Address",
    value: `${officeLocation.address}, ${officeLocation.city}, ${officeLocation.country}`,
  },
  {
    icon: Globe,
    label: "Country",
    value: officeLocation.country,
  },
  {
    icon: Clock,
    label: officeHours.label,
    value: officeHours.value,
  },
];

export default function OfficeLocation() {
  const { play } = useSound();

  return (
    <section
      id="location"
      className="scroll-mt-20 border-t border-surface-2 py-28 sm:py-36"
    >
      <Container>
        <div className="max-w-2xl">
          <SectionMark clause="Ps. 12" label="Our Office" />
          <SplitText
            as="h2"
            text="Lokasi Kantor"
            className="font-display mt-8 text-4xl tracking-tight text-paper sm:text-5xl"
          />
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-mute sm:text-base">
              Temukan kami dan jadilah bagian dari diskusi yang berlangsung di
              ruang komunitas kami.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Map — appears just after the info column (delay 0.25 vs 0–0.16),
              with a quiet fade + scale; never spins or drifts. */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, scale: 0.985 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
            transition={{ duration: 0.9, delay: 0.25, ease: editorialEase }}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-surface-2 bg-surface/40">
              <iframe
                title={`Peta lokasi ${officeLocation.name}`}
                src={MAP_URL}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </motion.div>

          {/* Details */}
          <div className="flex flex-col justify-center gap-px border border-surface-2 bg-surface-2 lg:col-span-4">
            {details.map((detail, i) => {
              const Icon = detail.icon;
              return (
                <Reveal
                  key={detail.label}
                  delay={i * 0.08}
                  className="bg-void p-6 sm:p-7"
                >
                  <Icon aria-hidden="true" className="h-5 w-5 text-bronze" />
                  <h3 className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
                    {detail.label}
                  </h3>
                  <p className="mt-2 break-words font-display text-base text-paper sm:text-lg">
                    {detail.value}
                  </p>
                </Reveal>
              );
            })}

            <Reveal delay={0.28} className="bg-void p-6 sm:p-7">
              <a
                href={buildDirectionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => play("click")}
                className="group inline-flex items-center gap-2.5 border border-paper/25 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-[border-color,color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-bronze hover:text-bronze hover:shadow-[0_10px_28px_-14px_rgba(0,0,0,0.7)] active:translate-y-0"
              >
                Get Directions
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
