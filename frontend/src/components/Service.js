import React from 'react'
import Rating from './Rating';

export default function Service(props){
    const {service} = props;
    return (
        <div key= {service._id} className="col-4">
          <a href={`/service/${service._id}`}> <img src={service.image} alt="services_image" /> </a>
          <h4>{service.name}</h4>
             <Rating rating={service.rating} numReviews={service.numReviews}></Rating>
               <p>{service.price}</p>
               <p>{service.location}</p>
               </div>
          )}                