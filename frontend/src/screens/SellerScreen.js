import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listServices } from '../actions/serviceActions';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import Service from '../components/Service';

export default function SellerScreen(props) {
    const sellerId = props.match.params.id;
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const serviceList = useSelector((state) => state.serviceList);
    const {
        loading: loadingServices,
        error: errorServices,
        services,
    } = serviceList;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(detailsUser(sellerId));
        dispatch(listServices({ seller: sellerId }));
    }, [dispatch, sellerId]);

    return (
        <div className="row-3">
            {/*Start coding */}
            <div className="col-1">
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                            <ul className="card card-body">
                                <li>
                                    <div className="row-3">
                                        <div>
                                            <h1>{user.seller.name}</h1>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <Rating rating={user.seller.rating} numReviews={user.seller.numReviews}></Rating>
                                </li>
                                <li>
                                    <a href={`mailto:${user.email}`}>Contact Seller</a>
                                </li>
                                <li>
                                    {user.seller.description}
                                </li>

                            </ul>
                        )

                }

            </div>
            <div className="row">
                {loadingServices ? (
                    <LoadingBox></LoadingBox>
                ) : errorServices ? (
                    <MessageBox variant="danger">{errorServices}</MessageBox>
                ) : (
                            <>
                                {services.length === 0 && <MessageBox>No Service Found</MessageBox>}
                                <div className="row">
                                    {services.map((service) => (
                                        <Service key={service._id} service={service}></Service>
                                    ))}
                                </div>
                            </>
                        )}
            </div>
            {/*End coding */}
        </div>
    )
}
