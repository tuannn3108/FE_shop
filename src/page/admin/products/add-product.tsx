import { Category } from "@/models/category";
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
}

const AddProductModal: React.FC<Props> = ({ onClose }) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

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
      await sanphamApi.add(values);

      notification.success({
        message: "Product Created",
        description: "was created successfully.",
      });

      onClose();
      form.resetFields();
    } catch (error) {
      notification.error({
        message: "Creation Failed",
        description: "There was an error creating. Please try again.",
      });
    }
  };
  return (
    <Modal title="Add Product" open footer={[]} onCancel={onClose}>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
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
          name="categoryId"
          rules={[{ required: true, message: "Please select a category!" }]}>
          <Select
            placeholder="Select a category"
            loading={loading}
            options={categories.map((category) => ({
              value: category._id,
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

export default AddProductModal;
