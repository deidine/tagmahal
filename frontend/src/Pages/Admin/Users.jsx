import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import {BACK_END_URL} from '../../constant'
const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const fetchUsers = async () => {
      try {
        const response = await axios.get(BACK_END_URL+"/auth/users", {
          headers: {
            Authorization: token,
          },
        });
        setUsers(response.data); // Update to response.data
        console.log(response.data); // Make sure to log response.data
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

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
            <table className="table table-striped">
              <thead className="table-dark">
                <tr className="text-center">
                  <th scope="col" style={{ width: "5%" }}>
                    S.No
                  </th>
                  <th scope="col" style={{ width: "15%" }}>
                    Name
                  </th>

                  
                  <th scope="col" style={{ width: "15%" }}>
                    Email
                  </th> 
                  <th scope="col" style={{ width: "15%" }}>
                    changer rolle
                  </th> 
                  
                  <th scope="col" style={{ width: "15%" }}>
                    Action
                  </th> 
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id} className="text-center">
                    <td style={{ width: "5%" }}>{index + 1}</td>
                    <td
                      style={{
                        width: "15%",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {user.name}
                    </td>
                    <td
                      style={{
                        width: "15%",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {user.email}
                    </td>
                   
                   <td>vendeir manager</td>
                   <td>delete</td>
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

export default Users;
