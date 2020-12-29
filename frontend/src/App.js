import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ServiceScreen from './screens/ServiceScreen';


function App() {

  // Show atch number for cart icon 
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <BrowserRouter>
    <div className="header"> {/*-BACKGROUND CONTAINER*/}
          <div className="container">
            <div className="navbar">
              <div className="logo">
                <Link to="index.html"> <img src="../images/logo.png" width="125px" alt="logo"/></Link>
              </div>
              <nav>
                <ul id="MenuItems">
                  <li><Link to="">Home</Link></li>
                  <li><Link to="/">Services</Link></li>
                  <li><Link to="">About</Link></li>
                  <li><Link to="">Sign In</Link></li>
                  <li><Link to="">Contact</Link></li>
                </ul>
              </nav>
             <Link to ="/cart"><img src="../images/cart_icon.png" width="30px" height="30px" alt="cart-icon"/>
             {cartItems.length > 0 && (
               <span className="badge">{cartItems.length}</span>
              )}
             </Link> 
              <img src="../images/menu.png" className="menu-icon"  alt="menu-icon"/>
            </div>
            </div>
                {/*-------------------FEATURE CATEGORIES-----------------*/}
      <div className="small-container">  
      <h1>Our Service</h1>
        <main>
            <Route path = "/cart/:id?" component={CartScreen} exact></Route>
            <Route path = "/service/:id" component={ServiceScreen} exact></Route>
            <Route path = "/" component={HomeScreen} exact></Route>
            </main>         
          {/*-----------FOOTER--------------*/}
          <div className="footer">
            <div className="container">
              <div className="row">
                <div className="footer-col-1">
                  <h3>Subsribe our service</h3>
                  <p>Explore our platform</p>
                </div>
                <div className="footer-col-2">
                  <img src="../images/logo.png" alt="logo"/>
                  <p>Explore our platform</p>
                </div>
                <div className="footer-col-3">
                  <h3>Useful Links</h3>
                  <ul>
                    <li>Community</li>
                    <li>Return Policy</li>
                    <li>Join Affiliate</li>
                  </ul>
                </div>
                <div className="footer-col-4">
                  <h3>Follow Us</h3>
                  <ul>
                    <li>Facebook</li>
                    <li>Instagram</li>
                    <li>YouTube</li>
                  </ul>
                </div>
              </div>
              <hr />
              <p className="copyright">Copyright 2020 - Easy Tutorials</p>
            </div>
          </div>
          {/*-------JS FOR TOGGLE MENU -----*/}
        </div></div>
        </BrowserRouter>
  );
}

export default App;
