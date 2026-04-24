import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { CheckCircle, ArrowRight, Home } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-50 to-emerald-100 shadow-lg shadow-emerald-100">
        <CheckCircle className="h-12 w-12 text-emerald-500" />
      </div>
      <h1 className="text-3xl font-bold text-gray-800">
        Commande confirmée !
      </h1>
      <p className="mt-3 max-w-md leading-relaxed text-gray-500">
        Merci pour votre commande. Vous recevrez une confirmation très bientôt.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link to="/">
          <Button variant="outline">
            <Home className="h-4 w-4" />
            Retour à l'accueil
          </Button>
        </Link>
        <Link to="/products">
          <Button>
            Continuer mes achats
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
