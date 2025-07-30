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
import PrivateRoute from './context/PrivateRoute';
import Admindashboard from './adminpanel/Admindashboard';
import ViewCategory from './adminpanel/ViewCategory';
import ViewSubcategory from './adminpanel/ViewSubcategory';
import ViewProduct from './adminpanel/ViewProduct';
import ViewOrders from './adminpanel/ViewOrders';
import ViewUsers from './adminpanel/ViewUsers';
import AddCategory from './adminpanel/AddCategory';
import AddProduct from './adminpanel/AddProduct';
import AddSubCategory from './adminpanel/AddSubCategory';
import EditCategory from './adminpanel/EditCategory';
import EditProduct from './adminpanel/EditProduct';
import EditSubCategory from './adminpanel/EditSubCategory';
import { WishlistProvider } from './context/WishlistContext';
import WishlistPage from './pages/Whislist/WishlistPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider >
            <WishlistProvider >
              <ScrollToTop />
              <Routes>

                {/* Routes WITHOUT Header/Footer */}
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />

                <Route path='/' element={<Layout><Home /></Layout>} />
                <Route path='/about' element={<Layout><AboutPage /></Layout>} />
                <Route path='/shop' element={<Layout> <ShopPage /> </Layout>} />
                <Route path='/collections/:slug' element={<Layout><ShopPage /></Layout>} />
                <Route path='/mirosas-collection/:slug' element={<Layout><ShopPage /></Layout>} />
                <Route path='/products/:slug' element={<Layout> <ProductDetailPage /></Layout>} />
                <Route path='/cart' element={<Layout><CartPage /></Layout>} />
                <Route path='/wishlist' element={<Layout><WishlistPage /></Layout>} />

                {/* Routes WITH Header/Footer */}
                <Route element={<PrivateRoute />} >
                  <Route path='/checkout' element={<Layout><CheckoutPage /></Layout>} />
                  <Route path='/profile' element={<Layout><ProfilePage /></Layout>} />
                  <Route path='/reset-password/:resetToken' element={<ResetPassword />} />
                </Route>

                <Route path='/admin/*' element={<ProtectedRoute role='admin'><AdminHome /></ProtectedRoute>} >
                  <Route index element={<Admindashboard />} />
                  <Route path="categories" element={<ViewCategory />} />
                  <Route path="categories/:categoryId" element={<ViewSubcategory />} />
                  <Route path="products" element={<ViewProduct />} />
                  <Route path="orders" element={<ViewOrders />} />
                  <Route path="users" element={<ViewUsers />} />
                  <Route path="categories/add" element={<AddCategory />} />
                  <Route path="add-subcategory/:categoryId" element={<AddSubCategory />} />
                  <Route path="products/add" element={<AddProduct />} />
                  <Route path="edit-category/:categoryId" element={<EditCategory />} />
                  <Route path="edit-subcategory/:id" element={<EditSubCategory />} />
                  <Route path="edit-product/:productId" element={<EditProduct />} />
                </Route>

              </Routes>

              <ToastContainer position='top-right' autoClose={3000} />

            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
