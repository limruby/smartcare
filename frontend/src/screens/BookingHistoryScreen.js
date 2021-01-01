import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listBookingMine } from '../actions/bookingActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function BookingHistoryScreen(props) {
    const bookingMineList = useSelector((state) => state.bookingMineList);
    const { loading, error, bookings } = bookingMineList;
    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch(listBookingMine());
    }, [dispatch])
    return (
        <div>
            {/*Start Coding */}
            <h1>Appointment History</h1>
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
