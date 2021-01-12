import React, {useEffect} from 'react'
import Service from '../components/Service'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listServices } from '../actions/serviceActions';

export default function HomeScreen(){
  const dispatch = useDispatch();
  const serviceList = useSelector((state) => state.serviceList);
  const { loading, error, services } = serviceList;

  useEffect(() =>{
    dispatch(listServices({}));
  }, [dispatch])

    return (
      <div>
         <h1>Our Service</h1>
        {loading? (<LoadingBox></LoadingBox>)
        :
        error? (<MessageBox variant ="danger">{error}</MessageBox>)
        : (<div className="row">
        {services.map((service) => (
        <Service key = {service._id} service = {service}></Service>   
        ))}             
        </div> 
        )}
      </div>    
        );
      } 