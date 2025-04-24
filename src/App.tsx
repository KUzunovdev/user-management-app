import { useState, useEffect } from "react";
import UserTable from "./components/UserTable";
import UserModal from "./components/UserModal";
import { User } from "./types/User";
import { Button, notification } from "antd";
import { deleteUser, getUsers, updateUser, createUser } from "./api/userApi";
import { UserAddOutlined } from "@ant-design/icons";


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
};

  

  

  return (
    <div className="min-h-screen flex justify-center items-start py-10 px-4">
    <div className="w-full max-w-6xl">
    <div className="flex items-center justify-between mb-4">
  <h1 className="text-2xl font-semibold">User Information</h1>
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
        open={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        initialValues={selectedUser}
      />
    </div>
  </div>
  );
}

export default App;
