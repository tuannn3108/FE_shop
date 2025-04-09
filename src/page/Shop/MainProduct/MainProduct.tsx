import Card from "@/components/ui/Card/Card";
import { PERPAGES } from "@/constant";
import { handlefilterCategory } from "@/utils/Feature";
import { Button, Select } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { TypeProduct } from "../../../models/model";
import { RootState } from "../../../redux/store";
import style from "./style.module.scss";
import { Category } from "@/models/category";
import categoryApi from "@/services/categoryApi";

const MainProduct = () => {
  const [perPage, setPerPage] = useState<string>("8");
  const [paramCategory, setParamCategory] = useState<string>("all");
  const [filteredProducts, setFilteredProducts] = useState<TypeProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await categoryApi.getAll({ page: 1, limit: 10 });
      setCategories(response.data.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const products = useSelector((state: RootState) => state.product.product);

  const handleLoadMore = () => {
    setPerPage((perPagePrev) => perPagePrev + 4);
  };

  const handleSetPerPage = (value: string) => {
    setPerPage(value);
  };

  const handleSetcategory = (value: string) => {
    setParamCategory(value);
  };

  useEffect(() => {
    const datamoi = handlefilterCategory(products, paramCategory);
    setFilteredProducts(datamoi);
  }, [products, paramCategory]);

  const loadMoreData = useMemo(() => {
    return filteredProducts.slice(0, Number(perPage));
  }, [perPage, filteredProducts]);

  return (
    <div className={style.mainProdut}>
      <div className={style.toolBar}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: 8 }}>
            Select Category
          </label>
          <Select
            placeholder="Select a category"
            style={{ width: "100%" }}
            loading={loading}
            options={categories.map((category) => ({
              value: category.name,
              label: category.name,
            }))}
            value={paramCategory}
            onChange={handleSetcategory}
          />
        </div>

        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: 8 }}>
            Select Perpage
          </label>
          <Select
            style={{ width: "100%" }}
            value={perPage}
            options={PERPAGES}
            onChange={handleSetPerPage}
            placeholder="Select category"></Select>
        </div>
      </div>

      <div className={style.listProducts}>
        {loadMoreData &&
          loadMoreData.map((item, i) => <Card key={i} item={item} />)}
      </div>
      <div className="w-full mt-10">
        <Button onClick={handleLoadMore} className="mx-auto">
          Load More
        </Button>
      </div>
    </div>
  );
};

export default MainProduct;
