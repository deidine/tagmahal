import { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { Image } from "antd";
import { FcAddImage } from "react-icons/fc";

const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);
  const [price, setPrice] = useState(0);
  const [productName, setProductName] = useState("");
  const [weight, setWeight] = useState(0);
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  // GET Single Product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/product/${params.id}`, {
        headers: { Authorization: "Bearer " + token },
      });
      console.log(data);
      const product = data;
      setProductId(product.productid);
      setDescription(product.description);
      setImg(product.img);
      setPrice(product.price);
      setProductName(product.productName);
      setWeight(product.weight);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  // PUT Update Product Details
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const productData = new FormData();
      productData.append("description", description);
      productData.append("price", price);
      productData.append("productname", productName);
      productData.append("weight", weight);
      if (img) {
        productData.append("img", img);
      }

      const { data } = await axios.put(
        `http://localhost:8080/product/update/${productId}`,
        productData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success("Product Updated Successfully!");
        setTimeout(() => {
          navigate("/admin/products/");
        }, 2000);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!");
    } finally {
      setLoading(false);
    }
  };

  // DELETE Product Deletion
  const handleDeleteProduct = async () => {
    try {
      const answer = window.prompt("Are you sure you want to delete this product?");
      if (answer) {
        const { data } = await axios.delete(`http://localhost:8080/product/delete/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data.success) {
          toast.success(data.msg);
          navigate("/admin/products/");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 d-flex align-items-center justify-content-center flex-column">
          <h1 className="w-100 px-2 mt-0 mb-3 text-dark-emphasis fw-bold">
            Update Product Details
          </h1>
          <div className="w-100 m-1 create-product-div">
            <h6 className="text-danger">Note: Images may take a moment to load.</h6>
            <div className="mb-3">
              <label htmlFor="productName" className="form-label label fw-bold">
                Current Product Name:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label label fw-bold">
                Description:
              </label>
              <textarea
                className="form-control"
                placeholder="Enter Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label label fw-bold">
                Price:
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Product Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="weight" className="form-label label fw-bold">
                Weight:
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Product Weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="row my-2">
              <label htmlFor="ProductImage" className="form-label fw-bold">
                Current Product Image:
              </label>
              {img ? (
                <div className="col-md-2">
                  <div className="position-relative">
                    <Image width={100} height={100}
                      src={`data:image/jpeg;base64,${img}`}
                      alt="Product Image" />
                    <button
                      type="button"
                      className="btn btn-sm btn-danger position-absolute top-0 end-0"
                      onClick={() => setImg(null)}
                    >
                      <span className="fw-bold">X</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="col-md-2">
                  <div className="position-relative">
                    {loading ? (
                      <div className="loader-container">
                        <ClipLoader className="loader" />
                      </div>
                    ) : (
                      <Image width={100} height={100} style={{ objectFit: "cover" }}
                      src={`data:image/jpeg;base64,${img}`}
                        // src={`http://localhost:8080/product/photo/${productId}`} // Assuming a fallback URL if no image is uploaded
                        alt="Default Product Image"
                      />
                    )}
                  </div>
                </div>
              )}
              <div className={img ? "col-md-10" : "col-md-12"}>
                <label
                  htmlFor="uploadImage"
                  className="btn btn-light border col-md-12 d-flex justify-content-center align-items-center mt-2"
                >
                  <FcAddImage style={{ marginRight: "0.5rem", height: "28px", width: "28px" }} />
                  {img ? img.name : "Upload Product Image"}
                  <input
                    id="uploadImage"
                    type="file"
                    name="Image"
                    accept="image/*"
                    onChange={(e) => setImg(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <button className="btn btn-primary" onClick={handleUpdateProduct} disabled={loading}>
                {loading ? "Updating..." : "Update Product"}
              </button>
              <button className="btn btn-danger" onClick={handleDeleteProduct} disabled={loading}>
                {loading ? "Deleting..." : "Delete Product"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
