import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { firebaseContext } from './store/context';
import firebase from './firebase/config';
import { authContext, Context } from './store/context';
import { Post } from './store/PostContext';

ReactDOM.render(
    <firebaseContext.Provider value={{ firebase }}>
        <Context>
            <Post>
                <App />
            </Post>
        </Context>
    </firebaseContext.Provider>
    , document.getElementById('root'));
