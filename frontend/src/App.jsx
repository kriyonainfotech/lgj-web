import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import ShopPage from './pages/product/ShopPage';
import Layout from './components/Layout';
import './App.css'
import ProductDetailPage from './pages/product/ProductDetailPage';
import ResetPassword from './pages/auth/ResetPassword';
import AdminHome from './pages/AdminHome';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './context/ProtectedRoute';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/auth/ProfilePage';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/cart/CartPage';
import ScrollToTop from './utils/ScrollToTop';
import CheckoutPage from './pages/order/CheckoutPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider >
            <ScrollToTop />
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

              <Route path='/about'
                element={
                  <Layout>
                    <AboutPage />
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

              <Route path='/collections/:slug' element={<Layout><ShopPage /></Layout>} />
              <Route path='/mirosas-collection/:slug' element={<Layout><ShopPage /></Layout>} />

              <Route
                path='/products/:slug'
                element={
                  <Layout>
                    <ProductDetailPage />
                  </Layout>
                }
              />

              <Route path='/checkout' element={<Layout><CheckoutPage /></Layout>} />
              <Route path='/cart' element={<Layout><CartPage /></Layout>} />

              <Route
                path='/profile'
                element={
                  <Layout>
                    <ProfilePage />
                  </Layout>
                } />

              <Route
                path="/reset-password/:resetToken"
                element={
                  <ResetPassword />
                }
              />

              <Route path='/admin/*' element={
                <ProtectedRoute role="admin">
                  <AdminHome />
                </ProtectedRoute>
              } />

            </Routes>

            <ToastContainer position="top-right" autoClose={3000} />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
