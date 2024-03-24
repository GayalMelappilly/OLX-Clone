import React, { useContext, useEffect, useState } from 'react';

import './View.css';

import { authContext, firebaseContext } from '../../store/context';
import { useParams } from 'react-router-dom';
import { postContext } from '../../store/PostContext';

function View() {
  const { firebase } = useContext(firebaseContext)
  const { user } = useContext(authContext)
  const [product, setProduct] = useState([])
  const [userInfo, setUserInfo] = useState()

  const {postDetails} = useContext(postContext)

  const id = useParams().id
  useEffect(() => {
    const {userId} = postDetails
      console.log('USER ID : '+userId)
      firebase.firestore().collection('users').where('id', '==', userId).get().then((res)=>{
        res.forEach((doc)=>{
          console.log('USER INFO : ' + doc.data())
          setUserInfo(doc.data())
        })
      })
  }, [])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.imageUrl}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createAt}</span>
        </div>
        {userInfo && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userInfo.username}</p>
          <p>{userInfo.phone}</p>
          <p>{userInfo.email}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
