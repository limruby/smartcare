import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import PrivateRoute from './components/PrivateRoute';
import BookingHistoryScreen from './screens/BookingHistoryScreen';
import BookingScreen from './screens/BookingScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import HomeScreen from './screens/HomeScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceBookingScreen from './screens/PlaceBookingScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ServiceScreen from './screens/ServiceScreen';
import SigninScreen from './screens/SigninScreen';


function App() {

  // Show atch number for cart icon 
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () =>{
    dispatch(signout());
  }

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
                  {
                    userInfo ? (
                      <li>
                      <div className="dropdown">
                        <Link to="#">
                          {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                        </Link>
                        <ul className="dropdown-content">
                          <li>
                          <Link to="/profile">User Profile</Link>
                          </li>
                          <li>
                            <Link to="/bookingHistory">Booking History</Link>
                          </li>
                          <li>
                            <Link to="#signout" onClick={signoutHandler}>
                              Sign Out
                            </Link>
                          </li>
                        </ul>
                      </div>
                      </li>
                    ) : (
                  <li><Link to="/signin">Sign In</Link></li>
                    )
                  } 
                  {/*ADMIN VIEW */} 
                  {userInfo && userInfo.isAdmin && (
                    <div className ="dropdown">
                      <Link to = "#admin">Admin <i className="fa fa-caret-down"></i></Link>
                      <ul className="dropdown-content">
                        <li>
                          <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                          <Link to="/servicelist">Services</Link>
                        </li>
                        <li>
                          <Link to="/bookinglist">Bookings</Link>
                        </li>
                        <li>
                          <Link to="/userlist">Users</Link>
                        </li>
                      </ul>
                    </div>
                  )}
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
            <Route path = "/signin" component={SigninScreen} exact></Route>
            <Route path = "/register" component={RegisterScreen} exact></Route>
            <Route path = "/shipping" component={CheckoutScreen} exact></Route>
            <Route path = "/payment" component={PaymentMethodScreen} exact></Route>
            <Route path = "/placebooking" component={PlaceBookingScreen} exact></Route>
            <Route path = "/booking/:id" component={BookingScreen} exact></Route>
            <Route path = "/bookingHistory" component={BookingHistoryScreen} exact></Route>
            <PrivateRoute path = "/profile" component={ProfileScreen} exact></PrivateRoute>
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
