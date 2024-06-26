import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';

import { authContext, firebaseContext } from '../../store/context';
import { Link, useNavigate } from 'react-router-dom';
import { postContext } from '../../store/PostContext';

function Posts() {

  const { firebase } = useContext(firebaseContext)
  const [data, setData] = useState([''])

  const navigate = useNavigate()

  const {postDetails, setPostDetails} = useContext(postContext)

  useEffect(() => {
    const getData = async () => {
      await firebase.firestore().collection('products').get().then((snapshot) => {
        const allPost = snapshot.docs.map((product)=>{
          return {
            ...product.data(),
            id: product.id
          }
        })
        setData(allPost)
        console.log("DATA : " + data)
      })
    }
    getData()
  }, [firebase])


  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {data.map((obj) => (
              <div className="card" onClick={()=>{
                setPostDetails(obj)
                navigate(`/view-product/${obj.id}`)
              }}>
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={obj.imageUrl} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {obj.price}</p>
                  <span className="kilometer">{obj.category}</span>
                  <p className="name">{obj.name}</p>
                </div>
                <div className="date">
                  <span>{obj.createdAt}</span>
                </div>
              </div>
          ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
