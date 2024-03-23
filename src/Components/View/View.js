import React, { useContext, useEffect, useState } from 'react';

import './View.css';

import { authContext, firebaseContext } from '../../store/context';
import { useParams } from 'react-router-dom';

function View() {
  const { firebase } = useContext(firebaseContext)
  const {user} = useContext(authContext)
  const [product, setProduct] = useState([])
  const [userInfo, setUserInfo] = useState([])

  const id = useParams().id

  console.log("ID : "+user.uid)
  useEffect(() => {
    const getDoc = async () => {
      const doc = await firebase.firestore().collection('products').doc(id).get()
      firebase.firestore().collection('users').where(id, '==', user.uid).get().then((snapshot)=>{
        setUserInfo(snapshot)
      })
      setProduct(doc.data())
      console.log('USER INFO : '+userInfo)
    }
    getDoc()
  }, [id])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src="../../../Images/R15V3.jpg"
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {product.price} </p>
          <span>{product.name}</span>
          <p>{product.category}</p>
          <span>{product.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{user.displayName}</p>
          <p>{user.phoneNumber}</p>
          <p>{user.emailAddress}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
