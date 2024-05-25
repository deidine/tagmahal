import { Image } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { BACK_END_URL } from "../../constant";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const navigate = useNavigate();

  // DELETE Product Deletion
  const handleDeleteProduct = async (productId) => {
    try {
      const answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (answer) {
        const { data } = await axios.delete(
          `${BACK_END_URL}/product/delete/${productId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (data.success) {
          toast.success(data.msg);
          setProducts(
            products.filter((product) => product.productid !== productId)
          );
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BACK_END_URL}/product/all`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const res = await response.json();
        if (Array.isArray(res)) {
          setProducts(res);
          setFilteredProducts(res);
        } else {
          console.error("Fetched data is not an array", res);
          setProducts([]);
          setFilteredProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fs-2 fw-bold text-dark">All Products List</h3>
            <Link to={`/admin`} className="btn btn-primary">
              Retour
            </Link>
          </div>
          <div className="mb-3">
            <h6 className="text-danger">
              Note: Images may take a moment to load.
            </h6>
          </div>
          <div className="row justify-content-center mb-3">
            <input
              type="text"
              className="form-control w-50"
              placeholder="Search for product..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          {isLoading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "50vh" }}
            >
              <ClipLoader size={50} color={"#123abc"} />
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">selle Price</th>
                    <th scope="col">purcahse Price unit</th>
                    <th scope="col">purchase Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Image</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.length > 0 ? (
                    currentProducts.map((product, index) => (
                      <tr key={product.productid}>
                        <th scope="row">{indexOfFirstProduct + index + 1}</th>
                        <td>{product.productName}</td>
                        <td>{product.description}</td>
                        <td>{product.sellePrice} UM</td>
                        <td>{product.purchasePriceUnit} UM</td>
                        <td>{product.purchasePrice} UM</td>
                        <td>{product.quantite}</td>
                        <td>
                      
                            <Image
                            //  width={100} height={100}
                            style={{ maxWidth: "100px" }}
                            src={`${BACK_END_URL}/product/image/${product.img}`}

                       alt="Product Image" />
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <Link
                              to={`/admin/products/${product.productid}`}
                              className="btn btn-primary btn-sm me-2"
                            >
                              Update
                            </Link>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                handleDeleteProduct(product.productid)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        Pas de produits disponibles
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          <nav>
            <ul className="pagination justify-content-center mt-4">
              {Array.from({
                length: Math.ceil(filteredProducts.length / productsPerPage),
              }).map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    index + 1 === currentPage ? "active" : ""
                  }`}
                >
                  <button
                    onClick={() => paginate(index + 1)}
                    className="page-link"
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Products;
