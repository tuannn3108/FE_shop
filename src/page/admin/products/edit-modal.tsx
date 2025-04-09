import { Category } from "@/models/category";
import { TypeProduct } from "@/models/model";
import categoryApi from "@/services/categoryApi";
import sanphamApi from "@/services/productApi";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Select,
} from "antd";
import { useEffect, useState } from "react";

interface Props {
  onClose: () => void;
  product: TypeProduct;
}

const EditModal = ({ onClose, product }: Props) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  console.log("🚀 ~ EditModal ~ product:", product);

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

  const handleFinish = async (values: any) => {
    try {
      const updatedValues = {
        ...values,
        categoryName: values.categoryName,
      };
      console.log("🚀 ~ handleFinish ~ updatedValues:", updatedValues);
      await sanphamApi.update(product._id, updatedValues);

      notification.success({
        message: "Product Updated",
        description: "The product was updated successfully.",
      });

      onClose();
    } catch (error) {
      notification.error({
        message: "Update Failed",
        description:
          "There was an error updating the product. Please try again.",
      });
    }
  };

  return (
    <Modal title="Edit Product" open footer={[]} onCancel={onClose}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={product}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input product title!" }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please input product description!" },
          ]}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input product price!" }]}>
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </Form.Item>

        <Form.Item
          label="Image Link"
          name="linkImg"
          rules={[{ required: true, message: "Please input image URL!" }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Category"
          name="categoryName"
          rules={[{ required: true, message: "Please select a category!" }]}>
          <Select
            placeholder="Select a category"
            loading={loading}
            options={categories.map((category) => ({
              value: category.name,
              label: category.name,
            }))}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={onClose}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
