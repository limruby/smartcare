import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsServices } from '../actions/serviceActions';

export default function ServiceScreen(props){
    const dispatch = useDispatch();
    const serviceId = props.match.params.id;
    const serviceDetails = useSelector(state => state.serviceDetails);
    const { loading, error, services } = serviceDetails;
    
    useEffect(() => {
      dispatch(detailsServices(serviceId));
    }, [dispatch, serviceId]);

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
          <img src={services.image} width="100%" className="small-img" alt="more pictures"/>
        </div>
        <div className="small-img-col">
          <img src={services.image} width="100%" className="small-img" alt="more pictures"/>
        </div>
        <div className="small-img-col">
          <img src={services.image}width="100%" className="small-img" alt="more pictures"/>
        </div>
        <div className="small-img-col">
          <img src={services.image} width="100%" className="small-img" alt="more pictures"/>
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
        <input type="submit" />
      </form>
      <div>Status</div>
      <div>{services.countInStock > 0 ? (
          <span className="success">Available</span> 
          )  : (
      <span className="danger">Unavailable</span> 
      )}
      
      </div>
      <a href="cart.html" className="btn">Book Appointment</a>
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
        )} 