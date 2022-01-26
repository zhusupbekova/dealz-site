import qs from "qs";

export const dealsQuery = qs.stringify(
  {
    populate: [
      "categories",
      "brand",
      "brand.logo",
      "banner",
      "deal_lifetime",
      "deal_usages",
      "overview",
      "deals",
      "deals.brand",
      "deals.brand.logo",
    ],
  },
  {
    encodeValuesOnly: true,
  }
);

export const userQuery = qs.stringify(
  {
    populate: ["deal_usages", "deals"],
  },
  {
    encodeValuesOnly: true,
  }
);
