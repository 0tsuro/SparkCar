import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, phone, message } = await req.json();

    // Sécurité serveur
    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Nom invalide" }, { status: 400 });
    }

    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
      return NextResponse.json({ error: "Téléphone invalide" }, { status: 400 });
    }

    if (!message || message.length < 10) {
      return NextResponse.json({ error: "Message invalide" }, { status: 400 });
    }

    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL!,
      to: process.env.CONTACT_TO_EMAIL!,
      subject: `Nouvelle demande SparkCar — ${name}`,
      text: `
Nom : ${name}
Téléphone : ${phone}

Message :
${message}
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de l’envoi du message" },
      { status: 500 }
    );
  }
}
