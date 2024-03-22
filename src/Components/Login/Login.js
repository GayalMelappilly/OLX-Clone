import React, { useContext, useState } from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';

import { firebaseContext } from '../../store/firebaseContext';

function Login() {

  const navigate = useNavigate()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const { firebase } = useContext(firebaseContext)


  const handleClick = (e) => {
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
      console.log("RESULT Login : " + result)
      console.log('LOGGED IN')
    }).then(() => {
      navigate('/')
    })
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt='logo'></img>
        <form>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.password) }
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button onClick={(e) =>  handleClick(e) }>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
