import qs from "qs";

export const dealsQuery = qs.stringify(
  {
    populate: ["categories", "brand", "brand.logo", "banner"],
  },
  {
    encodeValuesOnly: true,
  }
);
