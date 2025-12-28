import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs"; // important si tu utilises Resend (Node runtime)

export async function POST(req: Request) {
  try {
    const { name, phone, message } = await req.json();

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: "RESEND_API_KEY manquante côté serveur." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const from = process.env.CONTACT_FROM || "onboarding@resend.dev";
    const to = process.env.CONTACT_TO || "sparkcar.contact@gmail.com";

    await resend.emails.send({
      from,
      to,
      subject: `Spark’Car — Nouvelle demande (${name})`,
      replyTo: process.env.CONTACT_REPLY_TO || undefined,
      text: `Nom: ${name}\nTéléphone: ${phone}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "Erreur lors de l’envoi." },
      { status: 500 }
    );
  }
}
