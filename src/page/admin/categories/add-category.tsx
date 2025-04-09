import categoryApi from "@/services/categoryApi";
import { Button, Form, Input, Modal, notification } from "antd";

interface Props {
  onClose: () => void;
}

const AddCategoryModal: React.FC<Props> = ({ onClose }) => {
  const [form] = Form.useForm();

  const handleFinish = async (values: any) => {
    try {
      await categoryApi.create(values);

      notification.success({
        message: "Category Created",
        description: "The category was created successfully.",
      });

      onClose();
      form.resetFields();
    } catch (error) {
      notification.error({
        message: "Category Creation Failed",
        description:
          "There was an error creating the category. Please try again.",
      });
    }
  };
  return (
    <Modal title="Add Category" open footer={[]}>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Category Name"
          name="name"
          rules={[
            { required: true, message: "Please input the category name!" },
          ]}>
          <Input />
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

export default AddCategoryModal;
