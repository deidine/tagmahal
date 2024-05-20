import { useState } from "react";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";

const CreateOrder = () => {
  const [orderStatus, setOrderStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [userId, setBuyerId] = useState(sessionStorage.getItem("user_id"));
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [productIds, setProductId] = useState(1);

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        orderStatus,
        paymentStatus,
        quantity,
        userId,
        productIds,
        date: new Date(),
      };

      const { data } = await axios.post(
        "http://localhost:8080/orders",
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data) {
        toast.success("Order Created Successfully!");
        // navigate("/dashboard/admin/orders");
      } else {
        toast.error("Failed to create order");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <div className="container my-2">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 d-flex align-items-center justify-content-center flex-column">
          <h1 className="w-100 mt-0 mb-3 fw-bold text-dark-emphasis">Create Order</h1>
          <div className="w-100 m-1 create-order-div w-75">
            <div className="mb-3">
              <label htmlFor="orderStatus" className="form-label fw-bold">
                Order Status:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Order Status"
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="paymentStatus" className="form-label fw-bold">
                Payment Status:
              </label>
              <select
                className="form-control"
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
              >
                <option value="">Select Payment Status</option>
                <option value="bankily">bankily</option>
                <option value="masrify">masrify</option>
                <option value="sada">sada</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label fw-bold">
                Quantity:
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </div>
            <button
              className="btn btn-primary w-100"
              onClick={handleCreateOrder}
            >
              Create Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
