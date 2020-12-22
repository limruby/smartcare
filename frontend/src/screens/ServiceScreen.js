import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsServices } from '../actions/serviceActions';

export default function ServiceScreen(props) {
  const dispatch = useDispatch();
  const serviceId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const serviceDetails = useSelector(state => state.serviceDetails);
  const { loading, error, services } = serviceDetails;

  useEffect(() => {
    dispatch(detailsServices(serviceId));
  }, [dispatch, serviceId]);

const addToCartHandler = () =>{
  props.history.push(`/cart/${serviceId}?qty=${qty}`);
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
                    <img src={services.image} width="100%" className="small-img" id="productImg" alt="more pictures" />
                    <div className="small-img-row">
                      <div className="small-img-col">
                        <img src={services.image} width="100%" className="small-img" alt="more pictures" />
                      </div>
                      <div className="small-img-col">
                        <img src={services.image} width="100%" className="small-img" alt="more pictures" />
                      </div>
                      <div className="small-img-col">
                        <img src={services.image} width="100%" className="small-img" alt="more pictures" />
                      </div>
                      <div className="small-img-col">
                        <img src={services.image} width="100%" className="small-img" alt="more pictures" />
                      </div>
                    </div>
                  </div>
                  <div className="col-2">
                    <h2>{services.category}</h2>
                    <h1>{services.name}</h1>
                    <h4>{services.location}</h4>
                    <h4>{services.price}</h4>
                    <h5><Rating rating={services.rating} numReviews={services.numReviews}></Rating></h5>
                    <form>
                      <label>From:</label>
                      <input type="date" id="from" name="from" />
                    </form>
                    <form>
                      <label>To:</label>
                      <input type="date" id="to" name="to" />
                      <input type="submit" onClick={addToCartHandler} 
                        className="btn" value="Book Appointment" />
                    </form>
                    <div>Status</div>
                    <div>{services.countInStock > 0 ? (
                      <span className="success">Available</span>
                    ) : (
                        <span className="danger">Unavailable</span>
                      )}
                    </div>
                    {/*-------------------CONDITIONALS FOR BOOKING BTN-----------------*/}
                    {
                      services.countInStock > 0 && (
                        <>
                        <li>
                          <div className="row">
                            <div>Available timeslot</div>
                            <div>
                              <select 
                              value={qty} 
                              onChange={e => setQty(e.target.value)}
                              >
                                {[...Array(services.countInStock).keys()].map(
                                    (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                      </option>
                                    )
                                  )}
                              </select>
                            </div>
                          </div>
                        </li>
                        <li><button 
                        onClick={addToCartHandler} 
                        className="btn">Book Appointment</button></li>
                        </>  
                      )
                    }

                    <h3>Service Details <i className="fa fa-indent" /></h3>
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
  )
} 