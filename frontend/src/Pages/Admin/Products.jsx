import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../shared/ProductCard";
import ClipLoader from "react-spinners/ClipLoader";
import {BACK_END_URL} from '../../constant'
const Products = () => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BACK_END_URL}/product/all`, {
          headers: {
            "Authorization": "Bearer " + token,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const res = await response.json();
        if (Array.isArray(res)) {
          setProducts(res);
          setFilteredProducts(res);
        } else {
          console.error('Fetched data is not an array', res);
          setProducts([]);
          setFilteredProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset pagination when search query changes
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-9">
          <h3 className="text-center mt-3 fs-2 fw-bold text-dark">
            All Products List
          <button className="btn btn-primary fw-bold "> <Link to={`/admin`}>Retour</Link></button>
          </h3>
          <div className="px-3">
            <h6 className="text-danger">
              Note: Images may take a moment to load.
            </h6>
          </div>
          <div className="row justify-content-center">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search for product..."
              value={searchQuery}
              onChange={handleSearch}
            />
            {isLoading ? (
              <div className="loader-container">
                <ClipLoader className="loader" />
              </div>
            ) : (
              currentProducts.map((p) => (
                <div key={p.productid} className="col-md-4 mb-4">
                  <Link to={`/admin/products/${p.productid}`} className="single-product-link text-decoration-none">
                    <ProductCard
                      product_id={p.productid}
                      description={p.description}
                      img={p.img}
                      price={p.price}
                      product_name={p.productName}
                      weight={p.weight}
                    />
                  </Link>
                </div>
              ))
            )}
          </div>
          <nav>
            <ul className="pagination justify-content-center mt-4">
              {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }).map((_, index) => (
                <li key={index} className={`page-item ${index + 1 === currentPage ? "active" : ""}`}>
                  <button onClick={() => paginate(index + 1)} className="page-link">{index + 1}</button>
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
