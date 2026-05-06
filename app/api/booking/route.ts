import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    const email = getString(body, "email")?.trim() ?? "";
    const vehicle = getString(body, "vehicle")?.trim() ?? "";
    const formula = getString(body, "formula")?.trim() ?? "";
    const price = getString(body, "price")?.trim() ?? "";

    if (!EMAIL_REGEX.test(email) || !vehicle || !formula) {
      return NextResponse.json(
        { ok: false, error: "Données manquantes ou invalides." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: "Configuration serveur manquante." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const from = process.env.CONTACT_FROM || "onboarding@resend.dev";
    const ownerEmail = process.env.CONTACT_TO || "sparkcar.contact@gmail.com";

    const summary = `Véhicule : ${vehicle}\nFormule : ${formula}${price ? ` (${price})` : ""}`;

    await resend.emails.send({
      from,
      to: email,
      subject: "Spark'Car — Confirmation de votre réservation",
      text: [
        "Bonjour,",
        "",
        "Votre demande de réservation a bien été prise en compte.",
        "",
        "Récapitulatif :",
        summary,
        "",
        "Nous vous contacterons rapidement pour confirmer votre créneau.",
        "",
        "À bientôt,",
        "L'équipe Spark'Car",
      ].join("\n"),
    });

    await resend.emails.send({
      from,
      to: ownerEmail,
      replyTo: email,
      subject: `Spark'Car — Nouvelle réservation (${vehicle} – ${formula})`,
      text: [
        "Nouvelle demande de réservation :",
        "",
        `E-mail client : ${email}`,
        summary,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Erreur lors de l'envoi." },
      { status: 500 }
    );
  }
}
