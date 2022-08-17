import { MailOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'

import "./style.css"
import ContextUser from '../../context/ContextUser';
import axios from 'axios';
import ContextPay from '../../context/contextPay';
import { useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';
import Sigin from './Sigin';
import Login from './Login';

export default function LoginMain() {
    const { TabPane } = Tabs;
    const {user , login , logout}  = useContext(ContextUser)
    const {isPay} = useContext(ContextPay) ; 
    
    const nav = useNavigate()
    const {    handleSubmit , register  , setError , control } = useForm({
        defaultValues : {
            email : "" , 
            password : "" , 
        }
    })
    const [activeTab , setActiveTab] = useState("1")
    const handleChangeTab =(activeKey : any)=>{
      setActiveTab(activeKey)
    }
    const validateEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
  return (
    <div  className='login'>
        <Tabs activeKey={activeTab} onChange={(handleChangeTab)}   size="large" centered>
    <TabPane  tab="Login" key="1">
      <Login />
    </TabPane>
    <TabPane tab="Sign" key="2">
      <Sigin setActiveTab ={setActiveTab} />
    </TabPane>
  </Tabs>
    </div>
  )
}
