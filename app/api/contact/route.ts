import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  phone: string;
  message: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getString(obj: Record<string, unknown>, key: string): string | null {
  const v = obj[key];
  return typeof v === "string" ? v : null;
}

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json().catch(() => null);

    if (!isRecord(body)) {
      return NextResponse.json(
        { ok: false, error: "Requête invalide." },
        { status: 400 }
      );
    }

    const name = getString(body, "name")?.trim() ?? "";
    const phone = getString(body, "phone")?.trim() ?? "";
    const message = getString(body, "message")?.trim() ?? "";

    if (name.length < 2 || phone.length < 6 || message.length < 10) {
      return NextResponse.json(
        { ok: false, error: "Champs manquants ou invalides." },
        { status: 400 }
      );
    }

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
    const replyTo = process.env.CONTACT_REPLY_TO;

    await resend.emails.send({
      from,
      to,
      subject: `Spark’Car — Nouvelle demande (${name})`,
      replyTo: replyTo || undefined,
      text: `Nom: ${name}\nTéléphone: ${phone}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Erreur lors de l’envoi." },
      { status: 500 }
    );
  }
}
