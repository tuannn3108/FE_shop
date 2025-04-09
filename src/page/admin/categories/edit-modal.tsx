import { Modal, Form, Input, message } from "antd";
import { Category } from "@/models/category";
import categoryApi from "@/services/categoryApi";

interface Props {
  onClose: () => void;
  category: Category;
}

const EditModal = ({ onClose, category }: Props) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: {
    name: string;
    description: string;
  }) => {
    try {
      await categoryApi.update(category._id, values);
      message.success("Category updated successfully");
      onClose();
    } catch (error) {
      console.error("Failed to update category:", error);
      message.error("Failed to update category");
    }
  };

  return (
    <Modal
      open
      title="Edit Category"
      okText="Save"
      onCancel={onClose}
      onOk={() => form.submit()}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={category}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter category name" }]}>
          <Input size="small" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
