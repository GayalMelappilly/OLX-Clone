import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import Logo from '../../olx-logo.png';
import './Signup.css';

import { firebaseContext } from '../../store/context';

export default function Signup() {
  const navigate = useNavigate()
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState(null)
  const { firebase } = useContext(firebaseContext)

  const handleClick = async (e) => {

    e.preventDefault()

    try {

      if (!email || !password || !phone || !username) {
        setError("All field are required")
      }

      await firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
        console.log("RESULT : " + result)
        result.user.updateProfile({ displayName: username }).then(() => {
          firebase.firestore().collection('users').add({
            id: result.user.uid,
            username: username,
            email: email,
            phone: phone,
          }).then(() => {
            navigate('/login')
          })
        })
      })
    } catch(error) {
        console.log("EMAIL INVALID " + error.message)
        if (error.code === "auth/argument-error") setError("Invalid email address")
        else setError(error.message)
      }   
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => { setUsername(e.target.value) }}
            id="fname"
            name="name"
            placeholder='Username'
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            placeholder='Email Address'
            className="input"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            placeholder='Phone No.'
            className="input"
            type="number"
            value={phone}
            onChange={(e) => { setPhone(e.target.value) }}
            id="lname"
            name="phone"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            placeholder='Password'
            className="input"
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            id="lname"
            name="password"
          />
          <br />
          <br />
          {error && <div style={{width : "200px"}}><p style={{ color: 'red' }}>{error}</p></div>}
          <button onClick={(e) => { handleClick(e) }}>Signup</button>
        </form>
        <Link to={'/login'}>
          <span>Login</span>
        </Link>
      </div>
    </div>
  );
}
