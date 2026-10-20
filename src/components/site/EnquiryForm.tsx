import { useState, type FormEvent } from "react";
import { toast } from "sonner";

export type FormType = "general" | "quote" | "auction legal pack" | "auction callback" | "partner";

const SUBJECTS: Record<FormType, string> = {
  general: "General Enquiry — WM Legal Services",
  quote: "Quote Request — WM Legal Services",
  "auction legal pack": "Auction Legal Pack Review Request",
  "auction callback": "Auction Call-Back Request",
  partner: "Partner Enquiry — WM Legal Services",
};

const TITLES: Record<FormType, string> = {
  general: "Send us a message",
  quote: "Request a quote",
  "auction legal pack": "Request a legal pack review",
  "auction callback": "Request a call back",
  partner: "Partner with us",
};

// Empty = same-origin (dev + the Lovable-hosted site). The SFTP/FTP static
// build sets VITE_ENQUIRY_API_URL so the form reaches the Lovable-hosted API.
const ENQUIRY_API_URL = (import.meta.env.VITE_ENQUIRY_API_URL || "").replace(/\/$/, "");

interface Props {
  formType?: FormType;
  showTypeSelector?: boolean;
  compact?: boolean;
  title?: string;
}

export function EnquiryForm({
  formType = "general",
  showTypeSelector = false,
  compact = false,
  title,
}: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [type, setType] = useState<FormType>(formType);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const scheduleCall = String(fd.get("scheduleCall") || "").trim();
    const message = String(fd.get("message") || "").trim();
    const company = String(fd.get("company") || "").trim();
    const consent = fd.get("consent") === "on";

    try {
      setSubmitting(true);
      const response = await fetch(`${ENQUIRY_API_URL}/api/public/enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          scheduleCall,
          type,
          message,
          subject: SUBJECTS[type],
          consent,
          company,
        }),
      });
      if (!response.ok) {
        throw new Error(`Enquiry failed with status ${response.status}`);
      }
      toast.success("Your email has been sent!");
      form.reset();
    } catch (err) {
      console.error("Failed to submit enquiry:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <form
      onSubmit={onSubmit}
      className={`bg-card border border-border rounded-md ${compact ? "p-6" : "p-8 md:p-10"} shadow-[var(--shadow-card)]`}
    >
      {title && <h3 className="text-2xl mb-1">{title}</h3>}
      {!title && <h3 className="text-2xl mb-1">{TITLES[type]}</h3>}
      <p className="text-sm text-muted-foreground mb-6">
        We'll get back to you the same working day.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />

        {showTypeSelector && (
          <div className="flex flex-col">
            <label className="text-xs font-medium text-foreground/80 mb-1.5">Enquiry type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as FormType)}
              className="h-11 rounded-sm border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
            >
              <option value="general">General Enquiry</option>
              <option value="quote">Get a Quote</option>
              <option value="auction legal pack">Auction Legal Pack Review</option>
              <option value="partner">Partner With Us</option>
            </select>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col">
        <label className="text-xs font-medium text-foreground/80 mb-1.5">Schedule a date for a discovery call</label>
        <input
          type="date"
          name="scheduleCall"
          className="h-11 rounded-sm border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 md:w-1/2"
        />
      </div>

      <div className="mt-4 flex flex-col">
        <label className="text-xs font-medium text-foreground/80 mb-1.5">Message</label>
        <textarea
          name="message"
          rows={5}
          required
          maxLength={2000}
          className="rounded-sm border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
        />
      </div>

      <div className="mt-6 flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 rounded border-border bg-background text-primary focus:ring-ring/40"
        />
        <label htmlFor="consent" className="text-sm text-foreground/90 leading-snug cursor-pointer">
          I consent to my information being shared with Taylor Rose Solicitors for the purpose of providing my quote.
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 inline-flex items-center justify-center rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
      >
        {submitting ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <label className="text-xs font-medium text-foreground/80 mb-1.5">
        {label}
        {required && <span className="text-bronze"> *</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        maxLength={200}
        className="h-11 rounded-sm border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
      />
    </div>
  );
}
