
import './App.css';
import {BrowserRouter as Router, Route, Link, Routes, useNavigate} from 'react-router-dom';
import Cart from './page/cart';
import Manage from './page/manage';
import List from './page/list';
import Pay from './page/pay';
import { useState, useEffect, FC, useContext } from 'react';
import Detail from './page/detail';
import { useDispatch } from 'react-redux';
import 'antd/dist/antd.css';
import { Avatar, Button, Col, Dropdown, Image, Menu, message, Row } from 'antd';

import ContextUser from './context/ContextUser';
import { LogoutOutlined } from '@ant-design/icons';
import iconAvatar from "./img/bear.png"
import ContextFood from './context/ConTextFood';
import axios from 'axios';
import LoginMain from './page/login';

const   App : FC = ()=> {

  const {user , login , logout}  = useContext(ContextUser) ; 
  const {food , setFood} = useContext(ContextFood)
  
useEffect(()=>{
  axios({
    method : "GET" , 
    url : "https://62cfa0e8486b6ce82658f3bd.mockapi.io/getFood/food"
  }).then(({data})=>{
    
    setFood(data)
  }).catch((err)=>{
    console.log(err)
    setFood([])
  })
} , [])
const handleLogout =()=>{
  logout() ; 
  message.success("Logout success ")
}
const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <p>
            <h3 style={{display :"inline-block"}}>
            Hi ! {"  "}  
            </h3>
            <span>
                 {Object.keys(user).length != 0  &&  `  ${user.nickname}`}
             </span>
          </p>
        ),
      },
      {
        key: '2',
        label: (
          <div onClick={handleLogout}>
            <LogoutOutlined  />
            <span style={{marginLeft : "1rem"}} >Logout</span>
          </div>
        ),
      }
    ]}
  />
);

  return (
    
    <Router>
      <div className='app'>
        <nav>
          <Row className='container'>
            <Col span={9}>
          <Row align='middle' justify='start' >
            <Col  span={8}>
              <Link to="/">List</Link>
            </Col>
            <Col span={8}>
              <Link to="/cart">Cart</Link>
            </Col>
            <Col flex={1} span={8}>
              <Link to="/manage">Manage</Link>
            </Col>
          
          </Row>
          </Col>
          <Col span={14}>
            <Row justify='end'>
            {Object.keys(user).length === 0  ? <Button size='middle' type='primary'
                                                ><Link className='btn-login' style={{color : "#fff"}} to="/login">Login</Link></Button>  
                                             :      <Dropdown overlayStyle={
                                              {
                                                width : "170px"
                                              }
                                             } overlay={menu} placement="bottomRight" 
                                             arrow={{
                                              pointAtCenter: true,
                                            }}
                                             >
                                                <Avatar
                                                  src={ iconAvatar}/>
                                              </Dropdown>
                                               }
       
       
          {/* <p style={{textAlign : "right"}}><span>Hi ! </span> Hieu Nguyen</p> */}
              {/* {Object.keys(user).length === 0 && <Button><LogoutOutlined /></Button>}  */}
          </Row>
          </Col>
             
       
          </Row>
        </nav>
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginMain />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/pay" element={<Pay  />} />
          <Route path="/" element={
                                 <List/>} 
                                  />
          <Route path="/detail" element={<Detail />} />
        </Routes>
        </div>
    </Router>
  );
}

export default App;
