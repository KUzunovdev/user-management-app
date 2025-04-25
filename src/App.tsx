import { useState, useEffect } from "react";
import UserTable from "./components/UserTable";
import UserModal from "./components/UserModal";
import { User } from "./types/User";
import { Button, notification, Typography } from "antd";
import { deleteUser, getUsers, updateUser, createUser } from "./api/userApi";
import { UserAddOutlined } from "@ant-design/icons";

const { Title } = Typography;


function App() {
  
  
  
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [api, contextHolder] = notification.useNotification();
  

  //Modal controls
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };


  // Get users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Fetch failed:", error);
        notification.error({
          message: "Error",
          description: "Failed to fetch users.",
          placement: "top",
        });
      } finally {
        setLoading(false);
      }
    };
  
    fetchUsers();
  }, []);
  


  // Delete user
  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers(prev => prev.filter(user => user.id !== id));
  
      api.success({
        message: "User Deleted",
        description: "User has been removed successfully.",
        placement: "top",
      });
    } catch (error) {
      console.error("Delete failed:", error);
      api.error({
        message: "Error",
        description: "Failed to delete user.",
        placement: "top",
      });
    }
  };
  
 // Update & Create user
 const handleModalSubmit = async (data: Partial<User>) => {
  if (selectedUser) {
    // Edit mode
    try {
      await updateUser(selectedUser.id, data);
      setUsers(prev =>
        prev.map(user =>
          user.id === selectedUser.id ? { ...user, ...data } : user
        )
      );

      api.success({
        message: "Information Updated",
        description:
          "Your information has been successfully updated! Thank you for keeping your details current.",
        placement: "top",
      });
    } catch {
      api.error({
        message: "Error",
        description: "Failed to update user.",
        placement: "top",
      });
    }
  } else {
    //  Create mode
    try {
      await createUser(data); 

      const newUser: User = {
        id: Math.floor(Math.random() * 10000), 
        name: data.name || "",
        username: data.username || "",
        email: data.email || "",
        phone: data.phone || "",
        website: data.website || "",
        company: { name: "New Company" }, // Default since in the edit form this does not exist
      };

      setUsers(prev => [...prev, newUser]);

      api.success({
        message: "User Created",
        description: "A new user has been added successfully.",
        placement: "top",
      });
    } catch {
      api.error({
        message: "Error",
        description: "Failed to create user.",
        placement: "top",
      });
    }
  }

  setIsModalOpen(false);
  setSelectedUser(null);
};

  

  

  return (
    <div className="min-h-screen flex justify-center items-center py-10 px-4">
    <div className="w-full px-20">
    <div className="flex items-center justify-between mb-2 px-8">
    <Title level={2}>User Information</Title>
    <Button
      type="primary"
      icon={<UserAddOutlined />}
      onClick={() => {
        setSelectedUser(null);
        setIsModalOpen(true);
      }}
    >
      Create new User
    </Button>
</div>

      {contextHolder}
      <UserTable
        data={users}
        loading={loading}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
      />


      <UserModal
        key={selectedUser ? `edit-${selectedUser.id}` : "create"}
        open={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        initialValues={selectedUser}
        mode={selectedUser ? "edit" : "create"}
      />
    </div>
  </div>
  );
}

export default App;
