import React, { useState, useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence, motion } from "framer-motion";

import api from "./api";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Home = lazy(() => import("./pages/Home"));
const Catalog = lazy(() => import("./pages/Catalog"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const ProfileDashboard = lazy(() => import("./pages/ProfileDashboard"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Auth = lazy(() => import("./pages/Auth"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Returns = lazy(() => import("./pages/Returns"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageSkeleton = () => (
  <div className="min-h-screen p-12 flex flex-col items-center justify-center animate-pulse">
    <div className="w-10 h-10 border-2 border-t-luxury-black border-stone-gray/20 rounded-full animate-spin mb-10" />
    <div className="w-64 h-2 bg-stone-gray/10 rounded-full mb-6"></div>
    <div className="w-40 h-2 bg-stone-gray/10 rounded-full"></div>
  </div>
);

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = ({ setCartCount }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home setCartCount={setCartCount} />
            </PageTransition>
          }
        />
        <Route
          path="/collection"
          element={
            <PageTransition>
              <Catalog setCartCount={setCartCount} />
            </PageTransition>
          }
        />
        <Route
          path="/product/:id"
          element={
            <PageTransition>
              <ProductDetail setCartCount={setCartCount} />
            </PageTransition>
          }
        />
        <Route
          path="/cart"
          element={
            <PageTransition>
              <Cart setCartCount={setCartCount} />
            </PageTransition>
          }
        />
        <Route
          path="/checkout"
          element={
            <PageTransition>
              <Checkout setCartCount={setCartCount} />
            </PageTransition>
          }
        />
        <Route
          path="/wishlist"
          element={
            <PageTransition>
              <Wishlist setCartCount={setCartCount} />
            </PageTransition>
          }
        />
        <Route
          path="/auth"
          element={
            <PageTransition>
              <Auth />
            </PageTransition>
          }
        />
        <Route
          path="/profile"
          element={
            <PageTransition>
              <ProfileDashboard />
            </PageTransition>
          }
        />
        <Route
          path="/admin"
          element={
            <PageTransition>
              <AdminDashboard />
            </PageTransition>
          }
        />
        <Route
          path="/shipping"
          element={
            <PageTransition>
              <Shipping />
            </PageTransition>
          }
        />
        <Route
          path="/returns"
          element={
            <PageTransition>
              <Returns />
            </PageTransition>
          }
        />
        <Route
          path="/bespoke"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    api
      .get("/cart")
      .then((res) => {
        if (res.data.success && res.data.data) {
          const total = res.data.data.reduce(
            (acc, item) => acc + item.quantity,
            0,
          );
          setCartCount(total);
        }
      })
      .catch((err) => console.log("Cart load skipped for demo."));
  }, []);

  return (
    <Router>
      <ErrorBoundary>
        <ScrollToTop />
        <div className="min-h-screen bg-cloud-dancer">
          <Navbar cartCount={cartCount} />
          <Suspense fallback={<PageSkeleton />}>
            <AnimatedRoutes setCartCount={setCartCount} />
          </Suspense>
          <Footer />
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      </ErrorBoundary>
    </Router>
  );
}
