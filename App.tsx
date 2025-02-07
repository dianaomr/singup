import React, { useState } from "react";
import Header from "./components/Headers/Header";
import SignUpForm from "./components/SingUpForm/SignUpForm";
import UserList from "./components/UserList/UserList";  
import './App.css';

interface Data {
  title: string;
  backgroundImage: string;
  showCTA: boolean;
}

const App: React.FC = () => {
  const data: Data = {
    title: "وب اپلیکیشن مدیریت مخاطبین",
    backgroundImage: "https://images.pexels.com/photos/2131293/pexels-photo-2131293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    showCTA: true,
  };

  const [users, setUsers] = useState<any[]>([]);  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const handleAddUser = (user: any) => {
    setUsers([...users, user]);
  };

  // const handleEditUser = (user: any) => {
  // };

  // const handleDeleteUser = (user: any) => {
  //   setUsers(users.filter((u) => u.id !== user.id));
  // };

  return (
    <div
      className="container mx-auto px-4"
      style={{
        backgroundImage: `url(${data.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Header title={data.title}  />
      <div className="all">
        <div className="right">
          <UserList users={users} setUsers={setUsers} />
        </div>
        <div>
          <SignUpForm onAddUser={handleAddUser} />
        </div>
      </div>
    </div>
  );
};

export default App;
