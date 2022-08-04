import "./App.css";

import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="app">
      <h1 className="heading">React Coding Challenge</h1>
      <Home />
      <div className="grow" />
      <Footer />
    </div>
  );
}

export default App;
