import React, {useEffect, useState} from 'react';
import './App.css';
import styled from 'styled-components'
import 'antd/dist/antd.css';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Modal, Form, Input, message, Row} from 'antd';
import headerimg from '../src/assets/images/headerimg.png'
import PostContainer from './components/Post';
import {db, auth,} from './firebase';
import logo from '../src/assets/images/logo.png';
import ImageUpload from './components/ImageUpload';



const LoginContainer = styled.div`
display: flex;
flex-direction: column;

`

const Posts = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;

`


const Header = styled.div`
position: sticky;
top:0;
z-index: 1;
display: flex;
justify-content: space-between;
background-color: white;
padding: 20px;
border-bottom: 1px solid lightgray;
object-fit: contain;

`


const Right = styled.div`
  margin-left: 20px;
  
`

const Left = styled.div`

  
`


function App() {

  const [posts, setposts] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [user, setUser] = useState(null);
  const [authUser,setAuthuser] = useState("")

  



  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection('posts')
    .orderBy("timestamp", "desc")
    .onSnapshot((snapshot) => {
        setposts(
          snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        })));
      })
 

  }, []);

  

 

  const signUp = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username,
      });
    })
   
    
    .catch((error) => alert(error.message))

    setIsModalVisible(false)


  }

  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      
    .catch((error) => alert(error.message))

    setIsModalVisible1(false);


  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showModal1 = () => {
    setIsModalVisible1(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleOk1 = () => {
    setIsModalVisible1(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  

  const handleCancel1 = () => {
    setIsModalVisible1(false);
  };

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 12 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 12 },
      sm: { span: 20 },
    },
  };

  const tailLayout = {
    wrapperCol: {
      xs: { span: 8},
      sm: { span: 16 }
    },
  };
  return (

   
    <div className="App">



   
    {/* SIGN UP MODAL */}


      <Modal footer={null} onOk={handleOk} onCancel={handleCancel} closable={true} visible={isModalVisible}>
     <center>
      <Row style={{  justifyContent:'center'}}>
               <img 
                width="150" height ="70"
                src={headerimg}/>
      </Row>

      <Row style={{justifyContent:'center'}}>

            <img 
                width="150" height ="100"
                src={logo}/>
      </Row>

      
    
           

      <Form
          
            autoComplete="off"
            onFinish={onFinish}
            {...formItemLayout}
            
          >
            <Form.Item
              label='Username'
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              rules={[
                {
                  required: false,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>

            <Form.Item
            label="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              rules={[
                {
                  required: true,
                  message: 'Please input your Email!',
                  type: 'email'
                },
              ]}
            >
              <Input  prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item  {...tailLayout}>
              <Button style={{width: '100%', borderRadius:'12px', width: '30%', float:'right', textAlign:'center', backgroundColor:'#6C63FF' }} onClick={signUp} type="primary" htmlType="submit" className="login-form-button">
                SIGN UP
              </Button>
            
            </Form.Item>
          </Form>
     </center>
     
        
      </Modal>

{/* SIGN IN MODAL */}



      <Modal  footer={null} onOk={handleOk1} onCancel={handleCancel1} closable={true} visible={isModalVisible1}>
     <center>
      <Row style={{justifyContent:'center'}}>
             <img 
                width="150" height ="70"
                src={headerimg}/>
      </Row>

      <Row style={{justifyContent:'center'}}>

              <img 
                width="150" height ="100"
                src={logo}/>
      </Row>

           

    <Form
        
          autoComplete="off"
          onFinish={onFinish}
          {...formItemLayout}
          
        >
   

      <Form.Item
      label="Email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
            type: 'email'
          },
        ]}
      >
        <Input  prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
       onChange={(e) => setPassword(e.target.value)}
       label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

    
     

      <Form.Item  {...tailLayout}>
        <Button style={{width: '100%', borderRadius:'12px', width: '30%', float:'right', textAlign:'center', backgroundColor:'#6C63FF' }} onClick={signIn} type="primary" htmlType="submit" className="login-form-button">
          SIGN IN
        </Button>
       
      </Form.Item>
    </Form>
     </center>
     
        
      </Modal>


      
    

     {/* Header */}
     <Header>
        <img 
        style={{  }}
        width="150" height="70"
          className='headerImg'
          src={headerimg}
          alt='header image'
      >
          </img>

          {
          user ? (
            <Button style={{backgroundColor:"#6C63FF", color:"white"}} onClick={() => auth.signOut()}>LOG OUT</Button>
          ): (

            <LoginContainer>
   <Button style={{backgroundColor:"#6C63FF", color:"white"}} onClick={showModal1}>SIGN IN</Button>
      <Button style={{backgroundColor:"#6C63FF", color:"white"}} onClick={showModal}>SIGN UP</Button>
            </LoginContainer>
           
          )
        }
     </Header>
      
       
      <Posts>
        <Left>
        {
      posts.map(({id, post})=> (
        <PostContainer
         key={id}
         postId={id}
         user={user}
         username={post.username}
         caption={post.caption}
         imageUrl={post.imageUrl}/>
      ))
     }
        </Left>

        <Right>

      
        {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>To Upload, please LOG IN.</h3>
      )}
       
        
        </Right>
     
      </Posts>
  
    </div>
  );
}

export default App;
