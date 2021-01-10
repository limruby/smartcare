import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { deliverBooking, detailsBooking, payBooking } from '../actions/bookingActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { BOOKING_DELIVER_RESET, BOOKING_PAY_RESET } from '../constants/bookingConstants';

export default function BookingScreen(props) {
    const bookingId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const bookingDetails = useSelector((state) => state.bookingDetails);
    const { booking, loading, error } = bookingDetails;
    const userSignin = useSelector((state) => state.userSignin)
    const { userInfo } = userSignin;

    const bookingPay = useSelector((state) => state.bookingPay);
    const { loading: loadingPay, error: errorPay, success: successPay } = bookingPay;

    const bookingDeliver = useSelector((state) => state.bookingDeliver);
    const { loading: loadingDeliver, error: errorDeliver, success: successDeliver } = bookingDeliver;

    const dispatch = useDispatch();
    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await Axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            }
            document.body.appendChild(script);
        }
        if (!booking || successPay || successDeliver || (booking && booking._id !== bookingId)) {
            dispatch({ type: BOOKING_PAY_RESET })
            dispatch({ type: BOOKING_DELIVER_RESET })
            dispatch(detailsBooking(bookingId));
        } else {
            if (!booking.isPaid) {
                if (!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }
    }, [booking, bookingId, dispatch, sdkReady, successPay, successDeliver]);

    const successPaymentHandler = (paymentResult) => {
        // dispatch pay booking
        dispatch(payBooking(booking, paymentResult));
    }
    const deliverHandler = () => {
        dispatch(deliverBooking(booking._id));
    }

    return loading ? (<LoadingBox></LoadingBox>) :
        error ? (<MessageBox variant="danger">{error}</MessageBox>
        ) : (
                <div>
                    {/*Start coding */}
                    <h1>Booking {booking._id}</h1>
                    <div className="row">
                        <div className="col-2">
                            <ul>
                                <li>
                                    <div className="card card-body">
                                        <h2>Booking Confirmation</h2>
                                        <p>
                                            <strong>Name:</strong>{booking.customerAddress.fullName} <br />
                                            <strong>Address:</strong>
                                            {booking.customerAddress.address},
                                    {booking.customerAddress.city},
                                    {booking.customerAddress.postalCode},
                                    {booking.customerAddress.stateMsia}
                                        </p>
                                        {booking.isDelivered ? (
                                            <MessageBox variant="success">Delivered at {booking.deliveredAt}</MessageBox>
                                        ) : (
                                                <MessageBox variant="danger">Not Delivered</MessageBox>
                                            )}
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2>Payment</h2>
                                        <p>
                                            <strong>Method:</strong>{booking.paymentMethod}
                                        </p>
                                        {booking.isPaid ? (
                                            <MessageBox variant="success">Paid at {booking.paidAt}</MessageBox>
                                        ) : (
                                                <MessageBox variant="danger">Not Paid</MessageBox>
                                            )}
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2>Your appointments:</h2>
                                        <ul>
                                            {booking.bookingItems.map((item) => (
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
                                                        Total: {booking.bookingItems.length} Appointments
                                                        </td>
                                                    <td>
                                                        Subtotal: RM {booking.bookingItems.reduce((a, c) => a + c.price, 0)}
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
                                        <div>RM {booking.itemsPrice.toFixed(2)}</div>
                                        <br />
                                    </li>
                                    <li>
                                        <div>Tax</div>
                                        <div>RM {booking.taxPrice.toFixed(2)}</div>
                                        <br />
                                    </li>
                                    <li>
                                        <div>Total Price</div>
                                        <div><strong>RM {booking.totalPrice.toFixed(2)}</strong></div>
                                        <br />
                                    </li>
                                    {
                                        !booking.isPaid && (
                                            <li>
                                                {!sdkReady ? (
                                                    <LoadingBox></LoadingBox>
                                                ) : (
                                                        <>
                                                            {errorPay && (<MessageBox variant="danger">{errorPay}</MessageBox>)}
                                                            {loadingPay && <LoadingBox></LoadingBox>}

                                                            <PayPalButton
                                                                amount={booking.totalPrice}
                                                                onSuccess={successPaymentHandler}
                                                            ></PayPalButton>
                                                        </>
                                                    )}
                                            </li>
                                        )}
                                    {userInfo.isAdmin && booking.isPaid && !booking.isDelivered && (
                                        <li>
                                            {loadingDeliver && <LoadingBox></LoadingBox>}
                                            {errorDeliver && (
                                                <MessageBox variant="danger">{errorDeliver}</MessageBox>
                                            )}
                                            <button type="button" className="btn" onClick={deliverHandler}>Deliver Booking</button>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/*End coding */}
                </div>
            )
}
