import type { ReactNode } from "react";

const cls =
  "mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-live-cyan focus:ring-2 focus:ring-live-cyan/20";

export function Field({
  label,
  name,
  type = "text",
  required,
  maxLength,
  placeholder,
  value,
  defaultValue,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  placeholder?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        maxLength={maxLength ?? 200}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        className={cls}
      />
    </label>
  );
}

export function Area({
  label,
  name,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <textarea
        name={name}
        required={required}
        maxLength={2000}
        rows={5}
        placeholder={placeholder}
        className={cls}
      />
    </label>
  );
}

export function Select({
  label,
  name,
  children,
}: {
  label: string;
  name: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <select name={name} className={cls}>
        {children}
      </select>
    </label>
  );
}
