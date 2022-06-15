import React, { useState, useEffect } from 'react';
import {db} from '../firebase';
import firebase from 'firebase/compat/app';
import styled from 'styled-components';
import Avatar  from '@mui/material/Avatar';
import ImageUpload from './ImageUpload';

const PostContainer = styled.div`    
    
    background-color: white;
    border: 1px solid lightgray;
    max-width: 500px;
    margin-bottom: 45px;
  
`

const AvatarUsernameContainer = styled.div`
    
    display: flex;
    align-items: center;
    padding: 20px;

`

const Text = styled.div `
    fontWeight: normal;
    padding: 20px;

`


function Post ({username, caption, imageUrl, postId, user}) {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let unsubscribe;
        if (postId) {
          unsubscribe = db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
              setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }
        return () => {
          unsubscribe();
        };
      }, [postId]);

      const postComment = (e) => {
        e.preventDefault();
    
        db.collection("posts").doc(postId).collection("comments").add({
          text: comment,
          username: user.displayName,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
      };


  return (
    <PostContainer>
        
        <AvatarUsernameContainer>

 
        <Avatar
            style={{margin:'10px' ,}}
            alt="Avatar"
          //  src="/broken-image.jpg"
            >

            </Avatar>
        <h3>{username}</h3>
       
        </AvatarUsernameContainer>
       

       
           <img 
        style={{ objectFit: 'contain', width: '100%', 
         borderTop:'1px solid lightgray' , borderBottom: '1px solid lightgray'}}
        src={imageUrl}       
          alt='post'
      >
          </img>

        <Text>

         <strong>{username}</strong> {caption} 
        

        </Text>
        <Text style={{color:"#6C63FF"}}>Comments</Text>

        <Text>
        {comments.map((comment) => (
          <p>
            
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
     </Text>
    

     <form>
          <input
            className="post__input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          &nbsp;
          <button
          style={{ flex:0, backgroundColor:"#6C63FF", color:"white"}}
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>

  

    </PostContainer>

   
  );
}

export default Post
