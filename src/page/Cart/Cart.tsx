import Container from "@/components/block/container/Container";
import style from "./style.module.scss";
import Tabs from "./Tabs/Tabs";
import { TABS } from "@/constant";
import { useCart } from "react-use-cart";
import { Link } from "react-router-dom";
import { useState } from "react";
import { TypeOrderSucess } from "@/models/model";
import { Button } from "antd";

const Cart = () => {
  const { isEmpty, totalUniqueItems } = useCart();

  const [total, setTotal] = useState<number>(0);
  const [tabSelect, setTabSelect] = useState<number>(TABS[0].id);
  const [orderSucess, setOrderSucess] = useState<TypeOrderSucess | null>(null);
  const selectedTab = TABS.find((t) => t.id === tabSelect);

  const handleSetTotal = (newTotal: number) => {
    setTotal(newTotal);
  };

  if (isEmpty) {
    return (
      <div className="mt-[60px] h-[500px] text-center flex flex-col justify-center items-center">
        <h1 className="font-bold text-3xl mb-12">
          Không có sản phẩm trong giỏ hàng
        </h1>
        <Button>
          <Link to={"/shop"}>Quay lại trang sản phẩm</Link>
        </Button>
      </div>
    );
  }

  return (
    <Container className={style.cartPage}>
      <h1 className={style.title}>Cart</h1>
      <Tabs tabs={TABS} tabSelect={tabSelect} />

      <div className={style.header}>
        <p>Shopping Cart</p>
        <p>#{totalUniqueItems}</p>
      </div>

      <div className={style.main}>
        {selectedTab && (
          <selectedTab.component
            setTabSelect={setTabSelect}
            total={total}
            setTotal={handleSetTotal}
            setOrderSucess={setOrderSucess}
            orderSucess={orderSucess}
          />
        )}
      </div>
    </Container>
  );
};

export default Cart;
