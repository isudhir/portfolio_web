"use client";

import { useState, useCallback, type ChangeEvent, type FormEvent } from "react";

/* ─── Types ─────────────────────────────────────────────── */

export type ContactStatus = "idle" | "loading" | "success" | "error" | "not_configured";

export interface ContactFormFields {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export interface UseContactFormReturn {
  values: ContactFormFields;
  errors: ContactFormErrors;
  status: ContactStatus;
  configured: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  reset: () => void;
}

/* ─── Validation ─────────────────────────────────────────── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: ContactFormFields): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  } else if (values.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!values.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.message.trim()) {
    errors.message = "Message is required.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

/* ─── Hook ───────────────────────────────────────────────── */

const INITIAL_VALUES: ContactFormFields = { name: "", email: "", message: "" };

export function useContactForm(): UseContactFormReturn {
  const [values, setValues] = useState<ContactFormFields>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<ContactStatus>("idle");

  const endpoint = process.env.NEXT_PUBLIC_CONTACT_API ?? "";
  const configured = endpoint.trim().length > 0;

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));
      // Clear field error on change
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!configured) {
        setStatus("not_configured");
        return;
      }

      const validationErrors = validate(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setStatus("loading");
      setErrors({});

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: values.name.trim(),
            email: values.email.trim(),
            message: values.message.trim(),
          }),
        });

        if (res.ok) {
          setStatus("success");
          setValues(INITIAL_VALUES);
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    },
    [configured, endpoint, values]
  );

  const reset = useCallback(() => {
    setValues(INITIAL_VALUES);
    setErrors({});
    setStatus("idle");
  }, []);

  return { values, errors, status, configured, handleChange, handleSubmit, reset };
}
