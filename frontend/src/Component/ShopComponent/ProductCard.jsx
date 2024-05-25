import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Image, Tooltip, Rate, message } from 'antd';
import { HeartOutlined, EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { BACK_END_URL } from "../../constant";

export const ProductCard = (props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  const onAddToCartSuccess = () => {
    message.success('Added to cart!', 5);
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = async () => {
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const res = await fetch(`${BACK_END_URL}/cart/addproduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: props.id,
          quantity: 1,
        }),
      });
      if (res.ok) {
        onAddToCartSuccess();
      } else {
        navigate("/login");
      }
    } catch (error) {
      message.error('Something went wrong!');
    }
  };

  return (
    <Card
      hoverable
      cover={
        <Image
          alt={props.name}
          src={`${BACK_END_URL}/product/image/${props.img}`}
          style={{ height: 189, objectFit: 'cover' }}
        />
      }
      actions={[
        <Tooltip title="Add to Wishlist" key="wishlist">
          <Button type="link" icon={<HeartOutlined />} />
        </Tooltip>,
        <Tooltip title="Quick View" key="quick-view">
          <Button type="link" icon={<EyeOutlined />} onClick={() => handleProductClick(props.id)} />
        </Tooltip>
      ]}
    >
      <div style={{ textAlign: 'center' }}
      onClick={() => handleProductClick(props.id)}
      
      >
        <Rate disabled defaultValue={5} style={{ marginBottom: '10px' }} />
        <h3 style={{ fontSize: '1.2em', margin: '10px 0' }}>
          <a href={`/product/${props.id}`}>{props.name}</a>
        </h3>
        <div style={{ marginBottom: '10px' }}>
          <del style={{ marginRight: '10px' }}>Rs {props.price + 100}</del>
          <span style={{ fontSize: '1.2em', color: '#ff4d4f' }}>Rs {props.price}</span>
        </div>
        <Button type="primary" icon={<ShoppingCartOutlined />} onClick={handleAddToCart}>
          Ajouter au Panier
        </Button>
      </div>
    </Card>
  );
};
 