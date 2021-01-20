import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { listServiceCategories } from './actions/serviceActions';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import PrivateRoute from './components/PrivateRoute';
import SearchBox from './components/SearchBox';
import SellerRoute from './components/SellerRoute';
import BookingHistoryScreen from './screens/BookingHistoryScreen';
import BookingListScreen from './screens/BookingListScreen';
import BookingScreen from './screens/BookingScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import HomeScreen from './screens/HomeScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceBookingScreen from './screens/PlaceBookingScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import SearchScreen from './screens/SearchScreen';
import SellerScreen from './screens/SellerScreen';
import ServiceEditScreen from './screens/ServiceEditScreen';
import ServiceListScreen from './screens/ServiceListScreen';
import ServiceScreen from './screens/ServiceScreen';
import SigninScreen from './screens/SigninScreen';
import UserEditScreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen';


function App() {

  // Show atch number for cart icon 
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  }
  const serviceCategoryList = useSelector((state) => state.serviceCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = serviceCategoryList;
  useEffect(() => {
    dispatch(listServiceCategories())
  }, [dispatch])

  return (
    <div>
      {/*Start coding */}
      <BrowserRouter>
        <div className="header"> {/*-BACKGROUND CONTAINER*/}
          <div className="container">
            <div className="navbar">
              <button
                type="button"
                className="open-sidebar"
                onClick={() => setSidebarIsOpen(true)}
              >
                <i className="fa fa-bars"></i>
              </button>
              <div className="logo">
                <Link to="/"> <img src="../images/logo.png" width="125px" alt="logo" /></Link>
              </div>
              <nav>
                <ul id="MenuItems">
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
                      )}
                  {userInfo && userInfo.isSeller && (
                    <div className="dropdown">
                      <Link to="#admin">
                        Seller <i className="fa fa-caret-down"></i>
                      </Link>
                      <ul className="dropdown-content">
                        <li>
                          <Link to="/servicelist/seller">Services</Link>
                        </li>
                        <li>
                          <Link to="/bookinglist/seller">Bookings</Link>
                        </li>
                      </ul>
                    </div>
                  )}
                  {/*ADMIN VIEW */}
                  {userInfo && userInfo.isAdmin && (
                    <div className="dropdown">
                      <Link to="#admin">Admin <i className="fa fa-caret-down"></i></Link>
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
              <Link to="/cart"><img src="../images/cart_icon.png" width="30px" height="30px" alt="cart-icon" />
                {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )}
              </Link>
              <img src="../images/menu.png" className="menu-icon" alt="menu-icon" />
            </div>
            {/*-------------------SEARCH BOX-----------------*/}
          <div className="row-3">
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
          </div>
          
          {/*-------------------FEATURE CATEGORIES-----------------*/}
          <div>
            <aside className={sidebarIsOpen ? 'open' : ''}>
              <ul className="categories">
                <li>
                  <strong>Categories</strong>
                  <button
                    onClick={() => setSidebarIsOpen(false)}
                    className="close-sidebar"
                    type="button"
                  >
                    <i className="fa fa-close"></i>
                  </button>
                </li>
                {loadingCategories ? (
                  <LoadingBox></LoadingBox>
                ) : errorCategories ? (
                  <MessageBox variant="danger">{errorCategories}</MessageBox>
                ) : (
                      categories.map((c) => (
                        <li key={c}>
                          <Link
                            to={`/search/category/${c}`}
                            onClick={() => setSidebarIsOpen(false)}
                          >
                            {c}
                          </Link>
                        </li>
                      ))
                    )}
              </ul>
            </aside>

            <main className="container">
              <Route path="/seller/:id" component={SellerScreen}></Route>
              <Route path="/cart/:id?" component={CartScreen}></Route>
              <Route path="/service/:id" component={ServiceScreen} exact></Route>
              <Route path="/service/:id/edit" component={ServiceEditScreen} exact></Route>
              <Route path="/signin" component={SigninScreen}></Route>
              <Route path="/register" component={RegisterScreen}></Route>
              <Route path="/shipping" component={CheckoutScreen}></Route>
              <Route path="/payment" component={PaymentMethodScreen}></Route>
              <Route path="/placebooking" component={PlaceBookingScreen}></Route>
              <Route path="/booking/:id" component={BookingScreen}></Route>
              <Route path="/bookingHistory" component={BookingHistoryScreen}></Route>
              <Route path="/search/name/:name?" component={SearchScreen} exact ></Route>
              <Route path="/search/location/:location?" component={SearchScreen} exact ></Route>
              <Route path="/search/name/:name?/location/:location?" component={SearchScreen} exact ></Route>
              <Route path="/search/category/:category" component={SearchScreen} exact ></Route>
              <Route path="/search/category/:category/name/:name" component={SearchScreen} exact ></Route>
              <Route path="/search/category/:category/location/:location" component={SearchScreen} exact ></Route>
              <Route path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/location/:location" component={SearchScreen} exact ></Route>
              <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
              <AdminRoute path="/servicelist" component={ServiceListScreen} exact></AdminRoute>
              <AdminRoute path="/bookinglist" component={BookingListScreen} exact></AdminRoute>
              <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
              <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
              <SellerRoute path="/servicelist/seller" component={ServiceListScreen}></SellerRoute>
              <SellerRoute path="/bookinglist/seller" component={BookingListScreen}></SellerRoute>
              <Route path="/" component={HomeScreen} exact></Route>
            </main>
          </div>
          {/*-----------FOOTER--------------*/}
          <div className="footer">
            <div className="container">
              <div className="row">
                <div className="footer-col-1">
                  <h3>Subsribe our service</h3>
                  <p>Explore our platform</p>
                </div>
                <div className="footer-col-2">
                  <img src="../images/logo.png" alt="logo" />
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
        </div>
      </BrowserRouter>
      {/*End coding */}
    </div>
  );
}

export default App;
