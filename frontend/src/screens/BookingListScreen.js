import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteBooking, listBookings } from '../actions/bookingActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { BOOKING_DELETE_RESET } from '../constants/bookingConstants';

export default function BookingListScreen(props) {
    const sellerMode = props.match.path.indexOf('/seller')>=0;
    const bookingList = useSelector((state) => state.bookingList)
    const { loading, error, bookings } = bookingList;
    const bookingDelete = useSelector((state) => state.bookingDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = bookingDelete;
    const userSignin = useSelector((state) => state.userSignin)
    const { userInfo } = userSignin
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type: BOOKING_DELETE_RESET})
        dispatch(listBookings({seller: sellerMode ? userInfo._id:''}));
    }, [dispatch, sellerMode, successDelete, userInfo._id])
    const deleteHandler = (booking) => {
        if(window.confirm('Are you sure to delete?')){
            dispatch(deleteBooking(booking._id));
        }
    }
    return (
        <div>
            {/*Start Coding */}
            <h1>Appointments</h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            <br />
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking) => (
                                    <tr key={booking._id}>
                                        <td>{booking._id}</td>
                                        <td>{booking.user.name}</td>
                                        <td>{booking.createdAt.substring(0, 10)}</td>
                                        <td>{booking.totalPrice.toFixed(2)}</td>
                                        <td>{booking.isPaid ? booking.paidAt.substring(0, 10) : 'No'}</td>
                                        <td>
                                            {booking.isDelivered
                                                ? booking.deliveredAt.substring(0, 10)
                                                : 'No'}
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn"
                                                onClick={() => {
                                                    props.history.push(`/booking/${booking._id}`);
                                                }}
                                            >
                                                Details
                                            </button>
                                            <button
                                                type="button"
                                                className="btn"
                                                onClick={() => deleteHandler(booking)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
            {/*End Coding */}
        </div>
    )
}
