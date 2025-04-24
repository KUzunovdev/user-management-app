import { Modal, Form, Input, Button, Select } from "antd";
import { EditFilled } from "@ant-design/icons";
import { User } from "../types/User";
import { useEffect } from "react";
import { UserAddOutlined } from "@ant-design/icons";
const { Option } = Select;

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Partial<User>) => void;
  initialValues?: User | null;
  mode: "create" | "edit";
}

const UserModal: React.FC<UserModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialValues,
  mode,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (mode === "edit" && initialValues) {
      form.setFieldsValue(initialValues);
    } else if (mode === "create") {
      form.resetFields();
    }
  }, [initialValues, mode, form]);
  



  const handleFinish = (values: Partial<User>) => {
    onSubmit(values);
  };



  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={false}
      centered
      style={{ maxWidth: 600, padding : 20 }}
    >
      <div className="flex flex-col items-center justify-center text-center mb-4">
      {mode === "edit" ? (
  <EditFilled style={{ fontSize: 56, color: "#1677FF" }} />
) : (
  <UserAddOutlined style={{ fontSize: 56, color: "#1677FF" }} />
)}

<h2 className="text-2xl font-bold mt-2">
  {mode === "edit" ? "Edit User Information" : "Create New User"}
</h2>

<p className="text-gray-500 text-sm">
  {mode === "edit"
    ? "Here, you can update your name, email address, and other information."
    : "Fill out the form to add a new user to the system."}
</p>

      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={initialValues || {}}
      >
        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true, message: "Please enter the full name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please enter the username" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter the email" },
            { type: "email", message: "Enter a valid email address" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Phone (optional)" name="phone">
          <Input
            addonBefore={
              <Select defaultValue="+48" style={{ width: 80 }}>
                <Option value="+48">+48</Option>
              </Select>
            }
          />
        </Form.Item>

        <Form.Item
          label="Website (optional)"
          name="website"
          rules={[
            {
              validator: (_, value) => {
                if (
                  !value ||
                  /^https?:\/\/|www\./.test(value) ||
                  /^[a-zA-Z0-9.-]+\.[a-z]{2,}$/.test(value)
                ) {
                  return Promise.resolve();
                }
                return Promise.reject("Enter a valid URL");
              },
            },
          ]}
        >
          <Input />
        </Form.Item>

        <div className="flex gap-2 pt-2">
          <Button onClick={onClose} block style={{ flex: 1, height: 40 }}>
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{ flex: 1, height: 40 }}
          >
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UserModal;
