"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useContactForm } from "@/hooks/useContactForm";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";

/* ─── Reusable field wrapper ──────────────────────────────── */

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-foreground"
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-xs text-destructive mt-0.5"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
}

/* ─── Input with focus glow ──────────────────────────────── */

const glassInputClass = cn(
  "w-full min-h-[44px] rounded-lg px-4 py-2.5 text-sm",
  "bg-white/5 border border-white/10",
  "text-foreground placeholder:text-muted-foreground",
  "outline-none transition-all duration-200",
  "focus:border-purple/60 focus:ring-2 focus:ring-purple/25 focus:bg-white/8",
  "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/25"
);

/* ─── Main component ─────────────────────────────────────── */

export function ContactForm() {
  const uid = useId();
  const { values, errors, status, configured, handleChange, handleSubmit } =
    useContactForm();

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";
  const isNotConfigured = status === "not_configured" || !configured;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="flex flex-col gap-5"
    >
      {/* Name */}
      <Field id={`${uid}-name`} label="Your Name" error={errors.name}>
        <input
          id={`${uid}-name`}
          name="name"
          type="text"
          autoComplete="name"
          placeholder="John Doe"
          value={values.name}
          onChange={handleChange}
          disabled={isLoading || isSuccess}
          aria-describedby={errors.name ? `${uid}-name-error` : undefined}
          aria-invalid={!!errors.name}
          className={glassInputClass}
        />
      </Field>

      {/* Email */}
      <Field id={`${uid}-email`} label="Email Address" error={errors.email}>
        <input
          id={`${uid}-email`}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="john@example.com"
          value={values.email}
          onChange={handleChange}
          disabled={isLoading || isSuccess}
          aria-describedby={errors.email ? `${uid}-email-error` : undefined}
          aria-invalid={!!errors.email}
          className={glassInputClass}
        />
      </Field>

      {/* Message */}
      <Field id={`${uid}-message`} label="Message" error={errors.message}>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={5}
          placeholder="Tell me about your project or just say hello..."
          value={values.message}
          onChange={handleChange}
          disabled={isLoading || isSuccess}
          aria-describedby={errors.message ? `${uid}-message-error` : undefined}
          aria-invalid={!!errors.message}
          className={cn(glassInputClass, "resize-y min-h-[120px]")}
        />
      </Field>

      {/* Status feedback */}
      <div aria-live="polite" aria-atomic="true">
        {isSuccess && (
          <div className="flex items-center gap-2 text-sm text-emerald-400">
            <CheckCircle2 size={16} aria-hidden="true" />
            <span>Message sent! I&apos;ll get back to you soon.</span>
          </div>
        )}
        {isError && (
          <div className="flex items-center gap-2 text-sm text-destructive">
            <AlertCircle size={16} aria-hidden="true" />
            <span>Something went wrong. Please try again.</span>
          </div>
        )}
        {isNotConfigured && !isSuccess && (
          <p className="text-xs text-muted-foreground">
            Contact form is not yet configured — please reach out directly via email.
          </p>
        )}
      </div>

      {/* Submit */}
      {!isSuccess && (
        <MagneticButton
          type="submit"
          disabled={isLoading}
          className="mt-1 gap-2 bg-purple text-white hover:bg-purple/90 focus-visible:ring-purple self-start px-6 py-3 min-h-[44px]"
          strength={0.25}
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              <Send size={16} aria-hidden="true" />
              Send Message
            </>
          )}
        </MagneticButton>
      )}
    </form>
  );
}
