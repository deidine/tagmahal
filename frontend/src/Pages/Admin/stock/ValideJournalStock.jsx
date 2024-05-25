// File path: src/components/ValideJournalStock.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Input, Button, notification } from "antd";
import { BACK_END_URL } from "../../../constant";
import { useNavigate } from "react-router-dom";

const ValideJournalStock = () => {
  const [stockEntries, setStockEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token] = useState(sessionStorage.getItem("token"));
  const [editingRow, setEditingRow] = useState(null);
  const navigate = useNavigate();

  const fetchStockEntries = async () => {
    try {
      const response = await axios.get(`${BACK_END_URL}/stock-entries/stocknovalide`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStockEntries(response.data);
    } catch (error) {
      console.error("Error fetching stock entries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockEntries();
  }, []);

  const handleInputChange = (e, record, field, index) => {
    const { value } = e.target;
    setStockEntries((prevStockEntries) => {
      const updatedStockEntries = [...prevStockEntries];
      updatedStockEntries[index] = { ...updatedStockEntries[index], [field]: value };
      return updatedStockEntries;
    });
  };

  const handleValide = async (stockEntry) => {
    const formData = new FormData();
    formData.append("entryId", stockEntry.entryId);
    formData.append("productId", stockEntry.product.productId);
    formData.append("stockIn", stockEntry.stockIn || 0);
    formData.append("stockOut", stockEntry.stockOut || 0);

    try {
      await axios.post(`${BACK_END_URL}/stock-entries/valid-stock-entries`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      notification.success({
        message: "Stock Entry Validated",
        description: "The stock entry was successfully validated.",
      });
      fetchStockEntries();
    } catch (error) {
      console.error("Error validating stock entry:", error);
      notification.error({
        message: "Validation Failed",
        description: "There was an error validating the stock entry.",
      });
    }
  };

  const handleNonValide = async (stockEntry) => {
    try {
      await axios.delete(`${BACK_END_URL}/stock-entries/novalidet-stock-entries/${stockEntry.entryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      notification.success({
        message: "Stock Entry Validation Removed",
        description: "The stock entry validation was successfully removed.",
      });
      fetchStockEntries();
    } catch (error) {
      console.error("Error removing validation:", error);
      notification.error({
        message: "Validation Removal Failed",
        description: "There was an error removing the validation of the stock entry.",
      });
    }
  };

  const handleEdit = (index) => {
    setEditingRow(index);
  };

  const columns = [
    {
      title: "Stock Entry ID",
      dataIndex: "entryId",
      key: "entryId",
    },
    {
      title: "Product ID",
      dataIndex: ["product", "productId"],
      key: "productId",
    },
    {
      title: "Product Name",
      dataIndex: ["product", "productName"],
      key: "productName",
    },
    {
      title: "Product Quantity",
      dataIndex: ["product", "quantite"],
      key: "quantite",
    },
    {
      title: "Stock In",
      dataIndex: "stockIn",
      key: "stockIn",
      render: (text, record, index) => (
        <Input
          key={index}
          value={record.stockIn}
          readOnly={editingRow !== index}
          placeholder="Enter new stock in quantity"
          onChange={(e) => handleInputChange(e, record, "stockIn", index)}
        />
      ),
    },
    {
      title: "Stock Out",
      dataIndex: "stockOut",
      key: "stockOut",
      render: (text, record, index) => (
        <Input
          key={index}
          value={record.stockOut}
          readOnly={editingRow !== index}
          placeholder="Enter stock out quantity"
          onChange={(e) => handleInputChange(e, record, "stockOut", index)}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record, index) => (
        <>
          <Button
            type="primary"
            key={`validate-${index}`}
            onClick={() => handleValide(record)}
          >
            Validate
          </Button>
  
          <Button
            type="primary"
            style={{ background: "yellow" ,color:"black"}}
            key={`edit-${index}`}
            onClick={() => handleEdit(index)}
          >
            Modifier
          </Button>
          <Button
            type="primary"
            style={{ background: "red" }}
            key={`non-validate-${index}`}
            onClick={() => handleNonValide(record)}
          >
            Non Validate
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Stock Entry List</h2>
      <Button
        type="primary"
        onClick={() => navigate("/admin")}
      >
        Retour
      </Button>
      <Table
        dataSource={stockEntries}
        columns={columns}
        rowKey="entryId"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ValideJournalStock;
