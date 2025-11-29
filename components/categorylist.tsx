import CategoryCard from "./categorycard";
import { Category } from "@/types";
import AdUnit from "./addunits"; // Import AdUnit

export default function CategoryList({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {categories.map((c, index) => (
        <>
          <CategoryCard key={c._id} category={c} />
          {/* Add an AdUnit after every 3 categories */}
          {(index + 1) % 3 === 0 && (
            <div className="col-span-full mt-4"> {/* Span full width for the ad */}
              {/* TODO: Replace with your actual AdSense slot ID */}
              <AdUnit slot="YOUR_AD_SLOT_ID" />
            </div>
          )}
        </>
      ))}
    </div>
  );
}
