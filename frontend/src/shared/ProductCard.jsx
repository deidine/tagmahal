import React from "react";
import "../styles/product-card.css"; 

const ProductCard = ({
  product_id,
  product_name,
  description,
  img,
  price,
  quantite,
}) => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <div className="image-container mb-3">
          <img
            src={`data:image/jpeg;base64,${img}`}
            alt="product-image"
            className="product-image img-fluid"
          />
        </div>
        <h6 className="card-title mt-3 mb-1 fw-bold">{product_name}</h6>
        <p className="card-text">{description}</p>
        <div className="mt-auto">
          <div className="mb-2">
            <span className="fw-bold">Weight:</span> {quantite} kg
          </div>
          <p className="fw-bold d-flex align-items-center">
            <span>&#x24;</span>
            {price}
            <span>/-</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
