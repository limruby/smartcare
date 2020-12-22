import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ServiceScreen from './screens/ServiceScreen';


function App() {
  return (
    <BrowserRouter>
    <div className="header"> {/*-BACKGROUND CONTAINER*/}
          <div className="container">
            <div className="navbar">
              <div className="logo">
                <a href="index.html"> <img src="images/logo.png" width="125px" /></a>
              </div>
              <nav>
                <ul id="MenuItems">
                  <li><a href="index.html">Home</a></li>
                  <li><a href="service.html">Services</a></li>
                  <li><a href>About</a></li>
                  <li><a href="account.html">Account</a></li>
                  <li><a href>Contact</a></li>
                </ul>
              </nav>
              <img src="images/cart_icon.png" width="30px" height="30px" />
              <img src="images/menu.png" className="menu-icon" onclick="menutoggle()" />
            </div>
            </div>
                {/*-------------------FEATURE CATEGORIES-----------------*/}
      <div className="small-container">
        <div className="row row-2">
          <h2>All Services</h2>
          <select>
            <option>Default sorting</option>
            <option>Sort by pricing</option>
            <option>Sort by rating</option>
            <option>Sort by popularity</option>
            <option>Sort by location</option>
          </select>
        </div>
        {/*START OF ROW*/}
        <div className="row">
        <main>
            <Route path = "/service/:id" component={ServiceScreen} exact></Route>
            <Route path = "/" component={HomeScreen} exact></Route>
            </main>         
          {/*END OF COLUMN*/}      
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
                  <img src="images/logo.png" />
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
