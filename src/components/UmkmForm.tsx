"use client";

import { useFormState, useFormStatus } from "react-dom";
import type { Umkm } from "@prisma/client";
import { businessTypeOptions, conditionOptions } from "@/lib/labels";
import type { UmkmFormState } from "@/app/actions/umkm";

type Action = (prevState: UmkmFormState, formData: FormData) => Promise<UmkmFormState>;

export default function UmkmForm({ action, initial }: { action: Action; initial?: Umkm }) {
  const [state, formAction] = useFormState<UmkmFormState, FormData>(action, {});

  return (
    <form action={formAction} className="space-y-8">
      {state?.error && (
        <p className="rounded-sm border border-clay/50 bg-clay/10 px-4 py-3 text-sm text-clay">
          {state.error}
        </p>
      )}

      <Section title="Profil Usaha">
        <Grid>
          <Field label="Nama Usaha *" name="businessName" defaultValue={initial?.businessName} required />
          <Field label="Nama Pemilik *" name="ownerName" defaultValue={initial?.ownerName} required />
          <Field label="Nomor Telepon / WhatsApp" name="phone" defaultValue={initial?.phone ?? ""} />
          <Field label="Instagram (tanpa @)" name="instagram" defaultValue={initial?.instagram ?? ""} />
          <SelectField
            label="Jenis Usaha *"
            name="businessType"
            defaultValue={initial?.businessType ?? "LAINNYA"}
            options={businessTypeOptions}
          />
          <SelectField
            label="Kondisi Usaha"
            name="condition"
            defaultValue={initial?.condition ?? "CUKUP"}
            options={conditionOptions}
          />
        </Grid>
        <div className="mt-5">
          <label className="mb-1.5 block font-avenir text-[11px]  tracking-wider text-paper/50">
            Deskripsi / Produk Unggulan
          </label>
          <textarea
            name="description"
            defaultValue={initial?.description ?? ""}
            rows={3}
            className="w-full rounded-sm border border-line bg-plate px-3.5 py-2.5 text-sm text-paper outline-none focus:border-gold"
          />
        </div>
      </Section>

      <Section title="Lokasi">
        <Grid>
          <Field label="Alamat *" name="address" defaultValue={initial?.address} required />
          <Field label="RT *" name="rt" defaultValue={initial?.rt} required />
          <Field label="RW *" name="rw" defaultValue={initial?.rw ?? "09"} required />
          <Field label="Link Google Maps" name="googleMapsLink" defaultValue={initial?.googleMapsLink ?? ""} />
          <Field
            label="Latitude"
            name="latitude"
            type="number"
            step="any"
            defaultValue={initial?.latitude?.toString() ?? ""}
            hint="Ambil dari 'Bagikan lokasi' di Google Maps saat survei"
          />
          <Field
            label="Longitude"
            name="longitude"
            type="number"
            step="any"
            defaultValue={initial?.longitude?.toString() ?? ""}
          />
        </Grid>
      </Section>

      <Section title="Media dan Publikasi">
        <Grid>
          <Field label="URL Foto Usaha" name="photoUrl" defaultValue={initial?.photoUrl ?? ""} />
        </Grid>
        <div className="mt-4 flex flex-wrap gap-6">
          <Checkbox label="Sudah memiliki legalitas (NIB/Halal)" name="hasLegality" defaultChecked={initial?.hasLegality} />
          <Checkbox
            label="Tampilkan di direktori publik"
            name="isPublished"
            defaultChecked={initial?.isPublished ?? true}
          />
        </div>
      </Section>

      <SubmitButton label={initial ? "Simpan Perubahan" : "Simpan Data UMKM"} />
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-sm border border-line bg-plate p-6">
      <h3 className="font-avenir text-[11px]  tracking-wider text-teal">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

function Field({
  label,
  name,
  defaultValue,
  required,
  type = "text",
  step,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  required?: boolean;
  type?: string;
  step?: string;
  hint?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-avenir text-[11px]  tracking-wider text-paper/50">{label}</label>
      <input
        name={name}
        type={type}
        step={step}
        defaultValue={defaultValue ?? ""}
        required={required}
        className="w-full rounded-sm border border-line bg-ink px-3.5 py-2.5 text-sm text-paper outline-none focus:border-gold"
      />
      {hint && <p className="mt-1 text-xs text-paper/35">{hint}</p>}
    </div>
  );
}

function SelectField({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue: string;
  options: [string, string][];
}) {
  return (
    <div>
      <label className="mb-1.5 block font-avenir text-[11px]  tracking-wider text-paper/50">{label}</label>
      <select
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-sm border border-line bg-ink px-3.5 py-2.5 text-sm text-paper outline-none focus:border-gold"
      >
        {options.map(([value, opt]) => (
          <option key={value} value={value}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function Checkbox({ label, name, defaultChecked }: { label: string; name: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-2.5 text-sm text-paper/80">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded-sm border-line bg-ink accent-gold"
      />
      {label}
    </label>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-sm bg-gold px-6 py-3 font-avenir text-xs  tracking-wider text-ink transition hover:bg-gold/90 disabled:opacity-50"
    >
      {pending ? "Menyimpan…" : label}
    </button>
  );
}
