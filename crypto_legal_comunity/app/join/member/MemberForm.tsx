"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check } from "lucide-react";
import { editorialEase } from "@/lib/motion";
import { useSound } from "@/lib/sound/use-sound";
import {
  getMemberData,
  saveMemberData,
  type MemberFormData,
} from "@/lib/storage/member-storage";

type Errors = Partial<
  Record<
    | "fullName"
    | "username"
    | "whatsapp"
    | "email"
    | "birthDate"
    | "city"
    | "reason"
    | "agreed",
    string
  >
>;

const inputBase =
  "w-full border border-paper/20 bg-surface/50 px-4 py-3 text-sm text-paper placeholder:text-mute/50 transition-[border-color,box-shadow] duration-300 focus:border-bronze focus:shadow-[0_0_0_3px_rgba(168,139,90,0.12)] focus:outline-none";

const inputError = "border-red-400/50 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(248,113,113,0.1)]";

const EMPTY: MemberFormData = {
  fullName: "",
  username: "",
  whatsapp: "",
  email: "",
  birthDate: "",
  city: "",
  reason: "",
  agreed: false,
};

export default function MemberForm() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const { play } = useSound();
  const [form, setForm] = useState<MemberFormData>(() => {
    // Pre-fill with previously saved data so "Edit Data" doesn't force the
    // user to start over. Storage is read in a lazy initializer (client-side).
    const saved = getMemberData();
    return saved ?? EMPTY;
  });
  const [errors, setErrors] = useState<Errors>({});
  const [saved, setSaved] = useState(false);
  // Bumped on every failed submit so error labels replay their (subtle)
  // shake once per attempt — not continuously.
  const [shakeKey, setShakeKey] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // The consent tick is a deliberate decision — give it a tiny audible
    // tick so the form doesn't feel mute while filling in.
    if (type === "checkbox") play("click");
  };

  // Soft airy cue when a field gains focus — quiet enough to never grate,
  // distinct from the click so it reads as "ready to type", not "pressed".
  const handleFocus = () => play("whoosh");

  const validate = (): Errors => {
    const next: Errors = {};

    if (!form.fullName.trim()) next.fullName = "Nama lengkap wajib diisi.";
    if (!form.username.trim()) next.username = "Username wajib diisi.";
    if (!form.whatsapp.trim()) {
      next.whatsapp = "Nomor WhatsApp wajib diisi.";
    } else if (!/^[0-9+()\-\s]{8,20}$/.test(form.whatsapp.trim())) {
      next.whatsapp = "Nomor WhatsApp tidak valid.";
    }
    if (!form.email.trim()) {
      next.email = "Email wajib diisi.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Format email tidak valid.";
    }
    if (!form.birthDate) next.birthDate = "Tanggal lahir wajib diisi.";
    if (!form.city.trim()) next.city = "Kota wajib diisi.";
    if (!form.reason.trim()) next.reason = "Alasan ingin bergabung wajib diisi.";
    if (!form.agreed) next.agreed = "Anda harus menyetujui untuk bergabung.";

    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    // Never store anything before the data passes validation.
    if (Object.keys(nextErrors).length > 0) {
      // One soft cue + one subtle shake per attempt, nothing repetitive.
      setShakeKey((k) => k + 1);
      play("error");
      return;
    }

    saveMemberData(form);
    setSaved(true);
    play("success");

    // Brief success feedback before moving to the confirmation page.
    window.setTimeout(() => {
      router.push("/join/member/confirmation");
    }, 600);
  };

  const fieldClass = (key: keyof Errors) =>
    `${inputBase} ${errors[key] ? inputError : ""}`;

  const renderError = (key: keyof Errors) =>
    errors[key] ? (
      <motion.p
        key={`${key}-${shakeKey}`}
        initial={reduce ? { opacity: 0 } : { opacity: 0, x: 0 }}
        animate={
          reduce
            ? { opacity: 1 }
            : { opacity: 1, x: [0, -4, 4, -2, 2, 0] }
        }
        transition={{ duration: reduce ? 0.2 : 0.36, ease: editorialEase }}
        className="mt-1.5 font-mono text-[11px] uppercase tracking-wide text-red-300"
      >
        {errors[key]}
      </motion.p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
            Nama Lengkap
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={form.fullName}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Nama lengkap"
            className={fieldClass("fullName")}
          />
          {renderError("fullName")}
        </div>

        <div>
          <label htmlFor="username" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Username"
            className={fieldClass("username")}
          />
          {renderError("username")}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="whatsapp" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
            Nomor WhatsApp
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            value={form.whatsapp}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="+62878288452"
            className={fieldClass("whatsapp")}
          />
          {renderError("whatsapp")}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="nama@email.com"
            className={fieldClass("email")}
          />
          {renderError("email")}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="birthDate" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
            Tanggal Lahir
          </label>
          <input
            id="birthDate"
            name="birthDate"
            type="date"
            value={form.birthDate}
            onChange={handleChange}
            onFocus={handleFocus}
            className={`${fieldClass("birthDate")} [color-scheme:dark]`}
          />
          {renderError("birthDate")}
        </div>

        <div>
          <label htmlFor="city" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
            Kota
          </label>
          <input
            id="city"
            name="city"
            type="text"
            value={form.city}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Kota tempat tinggal"
            className={fieldClass("city")}
          />
          {renderError("city")}
        </div>
      </div>

      <div>
        <label htmlFor="reason" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
          Alasan Ingin Bergabung
        </label>
        <textarea
          id="reason"
          name="reason"
          rows={4}            value={form.reason}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder="Ceritakan alasan Anda ingin bergabung..."
          className={fieldClass("reason")}
        />
        {renderError("reason")}
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="agreed"
            checked={form.agreed}
            onChange={handleChange}
            className="mt-0.5 h-4 w-4 shrink-0 accent-bronze"
          />
          <span className="text-sm leading-relaxed text-mute">
            Saya menyetujui untuk bergabung sebagai member.
          </span>
        </label>
        {renderError("agreed")}
      </div>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={saved}
          onClick={() => {
            // Click cue only fires when the form is valid (error path plays
            // the softer error cue instead).
            if (!saved && Object.keys(validate()).length === 0) play("click");
          }}
          className="clc-sheen group inline-flex w-full items-center justify-center gap-2.5 bg-paper px-7 py-3.5 text-sm uppercase tracking-[0.18em] text-void transition-[background-color,transform,box-shadow] duration-300 hover:scale-[1.01] hover:bg-bronze hover:shadow-[0_14px_36px_-16px_rgba(168,139,90,0.4)] active:scale-[0.98] disabled:cursor-default disabled:opacity-90 disabled:hover:scale-100 disabled:hover:bg-paper sm:w-auto"
        >
          {saved ? "Menyimpan..." : "Verifikasi Data"}
        </button>

        {saved && (
          <motion.p
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: editorialEase }}
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-bronze-soft"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 18,
                delay: 0.05,
              }}
              className="inline-flex"
            >
              <Check aria-hidden="true" className="h-4 w-4" />
            </motion.span>
            Data berhasil disimpan
          </motion.p>
        )}
      </div>
    </form>
  );
}
