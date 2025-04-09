import { TypeUserTable } from "@/models/model";
import usersApi from "@/services/users";
import { Button, Card, notification, Popconfirm, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";

const UsersPage = () => {
  const [data, setData] = useState<TypeUserTable[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await usersApi.getAll({ page: 1, limit: 10 });
      setData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await usersApi.remove(id);
      fetchUsers();
      notification.success({ message: "delete success" });
    } catch (error) {
      console.error("Failed to delete :", error);
    }
  };

  const columns: ColumnsType<TypeUserTable> = [
    {
      title: "No",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: TypeUserTable, index: number) => index + 1,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Roles",
      dataIndex: "role",
      key: "role",
      render: (roles: string[]) => roles.join(", "),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) => (status ? "Active" : "Inactive"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Popconfirm
            title="Delete this user?"
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
      <Card title="UsersPage">
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <Table
            loading={loading}
            dataSource={data}
            columns={columns}
            rowKey="id"
          />
        </Space>
      </Card>
    </>
  );
};

export default UsersPage;
