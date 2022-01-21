import _ from "lodash";
export function classNames(...classes: string[]) {
  return _(classes)
    .flatMap((c) => c.split(" "))
    .filter(Boolean)
    .uniq()
    .join(" ");
}
