import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { authContext, firebaseContext } from '../../store/context';
import { postContext } from '../../store/PostContext';
import FadeLoader from 'react-spinners/FadeLoader'

function View() {
  const { firebase } = useContext(firebaseContext)
  const { postDetails } = useContext(postContext)
  const [userInfo, setUserInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(true) // Set initial loading state to true
  const [product, setProduct] = useState('')

  console.log("PD : " + postDetails)
  setProduct(postDetails)
  const { userId } = product

  useEffect(() => {
    setIsLoading(true) // Set loading state to true when starting to fetch data
    firebase.firestore().collection('users').where('id', '==', userId).get().then((res) => {
      res.forEach((doc) => {
        setUserInfo(doc.data())
        setIsLoading(false) // Set loading state to false when data fetching is complete
      })
    })
  }, [firebase, postDetails])

  if (isLoading) {
    return (
      <div>
        <FadeLoader
          className='loading'
          color='#000000'
          size={300}
        />
      </div>
    )
  }

  return (
    <div className="viewParentDiv">
      {product && <div className="imageShowDiv">
        <img
          src={product.imageUrl}
          alt=""
        />
      </div>}
      <div className="rightSection">
        {product && <div className="productDetails">
          <p>&#x20B9; {product.price}</p>
          <span>{product.name}</span>
          <p>{product.category}</p>
          <span>{product.createAt}</span>
        </div>}
        {userInfo && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userInfo.username}</p>
          <p>{userInfo.phone}</p>
          <p>{userInfo.email}</p>
          <button className='chat-btn'>Chat with the seller</button>
        </div>}
      </div>
    </div>
  );
}

export default View;
