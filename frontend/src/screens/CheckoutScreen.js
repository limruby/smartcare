import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveCustomerAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'

export default function CheckoutScreen(props) {
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin;
    const cart = useSelector(state => state.cart);
    const { customerAddress } = cart;
    if(!userInfo){
        props.history.push('/signin')
    }
    const [fullName, setFullName] = useState(customerAddress.fullName);
    const [address, setAddress] = useState(customerAddress.address);
    const [city, setCity] = useState(customerAddress.city);
    const [postalCode, setPostalCode] = useState(customerAddress.postalCode);
    const [stateMsia, setStateMsia] = useState(customerAddress.stateMsia);
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveCustomerAddress({fullName, address, city, postalCode, stateMsia}))
        props.history.push('/payment')
        // Save customer address
    }
    return (
        <div>
            {/*Start coding */}
            <div>
                <CheckoutSteps step1 step2></CheckoutSteps>
                <form onSubmit={submitHandler}>
                    <div><h1>Customer Information</h1></div>
                    <br />
                    <div>
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            placeholder="Enter full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            placeholder="Enter address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            id="city"
                            placeholder="Enter city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="postalCode">Postal Code</label>
                        <input
                            type="text"
                            id="postalCode"
                            placeholder="Enter postal code"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            required
                        ></input>
                    </div>
                    <div>
                        <label htmlFor="state">State</label>
                        <input
                            type="text"
                            id="state"
                            placeholder="Enter state"
                            value={stateMsia}
                            onChange={(e) => setStateMsia(e.target.value)}
                            required
                        ></input>
                    </div>
                    <div>
                        <label />
                        <button className="btn" type="submit">
                            Continue
          </button>
                    </div>
                </form>
                {/*End coding */}

            </div>
        </div>
    )
}
