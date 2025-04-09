import style from "./style.module.scss";
import { TABS } from "@/constant";
import { useNavigate } from "react-router-dom";
import { TypeOrderSucess } from "../../../models/model";
import { Button } from "antd";
interface Props {
  setTabSelect: (tabId: number) => void;
  orderSucess: TypeOrderSucess | null;
}

const OrderDetail = ({ setTabSelect, orderSucess }: Props) => {
  const Navigate = useNavigate();

  const handlePuchase = () => {
    setTabSelect(TABS[0].id);
    Navigate("/");
  };

  return (
    <div className={style.orderSucess}>
      <div className={style.content}>
        <p>Thank you!!</p>
        <h1>Your order has been received</h1>
        <div className={style.orderDetail}>
          <div className="text-gray-500 text-sm">
            <p>Order code</p>
            <p>Date</p>
            <p>Total</p>
            <p>Status</p>
          </div>
          <div className="font-semibold text-black text-sm">
            <p>#DH_1234</p>
            <p>{orderSucess?.invoice_date}</p>
            <p>{orderSucess?.total}</p>
            <p>{orderSucess?.status}</p>
          </div>
        </div>

        <div className={style.btn}>
          <Button onClick={handlePuchase} htmlType="submit" color={"default"}>
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
