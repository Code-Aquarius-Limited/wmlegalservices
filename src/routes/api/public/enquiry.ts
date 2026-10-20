// Public enquiry endpoint for external static deployments (e.g. SFTP hosting).
// /api/public/* bypasses site auth, so the handler validates everything itself.
// The form on the Lovable-hosted site also uses this route (same-origin).

import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
} as const;

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

// Honeypot: real visitors never fill this in; bots do.
const enquirySchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(40).optional().default(""),
  scheduleCall: z.string().trim().max(40).optional().default(""),
  type: z.string().trim().max(60).optional().default("General"),
  message: z.string().trim().min(1).max(2000),
  subject: z.string().trim().max(120).optional(),
  consent: z.literal(true, {
    message: "Consent is required to submit this enquiry",
  }),
  company: z.string().max(0).optional().default(""),
});

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

export const Route = createFileRoute("/api/public/enquiry")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: corsHeaders }),

      POST: async ({ request }) => {
        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return jsonResponse({ success: false, error: "Invalid request body." }, 400);
        }

        const parsed = enquirySchema.safeParse(raw);
        if (!parsed.success) {
          return jsonResponse({ success: false, error: "Please check the form fields and try again." }, 400);
        }
        const data = parsed.data;

        try {
          const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
          if (!LOVABLE_API_KEY) {
            throw new Error("LOVABLE_API_KEY is not configured");
          }

          const RESEND_API_KEY = process.env.RESEND_API_KEY;
          if (!RESEND_API_KEY) {
            throw new Error("RESEND_API_KEY is not configured");
          }

          const subjectLine =
            data.subject || `New Enquiry (${data.type || "General"}): ${data.name}`;

          const htmlContent = `
            <h2>New Website Enquiry</h2>
            <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(data.phone) || "Not provided"}</p>
            <p><strong>Enquiry Type:</strong> ${escapeHtml(data.type) || "General"}</p>
            <p><strong>Requested Discovery Call Date:</strong> ${escapeHtml(data.scheduleCall) || "Not requested"}</p>
            <p><strong>Consent:</strong> Yes — I consent to my information being shared with Taylor Rose Solicitors for the purpose of providing my quote.</p>
            <hr />
            <h3>Message</h3>
            <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
          `;

          const response = await fetch(`${GATEWAY_URL}/emails`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${LOVABLE_API_KEY}`,
              "X-Connection-Api-Key": RESEND_API_KEY,
            },
            body: JSON.stringify({
              from: "WM Legal Services <onboarding@resend.dev>",
              to: ["enquiries@wmlegalservices.co.uk"],
              reply_to: data.email,
              subject: subjectLine,
              html: htmlContent,
            }),
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error("Resend Gateway Error:", response.status, errorText);
            return jsonResponse({ success: false, error: "Failed to send enquiry." }, 502);
          }

          return jsonResponse({ success: true }, 200);
        } catch (error) {
          console.error("Enquiry submission failed:", error);
          return jsonResponse({ success: false, error: "Something went wrong. Please try again." }, 500);
        }
      },
    },
  },
});
