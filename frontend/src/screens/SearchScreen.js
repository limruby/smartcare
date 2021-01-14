import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listServices } from '../actions/serviceActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Service from '../components/Service';

export default function SearchScreen(props) {
    const { name = 'all' } = useParams();
    const dispatch = useDispatch();
    const serviceList = useSelector((state) => state.serviceList);
    const { loading, error, services } = serviceList;
    useEffect(() => {
        dispatch(listServices({ name: name !== 'all' ? name : '' }));
    }, [dispatch, name]);
    return (
        <div className="row">
            <div className="search-col">
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                            <div>{services.length} Results</div>
                        )}

                <h3>Department</h3>
                <ul>
                    <li>Category 1</li>
                </ul>
            </div>
            <div className="search-col-3">
                <div className="row">
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                                <>
                                    {services.length === 0 && (
                                        <MessageBox>No service Found</MessageBox>
                                    )}
                                    <div className="row center">
                                        {services.map((service) => (
                                            <Service key={service._id} service={service}></Service>
                                        ))}
                                    </div>
                                </>
                            )}
                </div>
            </div>
        </div>
    );
}