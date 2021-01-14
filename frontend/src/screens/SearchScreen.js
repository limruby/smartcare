import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listServices } from '../actions/serviceActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Service from '../components/Service';

export default function SearchScreen(props) {
    const { name = 'all', category='all' } = useParams();
    const dispatch = useDispatch();
    const serviceList = useSelector((state) => state.serviceList);
    const { loading, error, services } = serviceList;
    const serviceCategoryList = useSelector((state) => state.serviceCategoryList);
    const {
        loading: loadingCategories,
        error: errorCategories,
        categories,
    } = serviceCategoryList;
    useEffect(() => {
        dispatch( listServices({
            name: name !== 'all' ? name : '',
            category: category !== 'all' ? category : '',
          }));
    }, [dispatch, name, category]);
    const getFilterUrl = (filter) => {
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        return `/search/category/${filterCategory}/name/${filterName}`;
      };
    return (
        <div className="row">
            <div className="search-col">
                <div>
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                                <div>{services.length} Results</div>
                            )}
                </div>
                <div>
                    <h3>Department</h3>
                    {loadingCategories ? (
                        <LoadingBox></LoadingBox>
                    ) : errorCategories ? (
                        <MessageBox variant="danger">{errorCategories}</MessageBox>
                    ) : (
                                <ul>
                                    {categories.map((c) => (
                                        <li key={c}>
                                            <Link
                                                className={c === category ? 'active' : ''}
                                                to={getFilterUrl({ category: c })}
                                            >
                                                {c}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                </div>

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