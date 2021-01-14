import React, { useEffect } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import Service from '../components/Service'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listServices } from '../actions/serviceActions';
import { listTopSellers } from '../actions/userActions';
import { Link } from 'react-router-dom';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const serviceList = useSelector((state) => state.serviceList);
  const { loading, error, services } = serviceList;

  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const { loading: loadingSellers, error: errorSellers, users: sellers } = userTopSellersList;

  useEffect(() => {
    dispatch(listServices({}));
    dispatch(listTopSellers());
  }, [dispatch])

  return (
    <div>
      <h1>Top Service Provider</h1>
      {loadingSellers ? (<LoadingBox></LoadingBox>)
        :
        errorSellers ? (<MessageBox variant="danger">{errorSellers}</MessageBox>
        )  : (
          <>
          {sellers.length === 0 && <MessageBox>No Service Provider Found</MessageBox>}
          <Carousel showArrows autoPlay showThumbs={false}>
            {sellers.map((seller) => (
              <div key={seller._id}>
                <Link to={`/seller/${seller._id}`}>
                <img src={seller.seller.logo} alt={seller.seller.name} />
                  <p className="legend">{seller.seller.name}</p>
                </Link>
              </div>
            ))}
          </Carousel>
        </>
          )}
      <h1>Featured Services</h1>
      {loading ? (<LoadingBox></LoadingBox>)
        :
        error ? (<MessageBox variant="danger">{error}</MessageBox>)
          : (<div className="row">
            {services.map((service) => (
              <Service key={service._id} service={service}></Service>
            ))}
          </div>
          )}
    </div>
  );
} 