import Container from "@/components/block/container/Container";
import Breadcumb from "@/components/ui/Breadcumb/breadcumb";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import style from "./style.module.scss";
import { IoIosStar } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import useAddToCart from "@/utils/handleAddToCart";
import LoadingPage from "../Loading/LoadingPage";
import { RootState } from "../../redux/store";
import { TypeProduct } from "../../models/model";
import { Button } from "antd";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useAddToCart();

  const [item, setItem] = useState<TypeProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  const products = useSelector((state: RootState) => state.product.product);

  useEffect(() => {
    setLoading(true);
    const dataById = products.find((e) => e._id === id);
    if (dataById) {
      setItem(dataById);
    }
    setLoading(false);
  }, [id, products]);

  const breadcumbs = ["Product", `${item?.title}`];

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <Container className="mt-[100px]">
      <Breadcumb items={breadcumbs} />
      <div className={style.productDetail}>
        <div className={style.imageProduct}>
          <img src={item?.linkImg} alt="" />
        </div>
        <div className={style.info}>
          <span className={style.star}>
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
            <p>11 reviews</p>
          </span>
          <div className={style.body}>
            <h1 className={style.title}>{item?.title}</h1>
            <p className={style.description}>{item?.description}</p>
            <span className={style.price}>${item?.price}</span>
          </div>

          <div className={style.btnControl}>
            <div className="flex w-full mb-4">
              <Button.Group>
                <Button
                  disabled={quantity < 2}
                  onClick={() => setQuantity(quantity - 1)}>
                  -
                </Button>
                <Button>{quantity}</Button>
                <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
              </Button.Group>

              <button className={style.btnFavourite}>
                <FaRegHeart /> Wishlish
              </button>
            </div>
            <button
              onClick={() => addToCart(item)}
              className={style.btnAddToCart}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetail;
