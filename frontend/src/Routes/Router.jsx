import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../Pages/Home";
import { ProductDetails } from "../Pages/ProductDetails";
import { Shop } from "../Pages/Shop";
import { Cart } from "../Pages/Cart";
import { CheckOut } from "../Pages/CheckOut";
import { Login } from "../Pages/Login";
import { Singup } from "../Pages/Singup";
import { Protected } from "../Component/Protected";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import JournalStock from "../Pages/Admin/stock/JournalStock";
import ValideJournalStock from "../Pages/Admin/stock/ValideJournalStock";
import CreateProduct from "../Pages/Admin/CreateProduct";
import CreateOrder from "../Pages/Admin/CreateOrder";
import UpdateProduct from "../Pages/Admin/UpdateProduct";
import Products from "../Pages/Admin/Products";
import CreateCategory from "../Pages/Admin/CreateCategory";
import AdminOrders from "../Pages/Admin/AdminOrders";
import Users from "../Pages/Admin/Users";
import AllCarts from "../Pages/Admin/AllCart";
import NotFound from "../Pages/NotFound";
 export const Router = () => {
  const [isSignedIn, setIsSignedIn] = useState(
    sessionStorage.getItem("token") || false
  );

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/admin/create-category" element={<CreateCategory />} />
        <Route path="/admin/create-product" element={<CreateProduct />} />
        <Route path="/admin/create-order" element={<CreateOrder />} />
        <Route path="/admin/products/:id" element={<UpdateProduct />} />
        <Route extact path="/admin/products" element={<Products />} />
        <Route extact path="/admin/journal" element={<JournalStock />} />
        <Route extact path="/admin/valide-journal" element={<ValideJournalStock/>}/>
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route
          path="/cart"
          element={
            <Protected isSignedIn={isSignedIn}>
              <Cart />
            </Protected>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<Singup />} />
        <Route
          path="/checkout"
          element={
            <Protected isSignedIn={isSignedIn}>
              <CheckOut />
            </Protected>
          }
        />
        <Route path="/admin/allCarts" element={<AllCarts/>} />   
             <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
