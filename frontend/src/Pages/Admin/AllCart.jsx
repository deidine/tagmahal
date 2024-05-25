import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACK_END_URL } from "../../constant";
import AdminMenu from "./AdminMenu";
import { useNavigate } from "react-router-dom";

const AllCarts = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await axios.get(`${BACK_END_URL}/cart/allCarts`);
        const cartsWithItems = response.data.filter(
          (cart) => cart.cartDetalis.length > 0
        );
        setCarts(cartsWithItems);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCarts();
  }, []);

  if (loading) return( <p>
    <div className="container mt-2 mb-3">
      <div className="row">
   <div className="col-md-3">
          <AdminMenu />
        </div>Loading...</div></div>
  </p>);
  if (error) return <p>Error fetching carts: {error.message}</p>;

  const handleCreateOrder = (cart) => {
    navigate("/admin/create-order", { state: { cart } });
  };

  return (
    <div className="container mt-2 mb-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-lg-9 col-md-12">
          <h2 className="text-center fw-bold text-dark-emphasis mb-4">
            All Carts
          </h2>
          <div className="overflow-scroll users-data-container">
            {carts.length === 0 ? (
              <p>No carts available</p>
            ) : (
              <table className="table table-striped">
                <thead className="table-dark">
                  <tr className="text-center">
                    <th scope="col">Cart ID</th>
                    <th scope="col">Total Amount</th>
                    <th scope="col">User Email</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Manage Order</th>
                  </tr>
                </thead>
                <tbody>
                  {carts.map((cart, index) => (
                    <tr key={index} className="text-center">
                      <td>{cart.id}</td>
                      <td>{cart.totalAmount}</td>
                      <td>{cart.user.email}</td>
                      <td>{cart.user.name}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleCreateOrder(cart)}
                        >
                          Vender l'order
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCarts;
