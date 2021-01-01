import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'

export default function PaymentMethodScreen(props) {
    const cart = useSelector((state) => state.cart)
    const { customerAddress } = cart;
    if(!customerAddress.address){
        props.history.push('/shipping')
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placebooking');
    }

    return (
        <div>
            {/*Start coding */}
            <div>
                <CheckoutSteps step1 step2 step3></CheckoutSteps>
                <form onSubmit={submitHandler}>
                    <div><h1>Payment Method</h1></div>
                    {/*PayPal*/}
                    <div>
                        <div>
                            <input
                                type="radio"
                                id="paypal"
                                value="PayPal"
                                name="paymentMethod"
                                required
                                checked
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            ></input>
                            <label htmlFor="paypal">PayPal</label>
                        </div>
                    </div>
                    {/*Stripe*/}
                    <div>
                        <div>
                            <input
                                type="radio"
                                id="stripe"
                                value="Stripe"
                                name="paymentMethod"
                                required
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            ></input>
                            <label htmlFor="stripe">Stripe</label>
                        </div>
                    </div>
                    <div>
                        <button className="btn" type="submit">Continue</button>
                    </div>
                </form>
            </div>
            {/*End coding */}
        </div>
    )
}