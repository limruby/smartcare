import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsServices } from "../actions/serviceActions";

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

  useEffect(() => {
    if (services != null) {
      if (services.schedule != null && services.schedule.length > 0) {
        setScheduleSlot(services.schedule[0]);
      }
    }
  }, [services]);
  useEffect(() => {
    dispatch(detailsServices(serviceId));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, serviceId]);

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

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        //Single Product Details
        <div>
          <Link to="/">Back to result</Link>
          <div className="small-container single-product">
            <div className="row">
              <div className="col-2">
                <img
                  src={services.image}
                  width="100%"
                  className="small-img"
                  id="productImg"
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

                <h3>
                  Service Details <i className="fa fa-indent" />
                </h3>
                <br />
                <p>{services.description}</p>
              </div>
            </div>
          </div>
          {/*-------------------Reviews-----------------*/}
          <div className="small-container">
            <div className="row row-2">
              <h2>Reviews</h2>
            </div>
          </div>
          {/*-------------------TITLE-----------------*/}
          <div className="small-container">
            <div className="row row-2">
              <h2>Related Services</h2>
              <p>View More</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

