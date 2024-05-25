import React, { useState } from "react";
import { Header } from "../Component/Header";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Assurez-vous d'importer le CSS
import { BACK_END_URL } from "../constant";
import { Form, Input, Button, Card } from 'antd';

export const Singup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const onToast = (message, type) => {
    toast[type](message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleSignup = async (values) => {
    if (values.password === values.confirmPassword) {
      try {
        const res = await fetch(BACK_END_URL + "/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (res.ok) {
          const data = await res.json();
          onToast("Inscription réussie !!", "success");
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
        } else {
          const errorData = await res.json();
          onToast(errorData.message || "Quelque chose s'est mal passé !!", "error");
        }
      } catch (error) {
        onToast("Quelque chose s'est mal passé !!", "error");
      }
    } else {
      onToast("Les mots de passe ne correspondent pas !!", "error");
    }
  };

  return (
    <>
      <Header />
      
      <div className="d-flex flex-column justify-content-center align-items-center" id="signup-box">
        <Card style={{ width: 'auto', padding: '20px', marginTop: '20px' }}>
          <h4 className="card-title text-center">Créer un compte</h4>
          <Form
            layout="vertical"
            onFinish={handleSignup}
            initialValues={user}
          >
            <Form.Item
              label="Nom"
              name="name"
              rules={[{ required: true, message: 'Veuillez entrer votre nom', min: 6 }]}
            >
              <Input
                placeholder="Nom"
                  style={{
                  fontSize:"20px",
fontFamily:"monospace",
                  width:"300px",
                  height:"40px"

                }}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                value={user.name}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Veuillez entrer votre email', type: 'email', min: 6 }]}
            >
              <Input
                placeholder="Email"
                  style={{
                  fontSize:"20px",
fontFamily:"monospace",
                  width:"300px",
                  height:"40px"

                }}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                value={user.email}
              />
            </Form.Item>
            <Form.Item
              label="Telephone"
              name="phone"
              rules={[{ required: true, message: 'Veuillez entrer votre numéro de téléphone', min: 8 }]}
            >
              <Input
                placeholder="Téléphone"
                  style={{
                  fontSize:"20px",
fontFamily:"monospace",
                  width:"300px",
                  height:"40px"

                }}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                value={user.phone}
              />
            </Form.Item>
            <Form.Item
              label="Mot de passe"
              name="password"
              rules={[{ required: true, message: 'Veuillez entrer votre mot de passe', min: 6 }]}
            >
              <Input.Password
                placeholder="Mot de passe"
                  style={{
                  fontSize:"20px",
fontFamily:"monospace",
                  width:"300px",
                  height:"40px"

                }}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                value={user.password}
              />
            </Form.Item>
            <Form.Item
              label="Confirmer le mot de passe"
              name="confirmPassword"
              rules={[{ required: true, message: 'Veuillez confirmer votre mot de passe', min: 6 }]}
            >
              <Input.Password
                style={{
                  fontSize:"20px",
fontFamily:"monospace",
                  width:"300px",
                  height:"40px"

                }}
                placeholder="Confirmer le mot de passe"
                onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                value={user.confirmPassword}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" 
                style={{
                  fontSize:"20px",
fontFamily:"monospace",
                  width:"300px",
                  height:"40px"

                }}className="w-100">
                S'inscrire
              </Button>
            </Form.Item>
          </Form>
          <div className="d-flex justify-content-between mt-3">
            <a href="#" className="small"><h4>Mot de passe oublié ?</h4></a>
            <a href="/login" className="small"><h4>Se connecter</h4></a>
          </div>
        </Card>

       </div>
    </>
  );
};
