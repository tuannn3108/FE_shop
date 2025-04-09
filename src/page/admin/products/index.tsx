import { TypeProduct } from "@/models/model";
import sanphamApi from "@/services/productApi";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, notification, Popconfirm, Space, Table } from "antd";
import { useEffect, useState } from "react";
import AddProductModal from "./add-product";
import EditModal from "./edit-modal";
const ProductsPage = () => {
  const [data, setData] = useState<TypeProduct[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<{
    data: TypeProduct;
    modalOpen: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const fetchProducts = async (page = 1, pageSize = 5) => {
    setLoading(true);
    try {
      const response = await sanphamApi.getAll({ page, limit: pageSize });
      setData(response.data.data.data);
      setPagination({
        current: page,
        pageSize,
        total: response.data.data.pagination?.total || 0,
      });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1, 5);
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await sanphamApi.remove(id);
      fetchProducts(1, 5);
      notification.success({ message: "delete category" });
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const handleEdit = (data: TypeProduct) => {
    setEditing({ data: data, modalOpen: true });
  };

  const handleTableChange = (pagination: any) => {
    fetchProducts(pagination.current, pagination.pageSize);
  };

  const columns = [
    {
      title: "No",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Image",
      dataIndex: "linkImg",
      key: "linkImg",
      render: (linkImg: string) => (
        <img
          src={linkImg}
          alt="product"
          style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8 }}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Category",
      dataIndex: ["category", "name"],
      key: "category",
      render: (name: string) => name || "No category",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Delete this product?"
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
      {isModalOpen && <AddProductModal onClose={() => setIsModalOpen(false)} />}

      {editing && (
        <EditModal product={editing.data} onClose={() => setEditing(null)} />
      )}

      <Card title="Products">
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <Button
            type="primary"
            children="Add Product"
            onClick={() => setIsModalOpen(true)}
          />
          <Table
            loading={loading}
            dataSource={data}
            columns={columns}
            rowKey="_id"
            pagination={pagination}
            onChange={handleTableChange}
          />
        </Space>
      </Card>
    </>
  );
};

export default ProductsPage;
