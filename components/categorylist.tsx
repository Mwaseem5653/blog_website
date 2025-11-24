import CategoryCard from "./categorycard";
import { Category } from "@/types";

export default function CategoryList({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {categories.map(c => <CategoryCard key={c._id} category={c} />)}
    </div>
  );
}
