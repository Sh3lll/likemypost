import React, {useState} from 'react';
import { Button } from 'antd';
import {db, storage} from '../firebase';
import firebase from 'firebase/compat/app';
import styled from 'styled-components'

const ImageUploadContainer = styled.div`
display: flex;
flex-direction: column;
width: 50%;
margin-left: auto;
margin-right: auto;
margin-top:  10px;
margin-bottom: 10px;
background-color: white;
border-top: 1px solid lightgray;

`


function ImageUpload({ username }) {
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
  
    const handleChange = (e) => {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };
  
    const handleUpload = () => {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
          alert(error.message);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imageUrl: url,
                username: username,
              });
  
              setProgress(0);
              setCaption("");
              setImage(null);
            });
        }
      );
    };
  
    return (
      <ImageUploadContainer>       
       
       
        <progress style={{width: '100%', color:"#6C63FF"}}  value={progress} max="100" />
        <br></br>
        <input

          type="text"
          placeholder="Enter a caption"
          onChange={(event) => setCaption(event.target.value)}
          value={caption}
        />
        <br></br>

        <input style={{color:"#6C63FF"}} type="file" onChange={handleChange} />
        <br></br>

        <Button style={{backgroundColor: "#6C63FF"}}  onClick={handleUpload}>
          Upload
        </Button>
      </ImageUploadContainer>
    );
  }
export default ImageUpload
