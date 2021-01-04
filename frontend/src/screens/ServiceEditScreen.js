import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsServices, updateService } from '../actions/serviceActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { SERVICE_UPDATE_RESET } from '../constants/serviceConstants';

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

    const serviceUpdate = useSelector((state) => state.serviceUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = serviceUpdate;

    const dispatch = useDispatch();
    useEffect(() => {
        if (successUpdate) {
            props.history.push('/servicelist');
        }
        if (!service || service._id !== serviceId || successUpdate) {
            dispatch({ type: SERVICE_UPDATE_RESET });
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
    }, [dispatch, props.history, service, serviceId, successUpdate])
    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch update service
        dispatch(updateService({
            _id: serviceId,
            name,
            price,
            image,
            category,
            schedule,
            location,
            description,
        })
        )
    }
    const [loadingUpload, setLoadingUpload] = useState(false)
    const [errorUpload, setErrorUpload] = useState('')

    const userSignin = useSelector((state) => state.userSignin)
    const { userInfo } = userSignin;
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file)
        setLoadingUpload(true);
        try {
            const { data } = await Axios.post('/api/uploads', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`,
                }
            })
            setImage(data)
            setLoadingUpload(false)
        } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false)
        }
    }

    return (
        <div>
            {/*Start coding */}
            <form onSubmit={submitHandler}>
                <div><h1>Edit Service {serviceId} </h1></div>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
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
                                    <label htmlFor="imageFile">Image File</label>
                                    <input
                                        type="file"
                                        id="imageFile"
                                        label="Choose Image"
                                        onChange={uploadFileHandler}
                                    ></input>
                                    {loadingUpload && <LoadingBox></LoadingBox>}
                                    {errorUpload && (
                                        <MessageBox variant="danger">{errorUpload}</MessageBox>
                                    )}
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
                                        name="schedule[]"
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
