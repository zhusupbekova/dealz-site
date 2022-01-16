import Link from "next/link";
import { ICategory } from "../../utils/schema";

interface ICategoryTagProps {
  category: ICategory;
}

export function CategoryTag({ category }: ICategoryTagProps) {
  return (
    <Link href={`/?categories=${category.attributes.slug}`}>
      <span
        className="border rounded-sm px-2 py-1 text-xs tracking-wide bg-white text-gray-500 cursor-pointer"
        key={category.id}
      >
        {category.attributes.title}
      </span>
    </Link>
  );
}
