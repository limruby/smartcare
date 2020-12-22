import React from 'react'
import Service from '../components/Service'
import data from '../data';

export default function HomeScreen(){
    return (
        <div className="row">
          {data.services.map((service) => 
          <Service key = {service._id} service = {service}></Service>
          
          )}         
          {/*END OF COLUMN*/}      
        </div>   
        )} 