import { Route, Routes } from "react-router";
import CategoryMainPage from "./components/category/create/CategoryMainPage";
import CategoryList from "./components/category/list/CategoryList";
import ViewCategory from "./components/category/view/ViewCategory";
import ProductsMainPage from "./components/products/create/ProductsMainPage";
import ProductList from "./components/products/list/ProductList";
import Admin from "./pages/Admin";
import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import MasterCategoryMainPage from "./components/master_category/MasterCategoryMainPage";
import ViewProduct from "./components/products/view/ViewProduct";
import Inventory from "./components/inventory/Inventory";
import VendorList from "./components/vendor/list/VendorList";
import CreateVendor from "./components/vendor/create/CreateVendor";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="dashboard" element={<DashBoard />} />

          {/* category */}
          <Route path="category-create" element={<CategoryMainPage />} />
          <Route path="category-list" element={<CategoryList />} />
          <Route path="category-view/:id" element={<ViewCategory />} />
          <Route path="category-edit/:id" element={<CategoryMainPage />} />

          {/* master-category */}
          <Route path="mastercategory" element={<MasterCategoryMainPage />} />
          {/* <Route path="mastercategory-list" element={<MasterCategoryList />} />
          <Route path="category-view/:id" element={<ViewCategory />} />
          <Route path="category-edit/:id" element={<CategoryMainPage />} /> */}

          {/* products */}
          <Route path="product-create" element={<ProductsMainPage />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="product-view/:id" element={<ViewProduct />} />
          <Route path="product-edit/:id" element={<ProductsMainPage />} />

          {/* Inventory */}
          <Route path="inventory" element={<Inventory />} />

          {/* Vendor */}
          {/* <Route path="product-create" element={<ProductsMainPage />} /> */}
          <Route path="vendor-list" element={<VendorList />} />
          <Route path="vendor-create" element={<CreateVendor />} />
          {/* <Route path="product-view/:id" element={<ViewProduct />} />
          <Route path="product-edit/:id" element={<ProductsMainPage />} /> */}

        </Route>
      </Routes>
    </div>
  );

}

export default App
