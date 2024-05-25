import React, { useState } from "react";
import { Modal, Button } from "antd"; // Importation de Modal et Button depuis Ant Design
import { useLocation, useNavigate } from "react-router-dom"; // Importation de useLocation
import AdminMenu from "./AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { BACK_END_URL } from "../../constant";
import { Select } from "antd";
const { Option } = Select;
 
const CreateOrder = () => {
  const location = useLocation(); // Initialisation de useLocation
  const { cart } = location.state || {}; // Obtention des données du panier depuis l'état
  const [paymentStatus, setPaymentStatus] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [userId, setUserId] = useState(sessionStorage.getItem("user_id"));
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [orderStatus, setOrderStatus] = useState("Not Process");
  const [modalVisible, setModalVisible] = useState(false); // État pour la visibilité du modal
  const navigate = useNavigate();

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        orderStatus,
        paymentStatus,
        quantity,
        userId,
        date: new Date(),
         
      };

      const { data } = await axios.post(`${BACK_END_URL}/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });
     await axios.delete(`${BACK_END_URL}/orders/${cart.user.email}`,  {
        headers: { Authorization: `Bearer ${token}` },
      });
    
      if (data) {
        toast.success("Commande créée avec succès !");
        navigate("/admin/");
      } else {
        toast.error("Échec de la création de la commande");
      }
    } catch (error) {
      console.log(error);
      toast.error("Quelque chose s'est mal passé !");
    }
  };

  return (
    <div className="container my-2">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 d-flex align-items-center justify-content-center flex-column">
          <h1 className="w-100 mt-0 mb-3 fw-bold text-dark-emphasis">
            Créer une commande
           lorsque vous appuyez sur Entrée, le panier et les détails de la carte doivent être supprimés de la base de données

          </h1>
          <div className="w-100 m-1 create-order-div w-75">
       
            <div className="mb-3">
            <button onClick={() => setModalVisible(true)} style={{background:"blue",
            border:"solid",
            borderRadius:"12px",
             marginLeft:"100px",
            padding:"12px",
            color:"white"}}>Afficher les infos du panier</button>
              <label htmlFor="orderStatus" className="form-label fw-bold">
                Statut de la commande :
              </label>
              <Select
                key={1}
                onChange={(value) => setOrderStatus(value)}
                defaultValue="Not Process"
                variant="borderless"
                className="form-control fw-bold"
              >
                {[
                  { value: "Not Process", color: "gray" },
                  { value: "Processing", color: "orange" },
                  { value: "Shipped", color: "blue" },
                  { value: "Delivered", color: "green" },
                  { value: "Cancelled", color: "red" },
                ].map((statusValue, index) => (
                  <Option
                    key={index}
                    value={statusValue.value}
                    style={{ color: statusValue.color }}
                  >
                    {statusValue.value}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="mb-3">
              <label htmlFor="paymentStatus" className="form-label fw-bold">
                Statut du paiement :
              </label>
              <Select
                className="form-control fw-bold"
                onChange={(value) => setPaymentStatus(value)}
                defaultValue="bankily"
                variant="borderless"
              >
                <Option value="bankily">bankily</Option>
                <Option value="masrify">masrify</Option>
                <Option value="sadad">sadad</Option>
              </Select>
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label fw-bold">
                Quantité :
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Entrez la quantité"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </div>
            <button
              className="btn btn-primary w-100"
              onClick={handleCreateOrder}
            >
              Créer une commande
            </button>
          </div>
        </div>
      </div>

      {/* Modal pour afficher les informations du panier */}
      <Modal
        title="Informations sur le panier"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Fermer
          </Button>,
        ]}
      >
        {/* Informations sur le panier */}
        <p><strong>ID du panier :</strong> {cart.id}</p>
        <p><strong>Nom du client :</strong> {cart.user.name}</p>
        <p><strong>Nom du client :</strong> {cart.user.email}</p>
        <p><strong>Montant total :</strong> {cart.totalAmount}</p>
        {/* Afficher les produits */}
        <h5>Produits :</h5>
        <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
          <ul className="list-group">
            {cart.cartDetalis.map((detail, index) => (
              <li key={index} className="list-group-item">
              Nom du produit :  {detail.products.productName}
                <p><strong>Quantité :</strong> {detail.quantity}</p>
            <p><strong>Montant :</strong> {detail.amount}</p>
         
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </div>
  );   
};

export default CreateOrder;
