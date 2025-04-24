import { Table, Button, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { User } from "../types/User";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { useState } from "react";



interface UserTableProps {
  data: User[];
  loading: boolean;
  onEditUser: (user: User) => void;
  onDeleteUser: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ data, loading, onEditUser, onDeleteUser }) => {


    const [currentPage, setCurrentPage] = useState(1);


  const columns: ColumnsType<User> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text) => (
        <a href={`mailto:${text}`} className="text-blue-500">
          {text}
        </a>
      ),
    },
    {
      title: "Company Name",
      dataIndex: ["company", "name"],
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
    },
    {
      title: "Website",
      dataIndex: "website",
    },
    {
      title: "Settings",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            icon={<EditFilled />}
            onClick={() => onEditUser(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete the user"
            description="Are you sure you want to delete this user information?"
            onConfirm={() => onDeleteUser(record.id)}
            okText="Yes"
            cancelText="No"
            arrow={{ pointAtCenter: true }}
            placement="bottom"
          >
            <Button type="primary" danger icon={<DeleteFilled />}>
            Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 5,
          current: currentPage,
          onChange: setCurrentPage,
          position: ["bottomCenter"],
          itemRender: (page, type, originalElement) => {
            if (type === "prev") {
              return <a>Previous</a>;
            }
            if (type === "next") {
              return <a>Next</a>;
            }
            return originalElement;
          },
        }}
      />
    </div>
  );
};

export default UserTable;
