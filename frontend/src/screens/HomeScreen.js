import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Service from '../components/Service'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function HomeScreen(){
  //fetch AJAX data from server to frontend
  const[services, setServices] = useState([]);
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState(false);

  useEffect(() =>{
    const fetchData = async () =>{
      try{
      setLoading(true)
      const { data } = await axios.get('/api/services')
      setLoading(false)
      setServices(data)

      }catch(err){
        setError(err.message);
        setLoading(false);
      }
      
    };
    fetchData();
  }, [])

    return (
      <div>
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