import React, { Fragment, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Create.css';
import Header from '../Header/Header';
import { authContext, firebaseContext } from '../../store/context';

const Create = () => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const navigate = useNavigate()

  const { firebase } = useContext(firebaseContext)
  const { user } = useContext(authContext)

  const today = new Date()

  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Months are zero-based (0 for January)
  const day = today.getDate();

  const handleProductSubmit = async (e) => {
    e.preventDefault()
    await firebase.storage().ref(`/images/${image.name}`).put(image).then(({ ref }) => {
      ref.getDownloadURL().then((url) => {
        console.log(url)
        firebase.firestore().collection('products').add({
          userId: user.uid,
          name: name,
          category: category,
          price: price,
          imageUrl: url,
          createdAt: `${day} / ${month} / ${year}`
        })
      })
    }).then(() => {
      console.log('PRODUCT ADDED')
      navigate('/')
    })
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e) => { setCategory(e.target.value) }}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" value={price} onChange={(e) => { setPrice(e.target.value) }} />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
          <form>
            <br />
            <input type="file" onChange={(e) => {
              setImage(e.target.files[0])
            }} />
            <br />
            <button className="uploadBtn" onClick={(e) => { handleProductSubmit(e) }}>upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
