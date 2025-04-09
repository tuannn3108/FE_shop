import { TypeProduct } from "@/models/model";

export const handlefilterCategory = (
  data: TypeProduct[] = [],
  paramsFilter: string
) => {
  if (paramsFilter.toLowerCase() === "all") {
    return data;
  }

  return data.filter((e) => {
    const category = e.category?.name?.toLowerCase();
    return category === paramsFilter.toLowerCase();
  });
};
