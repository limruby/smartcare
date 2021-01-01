import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SigninScreen(props) {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const redirect = props.location.search
? props.location.search.split('=')[1]
: '/';

const userSignin = useSelector((state) => state.userSignin);
const { userInfo, loading, error } = userSignin;

const dispatch = useDispatch();
const submitHandler = (e) =>{
    e.preventDefault();
    dispatch(signin(email, password))
};
useEffect(() =>{
    if(userInfo) {
        props.history.push(redirect);
    }
}, [props.history, redirect, userInfo]);
    return (
        <div>
            {/* Start developing here */}

    <div className="account-page">
        <div className="container">
          <div className="row">
            <div className="col-2">
              <img src="images/1.jpg" width="100%" alt="image_signinScreen" />
            </div>
            <div className="col-2">
              <div className="form-container">
                <div className="form-btn">
                  <span>Log In</span>
                  <hr/>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                {/*Login*/}
                <form onSubmit={submitHandler}>
                  {/*Email login*/}
                  <label htmlFor="email">Email address</label>
                  <input 
                  type="email" 
                  placeholder="Enter email" 
                  id="email" 
                  required 
                  onChange={ e => setEmail(e.target.value)}>
                  </input>

                   {/*Pswd login*/}
                  <label htmlFor="password">Password</label>
                  <input 
                  type="password" 
                  placeholder="Enter password" 
                  id="password" 
                  required 
                  onChange={ e => setPassword(e.target.value)}>
                  </input>
                  <button type="submit" className="btn">Sign In</button>
                  <div>
                      New customer?
                      <br />
                  <Link to={`/register?redirect=${redirect}`}>Create your account </Link>
                  </div>
                </form>
                 
              </div>
            </div>
          </div>
        </div>
      </div>


            {/* End of the screen */}
        </div>
    )
}
