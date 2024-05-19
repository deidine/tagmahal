import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../shared/ProductCard";
import AdminMenu from "./AdminMenu";
import "../../styles/admin.css"; 
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch } from "react-redux";

const Products = () => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
 
  useEffect(() => {
    // window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/product/all`, {
          headers: {
            "Authorization": "Bearer " + token,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const res = await response.json();
console.log(res)
        if (Array.isArray(res)) {
          setProducts(res);
        } else {
          console.error('Fetched data is not an array', res);
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [token]);

  return (
    <div className="container mt-2">
      <div className="row mb-5">
        <div className="col-md-3 mb-4 col-lg-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 col-lg-9">
          <h3 className="text-center mt-3 fs-2 fw-bold text-dark-emphasis">
            All Products List
          </h3>
          <div className="px-3">
            <h6 className="text-danger">
              Note: Images may take a moment to load.
            </h6>
          </div>
          <div className="admin-products-div d-flex justify-content-center flex-wrap">
            {isLoading ? (
              <div className="loader-container">
                <ClipLoader className="loader" />
              </div>
            ) : ( 
              products.map((p) => (
                <div key={p.productid}>
                  <Link to={`/admin/products/${p.productid}`} className="single-product-link">
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
          {/* <Pagination
            currentPage={currentPage}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Products;
