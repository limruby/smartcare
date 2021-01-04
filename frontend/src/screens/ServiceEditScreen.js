import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsServices } from '../actions/serviceActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ServiceEditScreen(props) {
    const serviceId = props.match.params.id;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [schedule, setSchedule] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const serviceDetails = useSelector((state) => state.serviceDetails);
    const { loading, error, service } = serviceDetails;
    const dispatch = useDispatch();
    useEffect(() => {
        if (!service || (service._id !== serviceId)) {
            dispatch(detailsServices(serviceId));
        } else {
            setName(service.name);
            setPrice(service.price);
            setImage(service.image);
            setCategory(service.category);
            setSchedule(service.schedule);
            setLocation(service.location);
            setDescription(service.description);
        }
    }, [dispatch, service, serviceId])
    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch update service
    }

    return (
        <div>
            {/*Start coding */}
            <form onSubmit={submitHandler}>
                <div><h1>Edit Service {serviceId} </h1></div>
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                            <>
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="price">Price</label>
                                    <input
                                        id="price"
                                        type="text"
                                        placeholder="Enter price"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="image">Image</label>
                                    <input
                                        id="image"
                                        type="text"
                                        placeholder="Enter image"
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="category">Category</label>
                                    <input
                                        id="category"
                                        type="text"
                                        placeholder="Enter category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="schedule">Schedule</label>
                                    <input
                                        id="schedule"
                                        type="text"
                                        name = "schedule[]"
                                        placeholder="Enter schedule"
                                        value={schedule}
                                        onChange={(e) => setSchedule(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="location">Location</label>
                                    <input
                                        id="location"
                                        type="text"
                                        placeholder="Enter location"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        id="description"
                                        rows="5"
                                        type="text"
                                        placeholder="Enter description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>
                                <div>
                                    <label></label>
                                    <button className="btn" type="submit">
                                        Update
                                    </button>
                                </div>
                            </>
                        )}
            </form>

            {/*End coding */}
        </div>
    )
}
