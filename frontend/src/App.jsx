import { VStack } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import BooksDetail from "./pages/BooksDetail";
import EditBookPage from "./pages/EditBook";
import Homepage from "./pages/Homepage";
import NewBookPage from "./pages/NewBook";
import Register from "./pages/Register";
import './App.css'

function App() {
  return (
    <VStack minH="100vh" minW="100vw">
      <Router>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<Homepage />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/newbook"} element={<NewBookPage />} />
          <Route path={"/books/:id"} element={<BooksDetail />} />
          <Route path={"/editbook/:id"} element={<EditBookPage />} />
        </Routes>
      </Router>
    </VStack>
  );
}

export default App;
