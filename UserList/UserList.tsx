import React, { useState } from "react";
import "./UserList.css";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  relation:string;
  email: string;
}

interface UserListProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserList: React.FC<UserListProps> = ({ users, setUsers }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<'edit' | 'delete' | null>(null);
  const [userToEditOrDelete, setUserToEditOrDelete] = useState<User | null>(null);
  const [formData, setFormData] = useState<User>({
    id: 0,
    firstName: "",
    lastName: "",
    phone: "",
    relation:"",
    email: "",
  });

  ///////////////////////////////////////////////////////  مودال برای ویرایش اطلاعات
  const handleEditModal = (user: User) => {
    setUserToEditOrDelete(user);
    setModalAction('edit');
    setFormData(user);
    setIsModalOpen(true);
  };

  ////////////////////////////////////////////////////////  مودال برای حذف کاربر
  const handleDeleteModal = (user: User) => {
    setUserToEditOrDelete(user);
    setModalAction('delete');
    setIsModalOpen(true);
  };

  //////////////////////////////////////////////////////////////////////  ذخیره تغییرات
  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userToEditOrDelete) {
      const updatedUsers = users.map((user) =>
        user.id === userToEditOrDelete.id ? { ...userToEditOrDelete, ...formData } : user
      );
      setUsers(updatedUsers);
    }
    setIsModalOpen(false);
    setUserToEditOrDelete(null);
  };

  /////////////////////////////////////////////////////// تایید حذف کاربر
  const confirmDelete = () => {
    if (userToEditOrDelete) {
      setUsers(users.filter((user) => user.id !== userToEditOrDelete.id));
    }
    setIsModalOpen(false);
    setUserToEditOrDelete(null);
  };

  const cancelModal = () => {
    setIsModalOpen(false);
    setUserToEditOrDelete(null);
  };

  return (
    <div className="users-list">
      <h1>لیست کاربران</h1>
      {users.length > 0 ? (
        <div className="row">
          {users.map((user) => (
            <div key={user.id} className="card">
              <div className="user-info">
                <p>{user.firstName} {user.lastName}</p>
                <p>{user.phone}</p>
                <p>{user.relation}</p>
                <p>{user.email}</p>
              </div>
              <div className="button-div">
              <button onClick={() => handleEditModal(user)}>ویرایش</button>
              <button onClick={() => handleDeleteModal(user)}>حذف</button>
              </div>
             
            </div>
          ))}
        </div>
      ) : (
        <p>هیچ کاربری وجود ندارد.</p>
      )}

                           {/*       modal           modal              modal        */}
      {isModalOpen && (
<div className="modal">
          <div className="modal-content">
            {modalAction === 'edit' ? (
              <>
                <h3>ویرایش اطلاعات کاربر</h3>
                <form onSubmit={handleEditSubmit}>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="نام"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="نام خانوادگی"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="شماره تماس"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                   <input
                    type="text"
                    name="relation"
                    placeholder="نسب "
                    value={formData.relation}
                    onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="ایمیل"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <button type="submit">ذخیره تغییرات</button>
                </form>
              </>
            ) : (
              <>
                <h3>آیا مطمئن هستید که می‌خواهید این کاربر را حذف کنید؟</h3>
                <div className="modal-actions">
                  <button onClick={confirmDelete}>بله، حذف کن</button>
                  <button onClick={cancelModal}>لغو</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
