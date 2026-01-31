import { Route, Routes } from "react-router";
import CategoryMainPage from "./components/category/create/CategoryMainPage";
import CategoryList from "./components/category/list/CategoryList";
import Admin from "./pages/Admin";
import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import ViewCategory from "./components/category/view/ViewCategory";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="category-create" element={<CategoryMainPage />} />
          <Route path="category-list" element={<CategoryList />} />
          <Route path="category-view/:id" element={<ViewCategory />} />
        </Route>
      </Routes>
    </div>
  );

}

export default App
