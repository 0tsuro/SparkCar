import Link from "next/link";

export default function MentionsLegalesPage() {
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
              Mentions légales
            </h1>

            <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
              Les informations ci-dessous concernent l’éditeur du site Spark’Car
              et l’hébergement.
            </p>

            <p className="mt-4 text-sm text-gray-500">
              Dernière mise à jour :{" "}
              <span className="font-semibold">29/12/2025</span>
            </p>

            <div className="mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-[#010D50] to-[#0328EE]" />

            <div className="mt-10 space-y-10 text-gray-700 leading-relaxed">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  1. Éditeur du site
                </h2>
                <p>
                  <span className="font-semibold">Spark’Car</span>
                  <br />
                  Activité : nettoyage automobile à domicile
                  <br />
                  Contact :{" "}
                  <span className="font-semibold">
                    sparkcar.contact@gmail.com
                  </span>
                  <br />
                  Téléphone :{" "}
                  <span className="font-semibold">06 48 34 97 52</span>
                  <br />
                  Adresse : Saint-Omer, Hauts-de-France
                  <br />
                  Siret : 98836044200012
                  <br />
                  Statut Juridique : Entrepreneur individuel    
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  2. Hébergement
                </h2>
                <p>
                  Le site est hébergé par{" "}
                  <span className="font-semibold">Vercel Inc.</span>
                  <br />
                  (informations d’hébergement disponibles sur demande).
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  3. Propriété intellectuelle
                </h2>
                <p>
                  Les contenus (textes, visuels, logos) présents sur le site
                  Spark’Car sont protégés. Toute reproduction non autorisée est
                  interdite.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  4. Données personnelles
                </h2>
                <p>
                  Pour en savoir plus sur la collecte et le traitement des
                  données, consultez la{" "}
                  <Link
                    href="/legal/politique-de-confidentialite"
                    className="text-blue-700 font-semibold hover:underline"
                  >
                    politique de confidentialité
                  </Link>
                  .
                </p>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-5">
                <p className="text-sm text-gray-700">
                  Contact Spark’Car :{" "}
                  <span className="font-semibold">
                    sparkcar.contact@gmail.com
                  </span>{" "}
                  – <span className="font-semibold">06 48 34 97 52</span>
                </p>
              </div>
            </div>

            {/* Bottom links */}
            <div className="mt-12 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <Link
                href="/legal/cgv"
                className="text-sm font-semibold text-gray-600 hover:text-blue-700 hover:underline"
              >
                Voir les CGV
              </Link>
              <Link
                href="/politique-de-confidentialite"
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
