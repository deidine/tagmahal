import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACK_END_URL } from "../../constant"; 
import AdminMenu from "./AdminMenu";
const AllCarts = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await axios.get(`${BACK_END_URL}/cart/allCarts`);
        setCarts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCarts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching carts: {error.message}</p>;

  return (
    <div className="container mt-2 mb-3">
    <div className="row">
      <div className="col-md-3">
        <AdminMenu />
      </div>
      <div className="col-lg-9 col-md-12">
        <h2 className="text-center fw-bold text-dark-emphasis mb-4">
          All Users
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
                    {/* <th scope="col">Product Name</th> */}
                    <th scope="col">Quantity</th>
                    <th scope="col">Amount</th>
                
                  </tr>
                </thead>
                <tbody>
                  {carts.map((cart) =>
                    cart.cartDetalis.map((detail, index) => (
                      <tr key={index} className="text-center">
                        {index === 0 && (
                          <>
                            <td rowSpan={cart.cartDetalis.length}>{cart.id}</td>
                            <td rowSpan={cart.cartDetalis.length}>
                              {cart.totalAmount}
                            </td>
                          </>
                        )}
                        {/* <td>{detail.products.productName}</td> */}
                        <td>{detail.quantity}</td>
                        <td>{detail.amount}</td>
                    
                      </tr>
                    ))
                  )}
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
