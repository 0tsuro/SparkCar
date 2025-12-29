import Link from "next/link";

export default function PolitiqueDeConfidentialitePage() {
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
              href="/mentions-legales"
              className="text-sm font-semibold text-gray-600 hover:text-blue-700 hover:underline"
            >
              Mentions légales
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/cgv"
              className="text-sm font-semibold text-gray-600 hover:text-blue-700 hover:underline"
            >
              CGV
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
              Politique de confidentialité
            </h1>

            <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
              Cette page explique comment Spark’Car collecte, utilise et protège
              vos données personnelles lorsque vous utilisez le formulaire de
              contact.
            </p>

            <p className="mt-4 text-sm text-gray-500">
              Dernière mise à jour : <span className="font-semibold">29/12/2025</span>
            </p>

            <div className="mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-[#010D50] to-[#0328EE]" />

            {/* Sections */}
            <div className="mt-10 space-y-10 text-gray-700 leading-relaxed">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  1. Données collectées
                </h2>
                <p>
                  Via le formulaire de contact, Spark’Car collecte uniquement
                  les informations nécessaires au traitement de votre demande :
                </p>
                <ul className="mt-4 space-y-2">
                  {["Nom complet", "Numéro de téléphone", "Contenu du message"].map(
                    (item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-blue-700 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  2. Finalité du traitement
                </h2>
                <p>
                  Les données sont utilisées exclusivement pour :
                </p>
                <ul className="mt-4 space-y-2">
                  {[
                    "Répondre à votre demande de contact",
                    "Planifier une prestation (si besoin)",
                    "Assurer le suivi client lié à votre demande",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-blue-700 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  3. Base légale
                </h2>
                <p>
                  La base légale du traitement est votre consentement (case RGPD
                  cochée lors de l’envoi du formulaire).
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  4. Durée de conservation
                </h2>
                <p>
                  Les données issues du formulaire peuvent être conservées{" "}
                  <span className="font-semibold">jusqu’à 12 mois</span> maximum,
                  puis supprimées.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  5. Destinataires
                </h2>
                <p>
                  Vos données ne sont pas vendues ni partagées. Elles sont
                  consultées uniquement par Spark’Car pour traiter votre demande.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  6. Vos droits
                </h2>
                <p>
                  Conformément au RGPD, vous disposez d’un droit d’accès, de
                  rectification, d’opposition et de suppression de vos données.
                </p>

                <div className="mt-5 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-5">
                  <p className="text-sm text-gray-700">
                    Pour exercer vos droits : contactez-nous à{" "}
                    <span className="font-semibold">sparkcar.contact@gmail.com</span>.
                  </p>
                </div>
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
                href="/legal/cgv"
                className="text-sm font-semibold text-gray-600 hover:text-blue-700 hover:underline"
              >
                Voir les CGV
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
