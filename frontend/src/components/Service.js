import React from 'react'
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Service(props){
    const {service} = props;
    return (
        <div key= {service._id} className="col-4">
           <Link to={`/service/${service._id}`}> 
          <img src={service.image} alt="services_image" /> 
          </Link>
          <h2>{service.name}</h2>
             <Rating rating={service.rating} numReviews={service.numReviews}></Rating>
             
             <p>RM {service.price}</p>            
               <p>{service.location}</p>
               <div className="row-3">
               <Link to={`/seller/${service.seller._id}`}>Service Provider: {service.seller.seller.name}</Link>
               </div>
               </div>
          )}                