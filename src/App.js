import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Signup from "./Pages/Signup/index";
import Login from "./Pages/Login/index";
import NewListing from "./Pages/NewListing/Index";
import HomePage from "./Pages/HomePage/Index";
import CategoriesPage from "./Pages/CategoriesPage/Index";
import AboutPage from "./Pages/AboutPage/Index";
import WishlistPage from "./Pages/WishlistPage/Index";
import StipePage from "./Pages/StripePage/Index";
import ExplorePage from "./Pages/ExplorePage/Index";
import CartPage from "./Pages/CartPage/Index";
import ProductDetailPage from "./Pages/ProductDetailPage/Index";
import Navbar from "./Components/Navbar";
import ProfilePage from "./Pages/ProfilePage/Index";
import BrowsingPage from "./Pages/BrowsingPage";
import Footer from "./Components/Footer/Index";
import SignUp from "./Pages/Signup/index";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PrivateRoute, PublicRoute } from "./Public&PrivateRoute";
import HowItWorks from "./Pages/HowItWorks";
import AdminDasboard from "./Pages/Dasboards/Admin/AdminDasboard";
import VendorsDetails from "./Pages/Dasboards/Admin/VendorsDetails";
import VendorProducts from "./Pages/Dasboards/Products";
import VendorDasboard from "./Pages/Dasboards/Vendors/VendorDashboard";
import MoveToTop from "./MoveToTop";
import UserDasboard from "./Pages/Dasboards/User/userDashboard";
import UserOrder from "./Pages/Dasboards/User/Orders";
import OrderDetails from "./Pages/Dasboards/User/OrderDetails";
import AllOrders from "./Pages/Dasboards/Admin/AllOrders";
import VendorsOrder from "./Pages/Dasboards/Vendors/Order";
import VendorOrderDetails from "./Pages/Dasboards/Vendors/OrderDetails";
import EditProfile from "./Pages/ProfilePage/EditProfile";
import CreateProduct from "./Pages/Dasboards/Vendors/CreateProduct";
import Search from "./Components/Serach";
import ProfileViewPage from "./Pages/ProfilePage/profileView";
import Chat from "./Pages/Chat";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MobileNavbar from "./Components/Navbar/MobileNavbar";
import { changeMenuOpen } from "./redux/Main/mainSlice";

const socket = io.connect(process.env.REACT_APP_BACKEND_URL, {
  transports: ["websocket"],
});
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(
    useSelector((state) => state.isMenuOpen)
  );
  const reduxIsMenuOpen = useSelector((state) => state.isMenuOpen);
  const [name, setName] = useState("");

  // useEffect(() => {
  //   const handleResize = () => {
  //     setScreenWidth(window.innerWidth);
  //     if(window.innerWidth>900){
  //       dispatch(changeMenuOpen(true))
  //     }
  //     alert(window.innerWidth)
  //   };
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  useEffect(() => {
    setIsMenuOpen(reduxIsMenuOpen.payload ?? true);
  }, [reduxIsMenuOpen]); // Dependency array

  const id = useSelector((state) => state.id);
  useEffect(() => {
    //   setSocket(socket)
    if (id) {
      socket.emit("connectID", id);
    }
  }, [id]);
  return (
    <GoogleOAuthProvider
      clientId={
        "925591508840-4gkbjtn5scntgl0ibjjkcpe62a4b52rf.apps.googleusercontent.com"
      }
    >
      <Router>
        {isMenuOpen ? (
          <>
            <MoveToTop />
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route element={<Login socket={socket} />} path="/" exact />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route
                  element={<Login socket={socket} />}
                  path="/admin/login"
                  exact
                />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route element={<SignUp />} path="/Signup" />
              </Route>
              <Route element={<PublicRoute />}>
                <Route element={<BrowsingPage />} path="/Browsing" />
              </Route>
              <Route element={<PublicRoute />}>
                <Route element={<CategoriesPage />} path="/Categories" />
              </Route>
              <Route element={<PublicRoute />}>
                <Route element={<WishlistPage />} path="/wishlist" />
              </Route>
              <Route element={<PublicRoute />}>
                <Route element={<CartPage name={name} setName={setName} />} path="/cart" />
              </Route>
              <Route element={<PublicRoute />}>
                <Route element={<HomePage />} path="/home" />
              </Route>
              <Route element={<PublicRoute />}>
                <Route element={<AboutPage />} path="/about" />
              </Route>
              <Route element={<PublicRoute />}>
                <Route element={<NewListing />} path="/newlisting" />
              </Route>
              <Route element={<PublicRoute />}>
                <Route element={<AdminDasboard />} path="/admin/dashboard" />
              </Route>
              <Route element={<PublicRoute />}>
                <Route element={<AllOrders />} path="/admin/dashboard/orders" />
              </Route>
              <Route element={<PublicRoute />}>
                <Route element={<VendorDasboard />} path="/vendor/dashboard" />
              </Route>
              <Route element={<PublicRoute />}>
                <Route
                  element={<VendorsOrder />}
                  path="/vendor/dashboard/orders"
                />
              </Route>
              <Route element={<PublicRoute />}>
                <Route
                  element={<VendorOrderDetails />}
                  path="/vendor/dashboard/order/:orderid"
                />
              </Route>
              <Route element={<PublicRoute />}>
                <Route element={<UserDasboard />} path="/user/dashboard" />
              </Route>
              <Route element={<PublicRoute />}>
                <Route
                  element={<UserOrder />}
                  path="/user/dashboard/orders/:id"
                />
              </Route>
              <Route element={<PublicRoute />}>
                <Route
                  element={<OrderDetails />}
                  path="/user/dashboard/order/:id/:orderid"
                />
              </Route>
              <Route element={<PublicRoute />}>
                <Route
                  element={<OrderDetails />}
                  path="/admin/dashboard/order/:id/:orderid"
                />
              </Route>
              <Route element={<PublicRoute />}>
                <Route
                  element={<VendorsDetails />}
                  path="/admin/dashboard/vendors"
                />
              </Route>
              <Route element={<PublicRoute />}>
                <Route
                  element={<VendorProducts />}
                  path="/admin/dashboard/vendors/:id"
                />
              </Route>
              <Route element={<PublicRoute />}>
                <Route
                  element={<VendorProducts />}
                  path="/vendor/dashboard/products/:id"
                />
              </Route>
              <Route element={<PublicRoute />}>
                <Route
                  element={<VendorProducts />}
                  path="/vendor/products/:id"
                />
              </Route>
              <Route element={<PublicRoute />}>
                <Route
                  element={<CreateProduct />}
                  path="/vendor/dashboard/product/create"
                />
              </Route>
              <Route element={<PublicRoute />}>
                <Route element={<CreateProduct />} path="/product/edit/:id" />
              </Route>
              <Route element={<PublicRoute />}>
                <Route element={<HowItWorks />} path="/howitworks" />
              </Route>
              <Route element={<PublicRoute />}>
                <Route
                  element={<ProductDetailPage />}
                  path="/productdetail/:id"
                />
              </Route>
              <Route element={<PublicRoute />}>
                <Route element={<ProfilePage />} path="/profile" />
              </Route>
              <Route element={<PublicRoute />}>
                <Route element={<ProfileViewPage />} path="/profile/:id" />
              </Route>
              <Route element={<PublicRoute />}>
                <Route element={<EditProfile />} path="/edit/profile" />
              </Route>
              <Route element={<PublicRoute />}>
                <Route element={<Search />} path="/search" />
              </Route>
              <Route element={<PublicRoute />}>
                <Route element={<Chat socket={socket} />} path="/chat" />
              </Route>
              <Route element={<PublicRoute />}>
                <Route element={<StipePage name={name}/>} path="/payment" />
              </Route>
              {/* <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />

          <Route path="/Browsing" element={<BrowsingPage />} /> */}
              {/* <Route path="/Listing" element={<NewListing />} />
          <Route path="/Categories" element={<CategoriesPage />} />
          <Route path="/About" element={<AboutPage />} />
          <Route path="/Wishlist" element={<WishlistPage />} />
          <Route path="/Explore" element={<ExplorePage />} />
          <Route path="/Cart" element={<CartPage />} />
          <Route path="/Product-detail" element={<ProductDetailPage />} />
          <Route path="/Profile" element={<ProfilePage />} /> */}
              <Route element={<Footer />} />
              <Route element={<Navbar />} />
            </Routes>
          </>
        ) : (
          <MobileNavbar />
        )}
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
