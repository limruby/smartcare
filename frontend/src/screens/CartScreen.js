import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

export default function CartScreen(props) {

    const serviceId = props.match.params.id;
    const scheduleSlot = props.location.search
    ? String(props.location.search.split('=')[1])
    : 'Default appointment';
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart;
    const dispatch = useDispatch();

    useEffect(() => {
        if(serviceId){
            dispatch(addToCart(serviceId, scheduleSlot))
            
        }
      }, [dispatch, scheduleSlot, serviceId]);

    return (
        <div className="small-container cart-page">
            <div className = "col-2" >
                <h1>Cart</h1>
                {cartItems.length === 0?<MessageBox>
                    Cart is empty. <Link to="/">Browse through our webpage</Link>
                </MessageBox>
                :
                (
                    <ul>
                        {
                            cartItems.map((item) => (
                                <li key={item.service}>
                                    <div className ="row">
                                        <div>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                ></img>
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                    
                    /*-----------CART ITEM DETAILS--------------
      <div className="small-container cart-page">
      <table>
        <tbody><tr>
            <th>Service</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
          //START NEW ROW
          <tr>
            <td>
              <div className="cart-info">
                <img src="images/center1.jpg" />
                <div>
                  <p>Rumah Kesayangan</p>
                  <small>Price: RM 300 per night</small>
                  <br />
                  <a href>Remove</a>
                </div>
              </div>
            </td>
            <td><input type="number" defaultValue={1} /></td>
            <td>RM 300</td>
          </tr>
          //END OF A ROW
        </tbody></table></div>
        */
                )}
            </div>
           
            <p>APPOINTMENT DATE: serviceId: {serviceId} Available schedule: {scheduleSlot}</p>
        </div>
    )
}
