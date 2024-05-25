import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AdminMenu from "./AdminMenu";
import { useSelector, useDispatch } from "react-redux";
import { FaEnvelope, FaPhone, FaEdit, FaMapMarkerAlt } from "react-icons/fa";
import { Modal, Button, Form, Input } from "antd";
import adminImage from "../../assets/img/admin-avtar.png";
import { updateAdminDetails } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { BACK_END_URL } from "../../constant";
import JournalStock from "./stock/JournalStock"
const AdminDashboard = () => {
  
  const auth = useSelector((state) => state.auth.user);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  
  const showModal = () => {
    setVisible(true);
  };
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div> 
        <div className="col-md-9">
          <h1 className="fw-bold text-danger-emphasis mb-4">Admin Profile</h1>
          <div className="row align-items-center">
            <div className="col-md-3">
              <img
                src={adminImage}
                className="img-fluid rounded-circle"
                alt="Admin Avatar"
              />
            </div>
            <div className="col-md-9">
              <h2 className="fw-bold mb-3">
                {sessionStorage.getItem("username")}
              </h2>
              <p className="mb-1">
                <FaEnvelope className="me-2" />{" "}
                {sessionStorage.getItem("email")}
              </p>
              <p className="mb-1">
                <FaPhone className="me-2" /> {sessionStorage.getItem("roles")}
              </p>
              <p className="mb-1">
                <FaMapMarkerAlt className="me-2" /> {auth?.address}
              </p>

              <Button type="primary" onClick={showModal}>
                <FaEdit className="me-2" />
                Edit Profile
              </Button>

              <Button
                type="primary"
                onClick={() => {
                  navigate("/");
                }}
              >
                {/* <FaEdit className="me-2" /> */}
                Retour
              </Button>     <Button
                type="primary"
                onClick={() => {
                  navigate("/admin/journal");
                }}
              >
                {/* <FaEdit className="me-2" /> */}
              Journal Du Stock
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  navigate("/admin/valide-journal");
                }}
              >
                {/* <FaEdit className="me-2" /> */}
           Valider  les Journal Du Stock
              </Button>
                
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
