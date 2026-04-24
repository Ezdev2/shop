import { Link } from "react-router-dom";
import { CATEGORIES } from "@/config";

export function CategoriesPreview() {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Catégories</h2>
        <p className="text-sm text-gray-500">Trouvez ce qu'il vous faut</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="group flex flex-col items-center gap-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-orange-100/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-100/50"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 text-orange-500 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md">
                <Icon className="h-7 w-7" />
              </div>
              <span className="text-sm font-semibold text-gray-700">
                {cat.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
