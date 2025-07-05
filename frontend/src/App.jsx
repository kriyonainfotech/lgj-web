import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ShopPage from './pages/ShopPage';
import Layout from './components/Layout';
import './App.css'
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes WITHOUT Header/Footer */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Routes WITH Header/Footer */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/shop"
          element={
            <Layout>
              <ShopPage />
            </Layout>
          }
        />
        <Route
          path='/product'
          element={
            <Layout>
              <ProductDetailPage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
