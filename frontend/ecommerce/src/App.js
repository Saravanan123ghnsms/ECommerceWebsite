import LoginProvider from "./context/LoginProvider";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <LoginProvider>
        <Login />
      </LoginProvider>
    </div>
  );
}

export default App;
