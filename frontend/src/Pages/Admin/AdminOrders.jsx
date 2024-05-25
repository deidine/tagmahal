import {BACK_END_URL} from '../../constant'
import { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "./AdminMenu";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => { 
  const [orders, setOrders] = useState([]);
  const getAllOrders = async () => {
    try {
      const authToken = sessionStorage.getItem("token") ;
      const { data } = await axios.get(BACK_END_URL+"/orders", {
        headers: {
          Authorization:"Bearer "+ authToken,
        },
      });
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { 
      getAllOrders();
    
  }, []);

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-3"> 
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h2 className="text-center fw-bold text-dark-emphasis">All Orders</h2>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="table-dark">
                <tr className="text-center">
                  <th scope="col">S.No</th>
                  <th scope="col">Status</th>
                  <th scope="col">Buyer</th>
                  <th scope="col">Date</th>
                  <th scope="col">Payment Status</th>
                  <th scope="col">Quantity</th> 
                </tr>
              </thead>
              <tbody>
                {orders?.map((order, index) => (
                  <tr key={index} className="text-center">
                    <td>{index + 1}</td>
                    <td>
                    {order?.orderStatus}
                    </td>
                    <td>{order?.userId}</td>
                    <td>{ new Date(order?.orderDate).toLocaleDateString()}
            
                    </td> 
                    <td>
                      {order?.orderStatus ? (
                        <span
                          // className={
                          //   "rounded px-2 py-1 " +
                          //   (order?.orderStatus
                          //     ? "text-white bg-success"
                          //     : "text-white bg-danger")
                          // }
                        >
                          {order?.orderStatus }

                          {/* {order?.orderStatus ? "Success" : "Failed"} */}
                        </span>
                      ) : (
                        ""
                      )}
                    </td>
                    <td>{order?.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
