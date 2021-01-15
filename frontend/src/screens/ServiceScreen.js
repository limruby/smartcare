import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { createReview, detailsServices } from "../actions/serviceActions";
import { SERVICE_REVIEW_CREATE_RESET } from "../constants/serviceConstants";

export default function ServiceScreen(props) {
  const dispatch = useDispatch();
  const serviceId = props.match.params.id;
  const [scheduleSlot, setScheduleSlot] = useState("");

  /*
  const updateOption = (e) => {
    setScheduleSlot(e.target.value)
  }
  */
  const serviceDetails = useSelector((state) => state.serviceDetails);
  const { loading, error, services } = serviceDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const serviceReviewCreate = useSelector((state) => state.serviceReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = serviceReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  useEffect(() => {
    if (services != null) {
      if (services.schedule != null && services.schedule.length > 0) {
        setScheduleSlot(services.schedule[0]);
      }
    }
  }, [services]);
  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({ type: SERVICE_REVIEW_CREATE_RESET });
    }
    dispatch(detailsServices(serviceId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, serviceId, successReviewCreate]);

  /*
  useEffect(() => {
    if(services.schedule.length > 0){
    const initialState = services.schedule.map(obj => obj.schedule);
    setScheduleSlot(initialState);
    console.log(initialState)
    }
  }, [services]);
*/
  const addToCartHandler = () => {
    props.history.push(`/cart/${serviceId}?scheduleSlot=${scheduleSlot}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(serviceId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
            //Single Service Details
            <div>
              <Link to="/">Back to result</Link>
              <div className="small-container single-product">
                <div className="row">
                  <div className="col-2">
                    <img
                      src={services.image}
                      width="100%"
                      className="small-img"
                      id="serviceImg"
                      alt="more pictures"
                    />
                    <div className="small-img-row">
                      <div className="small-img-col">
                        <img
                          src={services.image}
                          width="100%"
                          className="small-img"
                          alt="more pictures"
                        />
                      </div>
                      <div className="small-img-col">
                        <img
                          src={services.image}
                          width="100%"
                          className="small-img"
                          alt="more pictures"
                        />
                      </div>
                      <div className="small-img-col">
                        <img
                          src={services.image}
                          width="100%"
                          className="small-img"
                          alt="more pictures"
                        />
                      </div>
                      <div className="small-img-col">
                        <img
                          src={services.image}
                          width="100%"
                          className="small-img"
                          alt="more pictures"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-2">
                    <h2>{services.category}</h2>
                    <h1>{services.name}</h1>
                    <h4>{services.location}</h4>
                    <h4>RM {services.price}</h4>
                    <h5>
                      <Rating
                        rating={services.rating}
                        numReviews={services.numReviews}
                      ></Rating>
                    </h5>
                    <div>Status</div>
                    <div>
                      {services.schedule.length > 0 ? (
                        <span className="success">Available</span>
                      ) : (
                          <span className="danger">Unavailable</span>
                        )}
                    </div>
                    {/*-------------------CONDITIONALS FOR BOOKING BTN-----------------*/}
                    {services.schedule.length > 0 && (
                      <div className="row-3">
                        <h3>Available TimeSlot</h3>

                        <select
                          value={scheduleSlot}
                          onChange={(e) => {
                            setScheduleSlot(e.target.value);
                          }}
                        >
                          <option key={0} value={""}>
                            Select
                      </option>
                          {services.schedule.map((scheduleInfo, index) => (
                            <option key={index + 1} value={scheduleInfo}>
                              {scheduleInfo}
                            </option>
                          ))}
                        </select>
                        <button onClick={addToCartHandler} className="btn">
                          Book Appointment
                    </button>
                      </div>
                    )}
                    <div className="row-3">
                      <h2>Service Provider{''}</h2>
                      <br />
                      <h3>
                        <Link to={`/seller/${services.seller._id}`}>{services.seller.seller.name}</Link>
                      </h3>
                      <Rating rating={services.seller.seller.rating} numReviews={services.seller.seller.numReviews}></Rating>
                    </div>
                    <div className="row-3">
                      <h2>
                        Service Details <i className="fa fa-indent" />
                      </h2>
                      <br />
                      <p>{services.description}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/*-------------------Reviews-----------------*/}
              <div className="small-container">
                <div className="row row-2">
                  <h1 id="reviews">Reviews</h1>
                  {services.reviews.length === 0 && (
                    <MessageBox>There is no review</MessageBox>
                  )}
                  </div>
                  <ul>
                    {services.reviews.map((review) => (
                      <li key={review._id} className="row-3">
                        <strong>{review.name}</strong>
                        <Rating rating={review.rating} caption=" "></Rating>
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                      </li>
                    ))}
                    <li className="row-3">
                      {userInfo ? (
                        <form className="form" onSubmit={submitHandler}>
                          <div>
                            <h2>Write a customer review</h2>
                          </div>
                          <div className="row-3">
                            <label htmlFor="rating">Rating &nbsp;</label>
                            <select
                              id="rating"
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option value="">Select...</option>
                              <option value="1">1- Poor</option>
                              <option value="2">2- Fair</option>
                              <option value="3">3- Good</option>
                              <option value="4">4- Very good</option>
                              <option value="5">5- Excelent</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="comment">Comment</label>
                            <textarea
                              id="comment"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                          </div>
                          <div>
                            <label />
                            <button className="btn" type="submit">
                              Submit
                      </button>
                          </div>
                          <div>
                            {loadingReviewCreate && <LoadingBox></LoadingBox>}
                            {errorReviewCreate && (
                              <MessageBox variant="danger">
                                {errorReviewCreate}
                              </MessageBox>
                            )}
                          </div>
                        </form>
                      ) : (
                          <MessageBox>
                            Please <Link to="/signin">Sign In</Link> to write a review
                          </MessageBox>
                        )}
                    </li>
                  </ul>
                
              </div>
            </div>
          )}
    </div>
  );
}