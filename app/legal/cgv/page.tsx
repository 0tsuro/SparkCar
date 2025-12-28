// app/cgv/page.tsx

import Link from "next/link";

export default function CGVPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        {/* Top back */}
        <div className="mb-10 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-2xl border border-gray-200 bg-white/80 px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm backdrop-blur hover:border-blue-200 hover:bg-blue-50/50 transition"
          >
            <span className="h-3 w-3 rounded-full bg-gradient-to-r from-[#010D50] to-[#0328EE]" />
            Retour au site
          </Link>

          <div className="hidden sm:flex items-center gap-2">
            <Link
              href="/politique-de-confidentialite"
              className="text-sm font-semibold text-gray-600 hover:text-blue-700 hover:underline"
            >
              Politique de confidentialité
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/mentions-legales"
              className="text-sm font-semibold text-gray-600 hover:text-blue-700 hover:underline"
            >
              Mentions légales
            </Link>
          </div>
        </div>

        {/* Card */}
        <section className="rounded-3xl border border-gray-200 bg-white shadow-xl overflow-hidden">
          <div className="p-8 md:p-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#010D50] to-[#0328EE] px-4 py-2 text-xs font-bold text-white shadow">
              Informations légales
            </span>

            <h1 className="mt-6 text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              Conditions Générales de Vente (CGV)
            </h1>

            <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
              Les présentes CGV définissent les conditions applicables aux
              prestations de nettoyage automobile à domicile proposées par
              Spark’Car.
            </p>

            <p className="mt-4 text-sm text-gray-500">
              Dernière mise à jour : <span className="font-semibold">29/12/2025</span>
            </p>

            <div className="mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-[#010D50] to-[#0328EE]" />

            {/* Sections */}
            <div className="mt-10 space-y-10 text-gray-700 leading-relaxed">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  1. Prestations
                </h2>
                <p>
                  Spark’Car propose des prestations de nettoyage intérieur et
                  extérieur de véhicules, réalisées à domicile ou sur lieu de
                  travail, sur rendez-vous.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  2. Devis et tarifs
                </h2>
                <p>
                  Les tarifs affichés sur le site sont indicatifs et peuvent
                  varier selon la catégorie du véhicule, son état et les options
                  choisies. Un tarif final peut être confirmé avant la prestation.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  3. Réservation
                </h2>
                <p>
                  La réservation peut se faire par téléphone, WhatsApp, email ou
                  via le formulaire de contact. Un rendez-vous est confirmé après
                  échange et validation de la disponibilité.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  4. Conditions de réalisation
                </h2>
                <p>
                  Le client s’engage à permettre l’accès au véhicule au lieu et
                  à l’heure convenus. L’intervention nécessite un espace
                  raisonnable et sécurisé autour du véhicule.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  5. Annulation / report
                </h2>
                <p>
                  En cas d’empêchement, le client est invité à prévenir Spark’Car
                  au plus tôt. Un report peut être proposé selon les
                  disponibilités.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  6. Paiement
                </h2>
                <p>
                  Les modalités de paiement (espèces, virement, etc.) sont
                  précisées au client avant la prestation. Le paiement est dû à
                  l’issue de l’intervention, sauf accord contraire.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  7. Responsabilité
                </h2>
                <p>
                  Spark’Car met en œuvre le soin nécessaire pour réaliser la
                  prestation. La responsabilité ne saurait être engagée en cas
                  de dommages préexistants, usure normale, ou défaut d’entretien
                  antérieur.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  8. Réclamations
                </h2>
                <p>
                  Toute réclamation doit être signalée dès la fin de la
                  prestation afin de permettre une constatation et, si
                  nécessaire, une solution adaptée.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  9. Droit applicable
                </h2>
                <p>
                  Les présentes CGV sont soumises au droit français.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-5">
                <p className="text-sm text-gray-700">
                  Contact Spark’Car :{" "}
                  <span className="font-semibold">sparkcar.contact@gmail.com</span>{" "}
                  – <span className="font-semibold">06 48 34 97 52</span>
                </p>
              </div>
            </div>

            {/* Bottom links */}
            <div className="mt-12 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <Link
                href="/legal/mentions-legales"
                className="text-sm font-semibold text-gray-600 hover:text-blue-700 hover:underline"
              >
                Voir les mentions légales
              </Link>
              <Link
                href="/legal/politique-de-confidentialite"
                className="text-sm font-semibold text-gray-600 hover:text-blue-700 hover:underline"
              >
                Voir la politique de confidentialité
              </Link>
            </div>
          </div>
        </section>

        <p className="mt-10 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Spark’Car – Tous droits réservés.
        </p>
      </div>
    </main>
  );
}
