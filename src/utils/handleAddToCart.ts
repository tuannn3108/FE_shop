import { toast } from "react-toastify";
import { useCart } from "react-use-cart";
import { TypeProduct } from "../models/model";

const useAddToCart = () => {
  const { addItem } = useCart();
  const addToCart = (item: TypeProduct | null) => {
    if (item) {
      addItem({ ...item, id: item._id });
      toast.success("Thêm sản phẩm thành công");
    } else {
      toast.error("Sản phẩm không hợp lệ.");
    }
  };

  return { addToCart };
};
export default useAddToCart;
