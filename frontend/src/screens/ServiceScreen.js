import React from 'react'
import { Link } from 'react-router-dom'
import data from '../data'
import Rating from '../components/Rating';

export default function ServiceScreen(props){
    const service = data.services.find(x => x._id === props.match.params.id);
    if(!service){
        return <div>Service Not Found</div>
    }
    return (
//Single Product Details
<div>
    <Link to="/">Back to result</Link>
<div className="small-container single-product">
  <div className="row">
    <div className="col-2">
      <img src={service.image} width="100%" className="small-img" id="productImg" />
      <div className="small-img-row">
        <div className="small-img-col">
          <img src={service.image} width="100%" className="small-img" />
        </div>
        <div className="small-img-col">
          <img src={service.image} width="100%" className="small-img" />
        </div>
        <div className="small-img-col">
          <img src={service.image}width="100%" className="small-img" />
        </div>
        <div className="small-img-col">
          <img src={service.image} width="100%" className="small-img" />
        </div>
      </div>
    </div>
    <div className="col-2">
      <h2>{service.category}</h2>
      <h1>{service.name}</h1>
      <h4>{service.location}</h4>
      <h4>{service.price}</h4>
      <h5><Rating rating={service.rating} numReviews={service.numReviews}></Rating></h5>
      <form>
        <label>From:</label>
        <input type="date" id="from" name="from" />
      </form>
      <form>
        <label>To:</label>
        <input type="date" id="from" name="from" />
        <input type="submit" />
      </form>
      <div>Status</div>
      <div>{service.countInStock > 0 ? (
          <span className="success">Available</span> 
          )  : (
      <span className="error">Unavailable</span> 
      )}
      
      </div>
      <a href="cart.html" className="btn">Book Appointment</a>
      <h3>Service Details <i className="fa fa-indent" /></h3>
      <br />
      <p>{service.description}</p>
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