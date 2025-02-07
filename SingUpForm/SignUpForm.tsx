import React, { useState } from "react";
import "./SignUpForm.css";

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  relation: string;
  email: string;
}

interface SignUpFormProps {
  onAddUser: (user: any) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onAddUser }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    relation: "",
    email: "",
  });

  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); 
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.email || !formData.relation) {
      alert("لطفاً تمام فیلدها را پر کنید.");
      return;
    }

    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("لطفاً فقط اعداد برای شماره تماس وارد کنید.");
      return;
    }

    const newUser = { ...formData, id: Date.now() };
    onAddUser(newUser);
    setFormData({ firstName: "", lastName: "", phone: "", email: "", relation: "" });
  };

  return (
    <div className="signup-form">
      <h2>اضافه / ویرایش کاربران</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="نام"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="نام خانوادگی"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="شماره تماس"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        {error && <div className="error">{error}</div>}  {/*               ارور            */}

        <input
          type="text"
          name="relation"
          placeholder="نسبت"
          value={formData.relation}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="ایمیل"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit">اضافه کردن</button>
      </form>
    </div>
  );
};

export default SignUpForm;
