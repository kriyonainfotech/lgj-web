import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import ShopPage from './pages/product/ShopPage';
import Layout from './components/Layout';
import './App.css'
import ProductDetailPage from './pages/product/ProductDetailPage';
import ResetPassword from './pages/auth/ResetPassword';

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
        <Route
          path="/reset-password/:resetToken"
          element={
            <ResetPassword />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
