import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

export const sendEnquiryEmail = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        phone: z.string().optional(),
        scheduleCall: z.string().optional(),
        type: z.string().optional(),
        message: z.string().min(1, "Message is required"),
        subject: z.string().optional(),
      })
      .parse(data)
  )
  .handler(async ({ data }) => {
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
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
      <p><strong>Enquiry Type:</strong> ${data.type || "General"}</p>
      <p><strong>Requested Discovery Call Date:</strong> ${data.scheduleCall || "Not requested"}</p>
      <hr />
      <h3>Message</h3>
      <p style="white-space: pre-wrap;">${data.message}</p>
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
      throw new Error(`Failed to send email: ${errorText}`);
    }

    const result = await response.json();
    return { success: true, result };
  });
