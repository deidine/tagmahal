import React, { useState } from "react";
import { Header } from "../Component/Header";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure you import the CSS
 
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
        const res = await fetch("http://localhost:8080/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        if (res.ok) {
          const data = await res.json();
          onToast("Signup Successful!!", "success");
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
        } else {
          const errorData = await res.json();
          onToast(errorData.message || "Something went wrong!!", "error");
        }
      } catch (error) {
        onToast("Something went wrong!!", "error");
      }
    } else {
      onToast("Passwords do not match!!", "error");
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="d-flex flex-column justify-content-center" id="login-box">
        <div className="login-box-header">
          <h4
            style={{
              color: "rgb(139,139,139)",
              marginBottom: 0,
              fontWeight: 400,
              fontSize: 27,
            }}
          >
            Create an Account
          </h4>
        </div>
        <div className="login-box-content">
          <div className="fb-login box-shadow">
            <a
              className="d-flex flex-row align-items-center social-login-link"
              href="#"
            >
              <i
                className="fa fa-facebook"
                style={{
                  marginLeft: 0,
                  paddingRight: 20,
                  paddingLeft: 22,
                  width: 56,
                }}
              />
              Login with Facebook
            </a>
          </div>
          <div className="gp-login box-shadow">
            <a
              className="d-flex flex-row align-items-center social-login-link"
              style={{ marginBottom: 10 }}
              href="#"
            >
              <i
                className="fa fa-google"
                style={{ color: "rgb(255,255,255)", width: 56 }}
              />
              Login with Google+
            </a>
          </div>
        </div>
        <div className="d-flex flex-row align-items-center login-box-seperator-container">
          <div className="login-box-seperator" />
          <div className="login-box-seperator-text">
            <p
              style={{
                marginBottom: 0,
                paddingLeft: 10,
                paddingRight: 10,
                fontWeight: 400,
                color: "rgb(201,201,201)",
              }}
            >
              or
            </p>
          </div>
          <div className="login-box-seperator" />
        </div>
        <div className="email-login" style={{ backgroundColor: "#ffffff" }}>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              className="email-input form-control"
              style={{ marginTop: 10 }}
              required
              placeholder="Name"
              name="name"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              value={user.name}
              minLength={6}
            />
            <input
              type="email"
              className="email-input form-control"
              style={{ marginTop: 10 }}
              required
              placeholder="Email"
              name="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              value={user.email}
              minLength={6}
            />
            <input
              type="password"
              className="password-input form-control"
              style={{ marginTop: 10 }}
              required
              placeholder="Password"
              name="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              value={user.password}
              minLength={6}
            />
            <input
              type="password"
              className="password-input form-control"
              style={{ marginTop: 10 }}
              required
              placeholder="Confirm Password"
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              value={user.confirmPassword}
              name="confirmPassword"
              minLength={6}
            />
            <div className="submit-row" style={{ marginBottom: 0, paddingTop: 0 }}>
              <button
                className="btn btn-primary d-block box-shadow w-100"
                id="submit-id-submit"
                type="submit"
              >
                Sign Up
              </button>
              <div className="d-flex justify-content-between">
                <div
                  className="form-check form-check-inline"
                  id="form-check-rememberMe"
                ></div>
                <a id="forgot-password-link" href="#">
                  Forgot Password?
                </a>
              </div>
            </div>
          </form>
        </div>
        <div
          id="login-box-footer"
          style={{ padding: "10px 20px", paddingBottom: 23, paddingTop: 5 }}
        >
          <p style={{ marginBottom: 0 }}>
            Already have an account?
            <a id="register-link" href="/login">
              Sign In!
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
