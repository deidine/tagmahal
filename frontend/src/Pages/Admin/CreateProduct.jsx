import { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { FcAddImage } from "react-icons/fc";
import { Image } from "antd";
import {BACK_END_URL} from '../../constant'
const CreateProduct = () => {
  
  const [thumbnail, setThumbnail] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [purchasePriceUnit, setPurchasePriceUnit] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [quantite, setWeight] = useState(0);
  const[token,setToken]=useState(sessionStorage.getItem("token"));

  const handleRemoveImage = () => {
    setThumbnail(null);
  };

  
  // Handle Create Product
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const authToken = token;
      const productData = new FormData();
      productData.append("productname", name);
      productData.append("description", description);
      productData.append("purchasePriceUnit", purchasePriceUnit);
      productData.append("purchasePrice", purchasePrice);
      productData.append("sellePrice", price);
      productData.append("quantite", quantite);
      productData.append("img", thumbnail); 
      
      const { data } = await axios.post(
        BACK_END_URL+"/product/add",
        productData,
        { headers: { Authorization: "Bearer "+authToken } }
      );

      if (data?.success) {
        toast.success("Product Created Successfully !");
        // navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong !");
    }
  };

  return (
    <div className="container my-2">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 d-flex align-items-center justify-content-center flex-column">
          <h1 className="w-100 mt-0 mb-3 fw-bold text-dark-emphasis">Create Product</h1>
          <div className="w-100 m-1 create-product-div w-75">
            
            <div className="mb-3">
              <label htmlFor="productThumbnail" className="form-lable fw-bold">
                Product Thumbnail Details:
              </label>
              <div className="row my-2">
                {thumbnail && (
                  <div className="col-md-2">
                    <div className="position-relative">
                      <Image
                        width={100}
                        height={100}
                        src={URL.createObjectURL(thumbnail)}
                        alt={thumbnail.name}
                        footer={null}
                      />
                      <button
                        type="button"
                        className="btn btn-sm btn-danger position-absolute top-0 end-0"
                        onClick={handleRemoveImage}
                      >
                        <span className="fw-bold">X</span>
                      </button>
                    </div>
                  </div>
                )}
                <div className={thumbnail ? "col-md-10" : "col-md-12"}>
                  <label
                    htmlFor="uploadThumbnail"
                    className="btn btn-light border col-md-12 d-flex justify-content-center align-items-center"
                  >
                    <FcAddImage
                      style={{
                        marginRight: "0.5rem",
                        height: "28px",
                        width: "28px",
                      }}
                    />
                    {thumbnail ? thumbnail.name : "Upload Product Thumbnail"}
                    <input
                      id="uploadThumbnail"
                      type="file"
                      name="Image"
                      accept="image/*"
                      onChange={(e) => setThumbnail(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="productName" className="form-label fw-bold">
                Product Name:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                 htmlFor="productDescription"
                className="form-label fw-bold"
              >
                Product Description:
              </label>
              <textarea
                className="form-control"
                placeholder="Enter Short Description about Product..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productPrice" className="form-label fw-bold">
                Product Price:
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Product Price"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
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
                onChange={(e) => setPurchasePrice(parseFloat(e.target.value))}
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
                onChange={(e) => setPurchasePriceUnit(parseFloat(e.target.value))}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productWeight" className="form-label fw-bold">
                Product quantite:
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Product Weight"
                value={quantite}
                onChange={(e) => setWeight(parseFloat(e.target.value))}
              />
            </div>
            <button
              className="btn btn-primary w-100"
              onClick={handleCreateProduct}
            >
              Create Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
