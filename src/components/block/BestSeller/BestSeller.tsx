import Container from "../container/Container";
import style from "./style.module.scss";
import Card from "@/components/ui/Card/Card";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { TypeProduct } from "@/models/model";

export const BestSeller = () => {
  const products = useSelector((state: RootState) => state.product.product);
  const newProducts = products.slice(0, 8);
  return (
    <Container className="mt-10 h-full">
      <h1 className="mb-4 font-semibold text-3xl">Best Seller</h1>

      <div className={style.gridItem}>
        {newProducts.map((e:TypeProduct) => (
          <div key={e._id}>
            <Card item={e}></Card>
          </div>
        ))}
      </div>
    </Container>
  );
};
