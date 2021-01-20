import React, { useState } from 'react';

export default function SearchBox(props) {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
            props.history.push(`/search/name/${name}/location/${location}`); 
    };
    return (
        <div className="row">
            <form onSubmit={submitHandler}>
                <div className="product-search">
                    <div className="search-element">
                        <label className="search-label">What service are you looking for?</label>
                        <input
                            type="text"
                            className="search-input"
                            name="q"
                            id="q"
                            autoComplete="on"
                            placeholder="Service Name"
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                    </div>
                    <div className="search-element">
                        <label className="search-label">Location</label>
                        <input 
                        type="text" 
                        className="search-input" 
                        placeholder="City, State" 
                        autoComplete="on" 
                        name="q"
                        id="q" 
                        onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <button className="search-button" type="submit">
                    <i className="fa fa-search"></i>
                </button>     
                </div>               
            </form>
        </div >
    );
}