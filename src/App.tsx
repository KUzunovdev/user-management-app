import { useState } from "react";
import UserTable from "./components/UserTable";
import UserModal from "./components/UserModal";
import { User } from "./types/User";
import { notification } from "antd";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [api, contextHolder] = notification.useNotification();

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (data: Partial<User>) => {
    
    api.success({
      message: "Information Updated",
      description:
        "Your information has been successfully updated! Thank you for keeping your details current.",
      placement: "top",
      duration: 3,
    });
  
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-start py-10 px-4">
    <div className="w-full max-w-6xl">
      {contextHolder}
      <UserTable onEditUser={handleEditUser} />

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
