import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, message, Row } from 'antd';
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import {RiLockPasswordLine} from "react-icons/ri"
import "../style.css"

import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';
import ContextUser from '../../../context/ContextUser';
import ContextPay from '../../../context/contextPay';
import TextField from '../../../field/TextField';

export default function Sigin({setActiveTab }: any) {
    const { TabPane } = Tabs;
    const {user , login , logout}  = useContext(ContextUser)
    const {isPay} = useContext(ContextPay) ; 
    const nav = useNavigate()
    const {    handleSubmit ,reset ,  register  , setError , control } = useForm({
        defaultValues : {
            email : "" , 
            password : "" , 
        }
    })
    
    const handleSign = (dataSubmit : any)=>{
        
        try {
            axios({
                method : "POST" , 
                url : "https://62cfa0e8486b6ce82658f3bd.mockapi.io/getFood/users" , 
                data : dataSubmit
            }).then(({ data})=>{
              message.success("Sigin success ") ; 
              setActiveTab("1") ; 
              reset()
            })
            
        } catch (error) {
            
        }
       

    }
    const validateEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
  return (
    <div  className='sign'>
    
        
        
        <form onSubmit={handleSubmit(handleSign)}>
            
            <Row justify="center" align='middle' gutter={[30 , 30]} >
             <Col span={24}>
           <TextField 
            control={control}
            defaultValue="" 
            label="Email" 
            name="email" 
            type="text"
            size="large"
            perfix={<MailOutlined size={300} />}
            rules={
                { 
                    required : {
                    value : true , 
                    message : "Email is require"
                } ,

                pattern : { 
                    value : validateEmail , 
                    message : "Just enter mail"
            }
            }
        }
           />
           </Col>
           <Col  span={24}>
           <TextField 
            size="large"
            perfix={<RiLockPasswordLine />}
              control={control}
              defaultValue="" 
              label="Password" 
              name="password" 
              type="password"
              rules={  
                { 
                    required : {
                        value : true , 
                        message : "Password is require"
                    } ,
                 }
              }
            />

            </Col>
            <Col  span={24}>
           <TextField 
            size="large"
            perfix={<UserOutlined />}
              control={control}
              defaultValue="" 
              label="Nick name" 
              name="nickname" 
              type="text"
              rules={  
                { 
                    required : {
                        value : true , 
                        message : "Nick name is require"
                    } ,
                 }
              }
            />

            </Col>
            <Col span={6}>
            
            <button type='submit'><Button  size='middle' style={{width : "190px"}} type='primary'  >Sign</Button></button>
            </Col>
            </Row>
        </form>
    </div>
  )
}
