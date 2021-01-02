import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listServices } from '../actions/serviceActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ServiceListScreen(props) {
    const serviceList = useSelector((state) => state.serviceList);
    const { loading, error, services } = serviceList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listServices);
    }, [dispatch])
    const deleteHandler = () =>{
        //dispatch delete action

    };
    return (
        <div>
            {/*Start coding */}
            <h1>Services</h1>
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
