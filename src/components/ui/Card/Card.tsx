import style from "./style.module.scss";
import { IoIosStar } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TypeProduct } from "@/models/model";
import useAddToCart from "@/utils/handleAddToCart";

type CardProps = {
  item: TypeProduct;
};

const Card = ({ item }: CardProps) => {
  const { addToCart } = useAddToCart();

  return (
    <div className={style.card}>
      <div className={style.cardImage}>
        <div className={style.btnTop}>
          <button className={style.btnNew}>New</button>
          <button className={style.btnHeart}>
            <FaRegHeart />
          </button>
        </div>
        <img alt="" src={item.linkImg} />
        <button onClick={() => addToCart(item)} className={style.btnAddToCart}>
          ADD TO CART
        </button>
      </div>

      <div className={style.cardTitle}>
        <div className={style.star}>
          <IoIosStar />
          <IoIosStar />
          <IoIosStar />
          <IoIosStar />
          <IoIosStar />
        </div>
        <Link to={`/product/${item._id}`}>{item.title}</Link>
        <span>${item.price}</span>
      </div>
    </div>
  );
};

export default Card;
