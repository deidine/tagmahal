import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Footer } from '../Component/Footer';
import { Header } from '../Component/Header';
import { toast } from 'react-toastify';
import {BACK_END_URL} from '../constant';
import { Form, Input, Button, Card, Typography } from 'antd';

const { Title, Link } = Typography;

export const Login = () => {
  const navigate = useNavigate();

  const onToast = (message) => {
    if ('Connexion réussie !' === message) {
      toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    // e.preventDefault();
    const res = await fetch(BACK_END_URL+"/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    
    const data = await res.json();

    if (res.status === 200) {
      sessionStorage.setItem("token", data.accessToken);
      sessionStorage.setItem("email", data.email);
      sessionStorage.setItem("username", data.username);
      sessionStorage.setItem("user_id", data.id);
      sessionStorage.setItem("roles", data.roles);
      onToast('Connexion réussie !');
      navigate('/');
    } else {
      onToast("Identifiants invalides");
    }
  };

  return (
    <>
      <Header />
      <div className="d-flex flex-column justify-content-center align-items-center" id="login-box">
        <Card style={{ width: 'auto', padding: '20px', marginTop: '20px' }}>
          <Title level={4} className="text-center">Connexion</Title>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={handleLogin}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Veuillez entrer votre email!' },
                { type: 'email', message: 'Veuillez entrer un email valide!' },
              ]}
            >
              <Input
                placeholder="Email"
                style={{
                  fontSize:"20px",
fontFamily:"monospace",
                  width:"300px",
                  height:"40px"

                }}
                type='email'
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                value={user.email}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Veuillez entrer votre mot de passe!' },
                { min: 6, message: 'Le mot de passe doit contenir au moins 6 caractères!' },
              ]}
            >
              <Input.Password
              style={{
                  fontSize:"16px",
                  width:"300px",
                  height:"40px"
                }}
                placeholder="Mot de passe"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                value={user.password}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-100">
                Connexion
              </Button>
            </Form.Item>
          </Form>
          <div className="d-flex justify-content-between mt-3">
            <Link href="#" className="strong">Mot de passe oublié ?</Link>
            <Link href="/singup" className="strong">Créer un compte</Link>
          </div>
        </Card>
      </div>
    </>
  );
};
