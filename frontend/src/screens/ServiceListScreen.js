import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createService, listServices } from '../actions/serviceActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { SERVICE_CREATE_RESET } from '../constants/serviceConstants';

export default function ServiceListScreen(props) {
    const serviceList = useSelector((state) => state.serviceList);
    const { loading, error, services } = serviceList;

    const serviceCreate = useSelector((state) => state.serviceCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, service: createdService} = serviceCreate;
    const dispatch = useDispatch();
    useEffect(() => {
        if(successCreate){
            dispatch({type: SERVICE_CREATE_RESET})
            props.history.push(`/service/${createdService._id}/edit`)
        }
        dispatch(listServices);
    }, [createdService, dispatch, props.history, successCreate])
    const deleteHandler = () =>{
        //dispatch delete action

    };
    const createHandler = () =>{
        //dispatch create service action
        dispatch(createService());

    };
    return (
        <div>
            {/*Start coding */}
            <div className="row">
            <h1>Services</h1>
            <button
                type="button"
                className="btn"
                onClick={createHandler}
                >
                Create Service
                </button>
            </div>
            {loadingCreate && <LoadingBox></LoadingBox> }
            {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
            {loading ? <LoadingBox></LoadingBox>
                :
                error ? <MessageBox variant="danger">{error}</MessageBox>
                    :
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>LOCATION</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service) => (
                                <tr key={service._id}>
                                    <td>{service._id}</td>
                                    <td>{service.name}</td>
                                    <td>{service.price}</td>
                                    <td>{service.category}</td>
                                    <td>{service.location}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn"
                                            onClick={() => props.history.push(`/service/${service._id}/edit`)
                                             }
                                             >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className="btn"
                                            onClick={() => deleteHandler(service)}
                                             >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            }
            {/*End coding */}
        </div>
    )
}
