import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BRAND } from "@/config";
import { useCartStore } from "@/store/cartStore";
import {
  ShoppingBag,
  Menu,
  X,
  Flower2,
  LayoutDashboard,
} from "lucide-react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const totalItems = useCartStore((s) => s.totalItems);

  const links = [
    { to: "/", label: "Accueil" },
    { to: "/products", label: "Produits" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-orange-100 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 shadow-md shadow-orange-200">
            <Flower2 className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-800">
            {BRAND.name}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                isActive(l.to)
                  ? "bg-orange-100 text-orange-700"
                  : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/admin"
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors flex items-center gap-1.5 ${
              location.pathname.startsWith("/admin")
                ? "bg-orange-100 text-orange-700"
                : "text-gray-500 hover:bg-orange-50 hover:text-orange-600"
            }`}
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            Admin
          </Link>
        </nav>

        {/* Cart + Mobile toggle */}
        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            className="relative rounded-xl p-2.5 text-gray-600 transition-colors hover:bg-orange-50 hover:text-orange-600"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems() > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-[10px] font-bold text-white shadow-md shadow-orange-200">
                {totalItems() > 99 ? "99+" : totalItems()}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-xl p-2.5 text-gray-600 hover:bg-orange-50 md:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="border-t border-orange-100 bg-white px-4 pb-4 pt-2 md:hidden animate-in">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-lg px-4 py-3 text-sm font-medium ${
                isActive(l.to)
                  ? "bg-orange-100 text-orange-700"
                  : "text-gray-600 hover:bg-orange-50"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/admin"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium ${
              location.pathname.startsWith("/admin")
                ? "bg-orange-100 text-orange-700"
                : "text-gray-500 hover:bg-orange-50"
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Administration
          </Link>
        </nav>
      )}
    </header>
  );
}
