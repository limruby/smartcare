import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { createBooking } from '../actions/bookingActions';
import CheckoutSteps from '../components/CheckoutSteps'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { BOOKING_CREATE_RESET } from '../constants/bookingConstants';

export default function PlaceBookingScreen(props) {
    const cart = useSelector((state) => state.cart);
    if (!cart.paymentMethod) {
        props.history.location('/payment')
    }
    const bookingCreate = useSelector((state) => state.bookingCreate);
    const { loading, success, error, booking } = bookingCreate;
    const toPrice = (num) => Number(num.toFixed(2)) // 5.123 => "5.12" => 5.12
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.price, 0));
    cart.taxPrice = toPrice(0.05 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.taxPrice;
    const dispatch = useDispatch();
    const placeBookingHandler = () => {
        dispatch(createBooking({ ...cart, bookingItems: cart.cartItems }));
    };
    useEffect(() => {
        if (success) {
            props.history.push(`/booking/${booking._id}`);
            dispatch({ type: BOOKING_CREATE_RESET });
        }
    }, [dispatch, booking, props.history, success]);
    return (
        <div>
            {/*Start coding */}
            <div>
                <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            </div>
            <div className="row">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Booking Confirmation</h2>
                                <p>
                                    <strong>Name:</strong>{cart.customerAddress.fullName} <br />
                                    <strong>Address:</strong>
                                    {cart.customerAddress.address},
                                    {cart.customerAddress.city},
                                    {cart.customerAddress.postalCode},
                                    {cart.customerAddress.stateMsia}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong>{cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Your appointments:</h2>
                                <ul>
                                    {cart.cartItems.map((item) => (
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
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                Total: {cart.cartItems.length} Appointments
                                                        </td>
                                            <td>
                                                Subtotal: RM {cart.cartItems.reduce((a, c) => a + c.price, 0)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-2">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <div>
                                    <strong>
                                        <h2>Appointment Summary</h2>
                                        <br />
                                    </strong>
                                </div>
                            </li>
                            <li>
                                <div>Appointments</div>
                                <div>RM {cart.itemsPrice.toFixed(2)}</div>
                                <br />
                            </li>
                            <li>
                                <div>Tax</div>
                                <div>RM {cart.taxPrice.toFixed(2)}</div>
                                <br />
                            </li>
                            <li>
                                <div>Total Price</div>
                                <div><strong>RM {cart.totalPrice.toFixed(2)}</strong></div>
                                <br />
                            </li>
                            <li>
                                <button
                                    className="btn"
                                    onClick={placeBookingHandler}
                                    disabled={cart.cartItems.length === 0}
                                >Place appointment</button>
                            </li>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}

                        </ul>

                    </div>
                </div>
            </div>
            {/*End coding */}

        </div>
    )
}
