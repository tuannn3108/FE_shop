import { useSelector } from "react-redux";
import style from "./style.module.scss";
import { Table, Tag } from "antd";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import orderApi from "@/services/orderApi";
import { TypeOrderSucess } from "@/models/model";
const MyOrder = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [orders, setOrders] = useState<TypeOrderSucess[] | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await orderApi.getOrderById(user!.id);
        setOrders(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "green";
      case "pending":
        return "orange";
      case "cancelled":
        return "red";
      case "shipped":
        return "blue";
      default:
        return "gray";
    }
  };

  return (
    <div className={style.myOrder}>
      <h1>Orders Detail</h1>
      <div className="overflow-x-auto">
        <Table dataSource={orders} rowKey="_id" pagination={false}>
          <Table.Column
            title="Order ID"
            dataIndex="_id"
            key="_id"
            render={(id) => (
              <span className="font-medium text-gray-900 dark:text-white">
                {id}
              </span>
            )}
          />
          <Table.Column
            title="Date"
            dataIndex="invoice_date"
            key="invoice_date"
          />
          <Table.Column
            title="Status"
            dataIndex="status"
            key="status"
            render={(status) => (
              <Tag color={getStatusColor(status)}>{status}</Tag>
            )}
          />
          <Table.Column
            title="Price"
            dataIndex="total"
            key="total"
            render={(total) => `$${total.toFixed(2)}`} // Định dạng tiền tệ
          />
          <Table.Column
            title="Action"
            key="action"
            render={() => (
              <a
                href="#"
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                View
              </a>
            )}
          />
        </Table>
      </div>
    </div>
  );
};

export default MyOrder;
