"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, MessageCircle, PencilLine, RefreshCw, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionMark from "@/components/ui/SectionMark";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { editorialEase } from "@/lib/motion";
import { useSound } from "@/lib/sound/use-sound";
import { WHATSAPP_URL } from "@/lib/config";
import {
  clearMemberData,
  getMemberData,
  type MemberFormData,
} from "@/lib/storage/member-storage";

type DisplayRow = {
  label: string;
  value: string;
};

export default function MemberConfirmation() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const { play } = useSound();
  const [data] = useState<MemberFormData | null>(() => getMemberData());

  // A slightly richer success cue once the confirmation view settles — the
  // satisfying "done" moment of the flow. Only ever plays when the user has
  // sound enabled; failures are isolated inside the manager.
  useEffect(() => {
    const t = window.setTimeout(() => play("confirm"), 350);
    return () => window.clearTimeout(t);
  }, [play]);

  // Data came from localStorage — never dummy/hardcoded values.
  const rows: DisplayRow[] = data
    ? [
        { label: "Nama", value: data.fullName },
        { label: "Username", value: data.username },
        { label: "Nomor WhatsApp", value: data.whatsapp },
        { label: "Email", value: data.email },
        { label: "Tanggal Lahir", value: data.birthDate },
        { label: "Kota", value: data.city },
        { label: "Alasan Bergabung", value: data.reason },
      ]
    : [];

  const buildMessage = (): string => {
    if (!data) return "";
    return [
      "Halo Admin, saya ingin mendaftar sebagai Member.",
      "",
      "DATA PENDAFTARAN",
      "",
      `Nama Lengkap: ${data.fullName}`,
      `Username: ${data.username}`,
      `Nomor WhatsApp: ${data.whatsapp}`,
      `Email: ${data.email}`,
      `Tanggal Lahir: ${data.birthDate}`,
      `Kota: ${data.city}`,
      `Alasan Bergabung: ${data.reason}`,
      "",
      "Saya telah mengisi dan menyetujui formulir pendaftaran melalui website.",
    ].join("\n");
  };

  const waUrl = `${WHATSAPP_URL}?text=${encodeURIComponent(buildMessage())}`;

  const handleReset = () => {
    clearMemberData();
    router.push("/join/member");
  };

  const renderData = () => (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: editorialEase }}
      className="border border-surface-2 bg-surface/40 p-6 text-left sm:p-8"
    >
      <h2 className="font-mono text-[11px] uppercase tracking-[0.28em] text-mute">
        Data Pendaftaran
      </h2>
      <dl className="mt-4 divide-y divide-surface-2">
        {rows.map((row, i) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.15 + i * 0.06, ease: editorialEase }}
            className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <dt className="shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
              {row.label}
            </dt>
            <dd className="min-w-0 break-words text-right font-display text-base text-paper sm:text-lg">
              {row.value}
            </dd>
          </motion.div>
        ))}
      </dl>
    </motion.div>
  );

  return (
    <>
      {/* Check icon: fade + scale-in with a small spring overshoot. */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={
          reduce
            ? { duration: 0.2 }
            : { type: "spring", stiffness: 320, damping: 20, delay: 0.1 }
        }
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-bronze/50 bg-bronze/10"
      >
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={
            reduce
              ? { duration: 0.2, delay: 0.1 }
              : { type: "spring", stiffness: 420, damping: 16, delay: 0.25 }
          }
          className="inline-flex"
        >
          <Check aria-hidden="true" className="h-7 w-7 text-bronze-soft" />
        </motion.span>
      </motion.div>

      <Reveal>
        <SectionMark clause="Ps. 10" label="Confirmed" align="center" />
      </Reveal>

      <Reveal delay={0.08}>
        <h1 className="font-display mt-8 text-3xl leading-[1.1] tracking-tight text-paper sm:text-5xl">
          Data Berhasil Diverifikasi
        </h1>
      </Reveal>

      <Reveal delay={0.16}>
        <p className="mt-5 text-balance-pretty text-[15px] leading-relaxed text-mute sm:text-base">
          Data kamu sudah berhasil diverifikasi. Untuk menyelesaikan proses
          pendaftaran member, silakan lanjutkan melalui WhatsApp.
        </p>
      </Reveal>

      <div className="mt-10">
        <AnimatePresence mode="wait">
          {data ? (
            renderData()
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: editorialEase }}
              className="border border-surface-2 bg-surface/40 p-10 text-center"
            >
              <p className="font-display text-xl text-paper">
                Data pendaftaran tidak ditemukan.
              </p>
              <p className="mt-3 text-sm text-mute">
                Silakan isi form pendaftaran terlebih dahulu.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {data ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.6, ease: editorialEase }}
          className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4"
        >
          <a
            href="/join/member"
            onClick={() => play("click")}
            className="inline-flex items-center justify-center gap-2 border border-paper/25 px-6 py-3.5 text-sm uppercase tracking-[0.18em] text-paper transition-[border-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-bronze hover:text-bronze active:translate-y-0"
          >
            <PencilLine aria-hidden="true" className="h-4 w-4" />
            Edit Data
          </a>

          <WhatsAppButton href={waUrl} icon={MessageCircle}>
            Kirim Data ke WhatsApp
          </WhatsAppButton>

          <button
            type="button"
            onClick={() => {
              play("error");
              handleReset();
            }}
            className="inline-flex items-center justify-center gap-2 border border-red-400/30 px-6 py-3.5 text-sm uppercase tracking-[0.18em] text-mute transition-[border-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-red-400/60 hover:text-red-300 active:translate-y-0"
          >
            <Trash2 aria-hidden="true" className="h-4 w-4" />
            Reset Data
          </button>
        </motion.div>
      ) : (
        <div className="mt-10 flex justify-center">
          <a
            href="/join/member"
            className="group inline-flex items-center justify-center gap-2.5 bg-paper px-7 py-3.5 text-sm uppercase tracking-[0.18em] text-void transition-[color,background-color,transform] duration-300 hover:scale-[1.02] hover:bg-bronze active:scale-[0.98]"
          >
            <RefreshCw aria-hidden="true" className="h-4 w-4 transition-transform duration-500 ease-out group-hover:rotate-180" />
            Kembali ke Form
          </a>
        </div>
      )}
    </>
  );
}