import { ICategory } from "../../utils/schema";

interface ICategoryTagProps {
  category: ICategory;
}
export function CategoryTag({ category }: ICategoryTagProps) {
  return (
    <span
      className="border rounded-sm px-2 py-1 text-xs tracking-wide text-gray-400"
      key={category.id}
    >
      {category.attributes.title}
    </span>
  );
}
