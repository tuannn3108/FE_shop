import { useSelector } from "react-redux";
import CartItem from "../CartItem/CartItem";
import style from "./style.module.scss";
import { useCart } from "react-use-cart";
import { useNavigate } from "react-router-dom";
import { BTN_SHIP, TABS } from "@/constant";
import clsx from "clsx";
import { formatPrice } from "@/utils/toPrice";
import { useEffect, useState } from "react";
import { RootState } from "../../../redux/store";

interface Props {
  setTabSelect: (tabId: number) => void;
  setTotal: (total: number) => void;
  total: number;
}

const CartProducts = ({ setTabSelect, setTotal, total }: Props) => {
  const Navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);

  const { items, cartTotal, updateItemQuantity, removeItem } = useCart();
  const [selectShip, setSlectShip] = useState<number>(BTN_SHIP[0].cost);

  useEffect(() => {
    const newTotal = cartTotal + selectShip;
    setTotal(newTotal);
  }, [selectShip, cartTotal, setTotal]);

  const handleCheckout = () => {
    if (!user) {
      Navigate("/login");
    } else {
      setTabSelect(TABS[1].id);
    }
  };

  return (
    <>
      <div className={style.cartProduct}>
        {items.map((item, index) => (
          <CartItem
            key={index}
            item={item}
            updateItemQuantity={updateItemQuantity}
            removeItem={removeItem}
          />
        ))}
      </div>

      <div className={style.cartSumary}>
        <h2>Cart Sumary</h2>
        <div className={style.shipp}>
          {BTN_SHIP &&
            BTN_SHIP.map((e: any, i: number) => (
              <button
                key={i}
                onClick={() => setSlectShip(e.cost)}
                className={clsx(style.btnShipping, {
                  [style.btnShipSelect]: e.cost === selectShip,
                })}>
                <span>{e.name}</span>
                <span>{formatPrice(e.cost)}</span>
              </button>
            ))}
        </div>
        <div className={style.subtotal}>
          <p>Subtotal</p>
          <p className="font-bold">${cartTotal.toFixed(2)}</p>
        </div>
        <div className={style.total}>
          <p>Total</p>
          <p>${total.toFixed(2)}</p>
        </div>
        <div onClick={handleCheckout} className={style.btnCheckout}>
          <button>Check out</button>
        </div>
      </div>
    </>
  );
};

export default CartProducts;
