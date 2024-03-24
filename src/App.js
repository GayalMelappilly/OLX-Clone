import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import FadeLoader from 'react-spinners/FadeLoader'
import { authContext } from './store/context';
import { firebaseContext } from './store/context';
import Create from './Components/Create/Create';
import ViewPost from './Pages/ViewPost';
import { Post } from './store/PostContext';

function App() {
  const { user, setUser } = useContext(authContext)
  const [loading, setLoading] = useState()
  const { firebase } = useContext(firebaseContext)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 800)
  }, [])

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user)
    })
  })

  return (
    <div>
      {loading ? <div className='loading'><FadeLoader
        className='loading'
        color='#000000'
        loading={loading}
        // cssOverride={override}
        size={300}
      /></div> :
          <Router>

            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route path='/create' element={<Create />} />
              <Route path='/view-product/:id' element={<ViewPost />} />
            </Routes>

          </Router>
      }
    </div>
  );
}

export default App;
