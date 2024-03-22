import React, { useContext, useState } from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

import { firebaseContext } from '../../store/firebaseContext';

function Login() {

  const navigate = useNavigate()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState(null)
 
  const { firebase } = useContext(firebaseContext)


  const handleClick = async (e) => {
    e.preventDefault()
  
    try {

      if (!email || !password) {
        setError("All field are required")
      }

      await firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
        console.log("RESULT Login : " + result)
        console.log('LOGGED IN')
        console.log("AUTH : "+firebase.auth().currentUser.displayName)
      }).then(() => {
        navigate('/')
      })
    } catch(error) {
      console.log("CODE : "+error.code, "MSG : "+error.message)
      if (error.code === "auth/internal-error") setError("Email address and password doesn't match")
      setError(error.message)
    }
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
            onChange={(e) =>  setEmail(e.target.value) }
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value) }
            id="lname"
            name="password"
          />
          <br />
          <br />
          {error && <div style={{width : "200px"}}><p style={{ color: 'red' }}>{error}</p></div>}
          <button onClick={(e) =>  handleClick(e) }>Login</button>
        </form>
        <Link to={'/signup'}>
          <span>Signup</span>
        </Link>
      </div>
    </div>
  );
}

export default Login;
