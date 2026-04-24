import { BRAND } from "@/config";
import { Flower2, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-orange-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 shadow-md shadow-orange-200">
                <Flower2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-800">
                {BRAND.name}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              {BRAND.tagline}
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-gray-800">
              Liens utiles
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-500">
              <li>
                <a href="#" className="transition-colors hover:text-orange-600">
                  À propos
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-orange-600">
                  Livraison
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-orange-600">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-gray-800">
              Service Client
            </h4>
            <div className="space-y-2.5 text-sm text-gray-500">
              <p className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-orange-400" />
                Lun–Ven : 9h–18h
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-orange-400" />
                contact@valala.fr
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-orange-400" />
                Paris, France
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-orange-50 pt-6">
          <p className="text-center text-xs text-gray-400">
            © {new Date().getFullYear()} {BRAND.name} — Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
