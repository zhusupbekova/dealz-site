interface ICouponProps {
  id: number;
  brand: string;
  title: string;
  description: string;
  categories: string[];
  used_times: number;
  imageSrc: string;
  href: string;
}

export function CouponCard({ item }: { item: ICouponProps }) {
  return (
    <div
      key={item.id}
      className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden"
    >
      <div className="relative aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-32">
        <img
          src={item.imageSrc}
          alt={item.title}
          className="w-full h-full object-center object-cover sm:w-full sm:h-full"
        />
        <div className="flex">
          <img
            className=" absolute right-2 bottom-0  translate-y-2/4  h-12 w-12 rounded-full ring-4 ring-white sm:h-16 sm:w-16"
            src={item.imageSrc}
            alt=""
          />
        </div>
      </div>
      <div className="p-4 space-x-2 flex border-t">
        {item.categories.map((category) => (
          <span className="border rounded-sm px-2 py-1 text-xs tracking-wide text-gray-400">
            {category}
          </span>
        ))}
      </div>
      <div className="flex-1 p-4 space-y-2 flex flex-col border-t">
        <h3 className="text-lg font-medium text-gray-900">
          <a href={item.href}>
            <span aria-hidden="true" className="absolute inset-0" />
            {item.title}
          </a>
        </h3>
        <p className="text-sm text-gray-500">{item.description}</p>
        <div className="flex-1 flex flex-col justify-end">
          <p className="text-sm italic text-gray-500">{item.used_times} used</p>
        </div>
      </div>
    </div>
  );
}
