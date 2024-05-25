import { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { Image } from "antd";
import { FcAddImage } from "react-icons/fc";
import {BACK_END_URL} from '../../constant'
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
  const [purchasePriceUnit, setPurchasePriceUnit] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);

  // GET Single Product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`${BACK_END_URL}/product/${params.id}`, {
        headers: { Authorization: "Bearer " + token },
      });
      console.log(data);
      const product = data;
      setProductId(product.productid);
      setDescription(product.description);
      setImg(product.img);
      setPrice(product.sellePrice);
      setProductName(product.productName);
      setWeight(product.quantite);
      setPurchasePriceUnit(product.purchasePriceUnit)
setPurchasePrice(product.purchasePrice)
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
      productData.append("sellePrice", price);
      productData.append("productname", productName);
      productData.append("quantite", weight);
      
      productData.append("purchasePriceUnit", purchasePriceUnit);
      productData.append("purchasePrice", purchasePrice);
      if (img) {
        productData.append("img", img);
      }

      const { data } = await axios.put(
        `${BACK_END_URL}/product/update/${productId}`,
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
              <label htmlFor="purchasePrice" className="form-label fw-bold">
                Product purchasePrice:
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Product Price"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
              />
            </div> <div className="mb-3">
              <label htmlFor="purchasePriceUnit" className="form-label fw-bold">
                Product purchasePriceUnit:
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Product Price"
                value={purchasePriceUnit}
                onChange={(e) => setPurchasePriceUnit(e.target.value)}
              />
            </div>
           
            <div className="mb-3">
              <label htmlFor="quantite" className="form-label label fw-bold">
              Quantite:
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
                            src={`${BACK_END_URL}/product/image/${img}`}

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
                       
                       src={`${BACK_END_URL}/product/image/${img}`}
                       
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
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
