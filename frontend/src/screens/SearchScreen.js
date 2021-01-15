import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listServices } from '../actions/serviceActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import Service from '../components/Service';
import { prices, ratings } from '../utils';

export default function SearchScreen(props) {
    const {
        name = 'all',
        category = 'all',
        min = 0,
        max = 0,
        rating = 0,
        order = 'newest',
    } = useParams();
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
        dispatch(listServices({
            name: name !== 'all' ? name : '',
            category: category !== 'all' ? category : '',
            min,
            max,
            rating,
            order,
        }));
    }, [dispatch, name, category, min, max, rating, order]);
    const getFilterUrl = (filter) => {
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        const filterRating = filter.rating || rating;
        const sortOrder = filter.order || order;
        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
        const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
        return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`;
    };
    return (
        <div>
            <div className="row row-2">
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                                <div>{services.length} Results</div>
                            )}
                <div>
                    Sort by{' '}
                    <select
                        value={order}
                        onChange={(e) => {
                            props.history.push(getFilterUrl({ order: e.target.value }));
                        }}
                    >
                        <option value="newest">Newest Services</option>
                        <option value="lowest">Price: Low to High</option>
                        <option value="highest">Price: High to Low</option>
                        <option value="toprated">Avg. Customer Reviews</option>
                    </select>
                </div>
                
        </div>
        <div className="row-category">           
            <div className="search-col">               
                <div className="col-3">
                    <h2>Category</h2>
                    {loadingCategories ? (
                        <LoadingBox></LoadingBox>
                    ) : errorCategories ? (
                        <MessageBox variant="danger">{errorCategories}</MessageBox>
                    ) : (
                                <ul>
                                    <li>
                                        <Link
                                            className={'all' === category ? 'active' : ''}
                                            to={getFilterUrl({ category: 'all' })}
                                        > Any </Link>
                                    </li>
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
                <div className="col-3">
                    <h2>Price</h2>
                    <ul>
                        {prices.map((p) => (
                            <li key={p.name}>
                                <Link
                                    to={getFilterUrl({ min: p.min, max: p.max })}
                                    className={
                                        `${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''
                                    }
                                >
                                    {p.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-3">
                    <h2>Average Customer Review</h2>
                    <ul>
                        {ratings.map((r) => (
                            <li key={r.name}>
                                <Link
                                    to={getFilterUrl({ rating: r.rating })}
                                    className={`${r.rating}` === `${rating}` ? 'active' : ''}
                                >
                                    <Rating caption={' & up'} rating={r.rating}></Rating>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="search-col-3">
                <div className="row-category">
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                                <>
                                    {services.length === 0 && (
                                        <MessageBox>No service Found</MessageBox>
                                    )}
                                    <div className="row">
                                        {services.map((service) => (
                                            <Service key={service._id} service={service}></Service>
                                        ))}
                                    </div>
                                </>
                            )}
                </div>
            </div>
        </div>
        </div>
    );
}