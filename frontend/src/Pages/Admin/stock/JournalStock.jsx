import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Input, Button, notification } from "antd";
import { BACK_END_URL } from "../../../constant";
import { useNavigate } from "react-router-dom";

const JournalStock = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token] = useState(sessionStorage.getItem("token"));
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BACK_END_URL}/product/all`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchProducts();
  }, []);

  const handleInputChange = (e, record, field, index) => {
    const { value } = e.target;
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts]; // Create a copy of the state
      updatedProducts[index] = { ...updatedProducts[index], [field]: value }; // Update only the specific product
      return updatedProducts;
    });
  };

  const handleUpdate = async (product) => {
    const formData = new FormData();
    formData.append("productId", product.productid);
    formData.append("entrer", product.entrer || 0);
    formData.append("sortie", product.sortie || 0);
    formData.append("sellePrice", product.sellePrice);
    formData.append("purchasePriceUnit", product.purchasePriceUnit);
    formData.append("purchasePrice", product.purchasePrice);

    try {
      await axios.post(`${BACK_END_URL}/stock-entries`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      notification.success({
        message: "Product Updated",
        description: "The product details were successfully updated.",
      });
 
    } catch (error) {
      console.error("Error updating product:", error);
      notification.error({
        message: "Update Failed",
        description: "There was an error updating the product.",
      });
    }
  };

  const columns = [
    {
      title: "Product ID",
      dataIndex: "productid",
      key: "productid",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    
    {
      title: "Quantity",
      dataIndex: "quantite",
      key: "quantite",
    },
    {
      title: "Entrer",
      dataIndex: "entrer",
      key: "entrer",
      render: (text, record, index) => (
        <Input
          key={index}
          value={record.entrer}
          defaultValue={0}
placeholder="entrer les nouvelle entrer du stock"

          onChange={(e) =>
            handleInputChange(e, record, "entrer", index)
          }
        />
      ),
    },
    {
      title: "Sortie",
      dataIndex: "sortie",
      key: "sortie",
      render: (text, record, index) => (
        <Input
          key={index}
          defaultValue={0}
placeholder="entrer les sortie du stock"
          value={record.sortie}
          onChange={(e) =>
            handleInputChange(e, record, "sortie", index)
          }
        />
      ),
    }
    ,
    {
      title: "Actions",
      key: "actions",
      render: (text, record, index) => (
        <Button
          type="primary"
          key={index}
          onClick={() => handleUpdate(record)}
        >
          Update
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2>Product List</h2>
      <Button
        type="primary"
        onClick={() => navigate("/admin")}
      >
        Retour
      </Button>
      <Table
        dataSource={products}
        columns={columns}
        rowKey="productId"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default JournalStock;
