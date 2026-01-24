import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import DashBoard from "./pages/DashBoard";
import CreateCategory from "./components/category/create/CreateCategory";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="category-create" element={<CreateCategory />} />
        </Route>
      </Routes>
    </div>
  );

}

export default App
