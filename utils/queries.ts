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
    ],
  },
  {
    encodeValuesOnly: true,
  }
);
