import { Table, Button, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { User } from "../types/User";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { useState } from "react";

const staticUsers: User[] = [
  {
    id: 1,
    name: "Jane Doe",
    username: "jane",
    email: "jane.doe@example.com",
    phone: "+359 123456789",
    website: "www.elektrocode.com",
    company: { name: "Innovatech Dynamics" },
  },
  {
    id: 2,
    name: "John Smith",
    username: "john",
    email: "john.smith@samplemail.com",
    phone: "+359 987654321",
    website: "www.techwavehub.com",
    company: { name: "TechNova Solutions" },
  },
  {
    id: 3,
    name: "Alice Jones",
    username: "alice",
    email: "alice.jones@businessmail.com",
    phone: "+359 456789123",
    website: "www.innovatechworld.com",
    company: { name: "NextGen Technologies" },
  },
  {
    id: 4,
    name: "Bob Brown",
    username: "bob",
    email: "bob.brown@webmail.com",
    phone: "+359 321654987",
    website: "-",
    company: { name: "GreenLeaf Innovations" },
  },
  {
    id: 5,
    name: "Charlie White",
    username: "charlie",
    email: "charlie.white@domain.com",
    phone: "+359 654321789",
    website: "www.digitalview.com",
    company: { name: "BlueSky Enterprises" },
  },
];

const UserTable = () => {

    const [currentPage, setCurrentPage] = useState(1);

  const handleEdit = (record: User) => {
    console.log("Edit user:", record);
  };

  const handleDelete = (id: number) => {
    console.log("Delete user ID:", id);
  };

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
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete the user"
            description="Are you sure you want to delete this user information?"
            onConfirm={() => handleDelete(record.id)}
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
      <h1 className="text-2xl font-semibold mb-4 text-left">User Information</h1>
      <Table
        dataSource={staticUsers}
        columns={columns}
        rowKey="id"
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
