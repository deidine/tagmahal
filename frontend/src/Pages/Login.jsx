import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Footer } from '../Component/Footer'
import { Header } from '../Component/Header'
import { toast } from 'react-toastify';
import {BACK_END_URL} from '../constant'

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
    e.preventDefault();
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
        <div className="card" style={{ width: '30rem', padding: '20px', marginTop: '20px' }}>
          <div className="card-body">
            <h4 className="card-title text-center">Connexion</h4>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  name="email"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  value={user.email}
                  required
                  minLength={6}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Mot de passe"
                  name="password"
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  value={user.password}
                  required
                  minLength={6}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Connexion</button>
            </form>
            <div className="d-flex justify-content-between mt-3">
              <a href="#" className="small">Mot de passe oublié ?</a>
              <a href="/singup" className="small">Créer un compte</a>
            </div>
          </div>
        </div>
      </div>
 
    </>
  );
}
