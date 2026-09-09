// Client-side storage helper for the Join Member flow.
//
// Data is kept in browser localStorage under a single key so the
// form → confirmation → WhatsApp steps share the same state without
// asking the user to re-enter anything.
//
// NOTE: localStorage is NOT a secure database. Only store what the
// registration flow actually needs — never passwords, API keys,
// tokens, or secrets.

export const MEMBER_STORAGE_KEY = "join_member_data";

export type MemberFormData = {
  fullName: string;
  username: string;
  whatsapp: string;
  email: string;
  birthDate: string;
  city: string;
  reason: string;
  agreed: boolean;
};

const EMPTY_DATA: MemberFormData = {
  fullName: "",
  username: "",
  whatsapp: "",
  email: "",
  birthDate: "",
  city: "",
  reason: "",
  agreed: false,
};

export function saveMemberData(data: MemberFormData): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(MEMBER_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage may be full or blocked — the flow continues without it.
  }
}

export function getMemberData(): MemberFormData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(MEMBER_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<MemberFormData>;
    return { ...EMPTY_DATA, ...parsed };
  } catch {
    return null;
  }
}

export function clearMemberData(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(MEMBER_STORAGE_KEY);
  } catch {
    // ignore
  }
}