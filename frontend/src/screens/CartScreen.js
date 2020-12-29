import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";

export default function CartScreen(props) {
  const serviceId = props.match.params.id;
  const scheduleSlot = props.location.search
    ? String(props.location.search.split("=")[1])
    : "Default appointment";
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    if (serviceId) {
      console.log(serviceId);
      console.log(scheduleSlot);
      dispatch(addToCart(serviceId, scheduleSlot));
    }
  }, [dispatch, scheduleSlot, serviceId]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    props.history.push('signin?redirect=shipping');
  }

  return (
    <div className ="row">
    <div className="small-container">
        <h1>Cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Browse through our webpage</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.service} >
                <div className="small-container cart-page">
                  <table>
                    <thead>
                      <tr>
                        <th>Service</th>
                        <th>Appointment</th>
                        <th>Price</th>
                      </tr>
                      </thead>
               {/* Start New Row */}
               <tbody>
               <tr>
                 <td>
                  <div className="cart-info">
                    <Link to={`service/${item.service}`}>
                    <img src={item.image} alt={item.name}></img>
                    <p>{item.name}</p>
                    </Link>
                    <div>
                    
                    <small>Price: RM {item.price}</small>
                    <br />
                    <button className ="btn"
                    onClick={()=> removeFromCartHandler(item.service)}>Remove</button>
                    </div>
                  </div>
                  </td>
                  <td>
                   {item.scheduleSlot}  
                    </td>
                  <td>RM {item.price}</td>
                  </tr>
                  </tbody></table></div>
                  {/* End of row */}
              </li>
            ))}                 
          </ul>
        )}
      </div>
      {/* Checkout button*/}
      <div className="total-price">
              <table>
                <tbody>
                  <tr>
                    <td>
                      Total: {cartItems.length} Appointments 
                     </td>
                     <td>
                       Subtotal: RM {cartItems.reduce((a, c) => a + c.price, 0)}
                     </td>
                  </tr>
                </tbody>
              </table>             
      </div>
      <button 
              type = "button" 
              className="btn" 
              onClick={checkoutHandler}
              disabled = {cartItems.length === 0}
              >
               Checkout
                </button>    
       {/* End of Checkout button*/}
      </div>
      

  );
}