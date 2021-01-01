import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

const redirect = props.location.search
? props.location.search.split('=')[1]
: '/';

const userRegister = useSelector((state) => state.userRegister);
const { userInfo, loading, error } = userRegister;

const dispatch = useDispatch();
const submitHandler = (e) =>{
    e.preventDefault();
    if(password !== confirmPassword){
      alert('Password and confirm password are not match')
    }else{
      dispatch(register(name, email, password))
    }
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
                  <span>Register</span>
                  <hr/>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                {/*Register*/}
                <form onSubmit={submitHandler}>
                  {/*Username*/}
                  <label htmlFor="name">Username</label>
                  <input 
                  type="text" 
                  placeholder="Enter username" 
                  id="name" 
                  required 
                  onChange={ e => setName(e.target.value)}>
                  </input>

                  {/*Email*/}
                  <label htmlFor="email">Email address</label>
                  <input 
                  type="email" 
                  placeholder="Enter email" 
                  id="email" 
                  required 
                  onChange={ e => setEmail(e.target.value)}>
                  </input>

                   {/*Pswd*/}
                  <label htmlFor="password">Password</label>
                  <input 
                  type="password" 
                  placeholder="Enter password" 
                  id="password" 
                  required 
                  onChange={ e => setPassword(e.target.value)}>
                  </input>

                  {/*Confirm Pswd*/}
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input 
                  type="password" 
                  placeholder="Confirm password" 
                  id="confirmPassword" 
                  required 
                  onChange={ e => setConfirmPassword(e.target.value)}>
                  </input>

                  <button type="submit" className="btn">Register</button>
                  <div>
                      Already have an account?
                      <br/>
                  <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
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
