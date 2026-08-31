import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Category from "./pages/Category";
import Product from "./pages/Product";
import { About, Mission, Services } from "./pages/InfoPages";
import Contact from "./pages/Contact";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:categorySlug" element={<Category />} />
          <Route
            path="/products/:categorySlug/:productSlug"
            element={<Product />}
          />
          <Route path="/services" element={<Services />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
