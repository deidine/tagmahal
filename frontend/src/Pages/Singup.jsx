import React, { useState } from "react";
import { Header } from "../Component/Header";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Assurez-vous d'importer le CSS
import { BACK_END_URL } from "../constant";

export const Singup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
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

  const handleSignup = async (e) => {
    e.preventDefault();
    if (user.password === user.confirmPassword) {
      try {
        const res = await fetch(BACK_END_URL + "/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
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
      <ToastContainer />
      <div className="d-flex flex-column justify-content-center align-items-center" id="signup-box">
        <div className="card" style={{ width: '30rem', padding: '20px', marginTop: '20px' }}>
          <div className="card-body">
            <h4 className="card-title text-center">Créer un compte</h4>
            <form onSubmit={handleSignup}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Nom"
                  name="name"
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  value={user.name}
                  required
                  minLength={6}
                />
              </div>
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
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirmer le mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirmer le mot de passe"
                  name="confirmPassword"
                  onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                  value={user.confirmPassword}
                  required
                  minLength={6}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">S'inscrire</button>
            </form>
            <div className="d-flex justify-content-between mt-3">
              <a href="#" className="small">Mot de passe oublié ?</a>
              <a href="/login" className="small">Se connecter</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
