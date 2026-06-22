import { useState, type FormEvent } from "react";

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
  const [sent, setSent] = useState(false);
  const [type, setType] = useState<FormType>(formType);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const scheduleCall = String(fd.get("scheduleCall") || "").trim();
    const message = String(fd.get("message") || "").trim();
    const subject = encodeURIComponent(SUBJECTS[type]);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSchedule a call: ${scheduleCall || "Not requested"}\nEnquiry type: ${type}\n\nMessage:\n${message}`,
    );
    // TODO: replace with Formspree / Cloud function submission to enquiries@wmlegalservices.co.uk
    window.location.href = `mailto:enquiries@wmlegalservices.co.uk?subject=${subject}&body=${body}`;
    setSent(true);
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
        <label className="text-xs font-medium text-foreground/80 mb-1.5">Message</label>
        <textarea
          name="message"
          rows={5}
          required
          maxLength={2000}
          className="rounded-sm border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
        />
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex items-center justify-center rounded-sm bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        {sent ? "Opening your email…" : "Send enquiry"}
      </button>
      <p className="mt-4 text-xs text-muted-foreground">
        By submitting, you agree to be contacted regarding your enquiry. We never share your details.
      </p>
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
