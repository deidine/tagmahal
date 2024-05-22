import React, { useEffect, useState } from "react";
import { ProductCard } from "../ShopComponent/ProductCard";
import axiosFetch from "../../Helper/Axios";
 
export const ListProduct = () => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 9;
  const fetchData = async () => {
    const response = await axiosFetch({
      url: "/product/all",
      method: "GET",
    });
    if (!response.error && Array.isArray(response.data)) {
      setData(response.data);
    } else {
      setData([]); // Set data to empty array in case of error
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const filteredData = data.filter((item) =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <>
      <section id="products" className="section product">
        <div className="container">
          <p className="section-subtitle"> -- Produits Biologiques --</p>
          <h2 className="h2 section-title">Tous les Produits Biologiques</h2>
          
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Rechercher des produits..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          
          <ul className="grid-list">
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <ProductCard
                  key={item.productid}
                  id={item.productid}
                  name={item.productName}
                  description={item.description}
                  price={item.price}
                  img={item.img}
                />
              ))
            ) : (
              <p>Pas de produits disponibles</p>
            )}
          </ul>

          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index}
                  className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
};
