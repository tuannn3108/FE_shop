import style from "./style.module.scss";
import { Form, Input, Button } from "antd";
import { useSelector } from "react-redux";
import { useCart } from "react-use-cart";
import orderApi from "@/services/orderApi";
import { TABS } from "@/constant";
import { RootState } from "@/redux/store";
import { TypeOrder, TypeOrderSucess } from "@/models/model";

interface Props {
  setTabSelect: (tabId: number) => void;
  total: number;
  setOrderSucess: (data: TypeOrderSucess) => void;
}

const Checkout = ({ setTabSelect, total, setOrderSucess }: Props) => {
  const user = useSelector((state: RootState) => state.user.user);
  const { items, emptyCart } = useCart();

  const onFinish = async (values: any) => {
    try {
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0];

      const checkoutData: TypeOrder = {
        invoice_date: formattedDate,
        user_id: user?.id,
        customer_name: values.lname,
        phone: values.phone,
        total,
        status: "Loading...",
        addrress: values.address,
        invoice_items: items.map((item) => ({
          product_id: item._id,
          name: item.title,
          price: item.price,
          quantity: item.quantity ?? 0,
          itemTotal: item.itemTotal ?? 0,
        })),
      };

      const response = await orderApi.checkout(checkoutData);
      emptyCart();
      setOrderSucess(response.data);
      setTabSelect(TABS[2].id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish} className={style.form}>
      <div className={style.formInfo}>
        <div className={style.contact}>
          <h1>Contact Information</h1>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Form.Item
                label="First Name"
                name="fname"
                className="w-full"
                rules={[{ required: true, message: "Thiếu thông tin" }]}>
                <Input placeholder="First name" />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lname"
                className="w-full"
                rules={[{ required: true, message: "Thiếu thông tin" }]}>
                <Input placeholder="Last name" />
              </Form.Item>
            </div>

            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[{ required: true, message: "Thiếu thông tin" }]}>
              <Input placeholder="Phone Number" />
            </Form.Item>

            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, message: "Thiếu thông tin" },
                { type: "email", message: "Chưa đúng định dạng" },
              ]}>
              <Input placeholder="Email Address" />
            </Form.Item>
          </div>
        </div>

        <div className={style.shipping}>
          <h1>Shipping Address</h1>
          <div className="flex flex-col gap-4">
            <Form.Item
              label="Street Address"
              name="address"
              rules={[{ required: true, message: "Thiếu thông tin" }]}>
              <Input placeholder="Street Address" />
            </Form.Item>

            <Form.Item
              label="Country"
              name="country"
              rules={[{ required: true, message: "Thiếu thông tin" }]}>
              <Input placeholder="Country" />
            </Form.Item>
          </div>
        </div>
      </div>

      <div className={style.btnOrder}>
        <Button htmlType="submit" type="primary">
          Place Order
        </Button>
      </div>
    </Form>
  );
};

export default Checkout;
