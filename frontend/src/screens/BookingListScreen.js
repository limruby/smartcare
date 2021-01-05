import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listBookings } from '../actions/bookingActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function BookingListScreen(props) {
    const bookingList = useSelector((state) => state.bookingList)
    const { loading, error, bookings } = bookingList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listBookings());
    }, [dispatch])
    const deleteHandler = (booking) => {

    }
    return (
        <div>
            {/*Start Coding */}
            <h1>Appointments</h1>
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
