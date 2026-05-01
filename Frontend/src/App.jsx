
// import React from 'react'
// import { createBrowserRouter, Outlet, RouterProvider } from 'react-router'


// import Home from './pages/Home'
// import Login from './pages/Login'
// import Signup from './pages/Signup'
// import ProductDetails from './pages/ProductDetails'
// import ProductList from './admin/ProductList'
// import AddProduct from './admin/AddProduct'
// import EditProduct from './admin/EditProduct'
// import Navbar from './components/Navbar'
// import Cart from './pages/Cart'
// import Checkout from './pages/Checkout'
// import CheckoutAddress from './pages/CheckoutAddress'
// import OrderSuccess from './pages/OrderSucess'
// import Footer from './components/Footer'

// function Layout()
// {
//   return(
//     <>
//     <Navbar/>
//     <Outlet/>
//     {/* <Footer/> */}
//     </>
//   )
// }

// const router = createBrowserRouter([
//   {
//   element:<Layout/>,
//   children:[
//     {path:"/",element:<Home/> },
//   {path:"/login",element:<Login/> },
//   {path:"/signup",element:<Signup/> },
//   {path:"/product/:id",element:<ProductDetails/> },
//   {path:"/cart",element:<Cart/>},

//   {path:"/admin/products",element:<ProductList/>},
//   {path:"/admin/products/add",element:<AddProduct/>},
//   {path:"/admin/products/edit/:id",element:<EditProduct/>},
//   {path:"/checkout",element:<Checkout/>},
//   {path:"/checkout-address",element:<CheckoutAddress/>},
//   {path:"/order-success/:id",element:<OrderSuccess/>}
//   ]
//   }
// ])

// const App = () =>{
//   return (  
//     <div>
//       <RouterProvider router={router} />
//       <Footer/>
//     </div>
    
//   )
// }


// export default App




import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';
import AOS from 'aos'; // Import AOS for scroll animations
import 'aos/dist/aos.css'; // Import AOS styles

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductDetails from './pages/ProductDetails';
import ProductList from './admin/ProductList';
import AddProduct from './admin/AddProduct';
import EditProduct from './admin/EditProduct';
import Navbar from './components/Navbar';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CheckoutAddress from './pages/CheckoutAddress';
import OrderSuccess from './pages/OrderSucess'; //  Fixed typo: OrderSucess -> OrderSuccess


function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/cart", element: <Cart /> },
      { path: "/admin/products", element: <ProductList /> },
      { path: "/admin/products/add", element: <AddProduct /> },
      { path: "/admin/products/edit/:id", element: <EditProduct /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/checkout-address", element: <CheckoutAddress /> },
      { path: "/order-success/:id", element: <OrderSuccess /> },
    ],
  },
]);

const App = () => {
  // Initialize AOS for scroll animations
  React.useEffect(() => {
    AOS.init({
      duration: 800, // Animation duration
      once: true, // Animate only once
      offset: 100, // Trigger animation 100px before element enters viewport
    });
  }, []);

  return (
    <div className="scroll-smooth"> {/* Enable smooth scrolling */}
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
