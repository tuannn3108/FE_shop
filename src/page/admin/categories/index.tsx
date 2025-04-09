import { Category } from "@/models/category";
import categoryApi from "@/services/categoryApi";
import { Button, Card, notification, Popconfirm, Space, Table } from "antd";
import { useEffect, useState } from "react";
import AddCategoryModal from "./add-category";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import EditModal from "./edit-modal";
const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<{
    data: Category;
    modalOpen: boolean;
  } | null>(null);
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

  const handleDelete = async (id: number | string) => {
    try {
      await categoryApi.delete(id);
      fetchCategories();
      notification.success({ message: "delete category" });
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory({ data: category, modalOpen: true });
  };

  const columns = [
    {
      title: "No",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: Category, index: number) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Category) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Delete this category?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No">
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      {isModalOpen && (
        <AddCategoryModal onClose={() => setIsModalOpen(false)} />
      )}

      {editingCategory && (
        <EditModal
          category={editingCategory.data}
          onClose={() => setEditingCategory(null)}
        />
      )}

      <Card title="Category">
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <Button
            type="primary"
            children="Add Category"
            onClick={() => setIsModalOpen(true)}
          />
          <Table
            loading={loading}
            dataSource={categories}
            columns={columns}
            rowKey="id"
          />
        </Space>
      </Card>
    </>
  );
};

export default CategoriesPage;
