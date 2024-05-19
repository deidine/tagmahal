import { RiStarSFill } from "react-icons/ri";

const ProductCard = ({
  product_id,
  product_name,
  description,
  img,
  price,
  weight,
 
}) => {
  return (
    <div className="admin-product-card">
      <div className="px-1 update-div position-absolute top-0">
        Update Details
      </div>
      <div className="image-container">
        <img src={`data:image/jpeg;base64,${img}`} alt="product-image" />
      </div>
      <h6 className="mt-3 mb-1 px-1 fw-bold">{product_name}</h6>
      <div className="details px-1">
        <div className="description">
          <p className="mb-0">{description}</p>
        </div>
      </div>
      <div className="details-bottom d-flex align-items-center justify-content-between px-1">
        <div className="weight-container my-1 d-flex align-items-center">
          <span>Weight: {weight} kg</span>
        </div>
      </div>
      <p className="fw-bold d-flex mb-auto py-1 px-1">
        <span>&#x24;</span>
        {price}
        <span>/-</span>
      </p>
 
    </div>
  );
};

export default ProductCard;
