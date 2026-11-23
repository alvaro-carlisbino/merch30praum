"use client";

import { useState } from "react";
import { saveProfile } from "@/lib/mural/client";
import { UFS } from "@/lib/fans/profile";
import type { FanView } from "@/lib/mural/types";

const inputClass =
  "mt-1 min-h-10 w-full rounded-lg border border-white/15 bg-white/[0.04] px-3 text-[16px] text-white outline-none placeholder:text-white/30 focus:border-white/50 aria-[invalid=true]:border-[#ff8a80] sm:text-sm";

export function FanProfileForm({ fan }: { fan: FanView }) {
  const [form, setForm] = useState({
    nickname: fan.nickname ?? "",
    fullName: fan.fullName,
    birthDate: "",
    city: fan.city,
    state: fan.state,
    phone: fan.phone,
    accept: false,
  });
  const [error, setError] = useState("");
  const [field, setField] = useState("");
  const [saving, setSaving] = useState(false);
  const set = (key: keyof typeof form, value: string | boolean) => setForm((f) => ({ ...f, [key]: value }));
  const invalid = (name: string) => (field === name ? true : undefined);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setField("");
    const result = await saveProfile(form);
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      setField(result.field ?? "");
    }
  }

  return (
    <form onSubmit={submit} className="max-h-[62dvh] overflow-y-auto border-t border-white/10 p-4 text-xs text-white/65">
      <p className="mb-3 text-sm font-semibold text-white">Complete seu cadastro</p>
      <div className="grid grid-cols-2 gap-3">
        <label className="col-span-2">
          Apelido no chat
          <input
            value={form.nickname}
            onChange={(e) => set("nickname", e.target.value)}
            maxLength={24}
            required
            readOnly={Boolean(fan.nickname)}
            autoComplete="nickname"
            aria-invalid={invalid("nickname")}
            className={inputClass}
          />
        </label>
        <label className="col-span-2">
          Nome completo
          <input value={form.fullName} onChange={(e) => set("fullName", e.target.value)} maxLength={80} required autoComplete="name" aria-invalid={invalid("fullName")} className={inputClass} />
        </label>
        <label className="col-span-2">
          Data de nascimento
          <input type="date" value={form.birthDate} onChange={(e) => set("birthDate", e.target.value)} required autoComplete="bday" aria-invalid={invalid("birthDate")} className={`${inputClass} [color-scheme:dark]`} />
        </label>
        <label>
          Cidade
          <input value={form.city} onChange={(e) => set("city", e.target.value)} maxLength={80} required autoComplete="address-level2" aria-invalid={invalid("city")} className={inputClass} />
        </label>
        <label>
          Estado
          <select value={form.state} onChange={(e) => set("state", e.target.value)} required aria-invalid={invalid("state")} className={`${inputClass} [color-scheme:dark]`}>
            <option value="">UF</option>
            {UFS.map((uf) => (
              <option key={uf} value={uf}>{uf}</option>
            ))}
          </select>
        </label>
        <label className="col-span-2">
          Celular (opcional)
          <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} maxLength={24} autoComplete="tel" aria-invalid={invalid("phone")} className={inputClass} />
        </label>
      </div>
      <label className="mt-3 flex items-start gap-2 leading-relaxed">
        <input type="checkbox" checked={form.accept} onChange={(e) => set("accept", e.target.checked)} required className="mt-0.5 size-4 shrink-0 accent-white" />
        <span>Aceito as regras do chat e o uso destes dados para identificar minha conta e moderar o chat.</span>
      </label>
      {error && <p className="mt-2 text-[#ff8a80]" role="alert">{error}</p>}
      <button type="submit" disabled={saving} className="mt-3 min-h-11 w-full rounded-xl bg-white text-sm font-semibold text-black disabled:opacity-40">
        {saving ? "Salvando" : "Entrar no chat"}
      </button>
    </form>
  );
}
