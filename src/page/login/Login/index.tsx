import { MailOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
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

export default function Login() {
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
    
    const handleLogin = (dataSubmit : any)=>{
        
        try {
            axios({
                method : "get" , 
                url : "https://62cfa0e8486b6ce82658f3bd.mockapi.io/getFood/users"
            }).then(({ data})=>{
                console.log(data)
                const isRight = false ; 
            
                const isUser = data.find((item : any) => item.email === dataSubmit.email);
                console.log(dataSubmit , isUser)
                 if(isUser != undefined){

                    if(dataSubmit.password === isUser.password){
                        login(isUser) ; 
                        isPay === true ?  nav("/pay") : nav("/");
                    }else{
                        setError("password" , {
                            message : "Password wrong"
                        } , {shouldFocus : true})
                    }
                     

                 }else{
                    setError("email" , {
                        message : "password wrong"
                    } , {shouldFocus : true})
                    setError("password" , {
                        message : "Password wrong"
                    } )
                 }
            })
            
        } catch (error) {
            
        }
       

    }
    const validateEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
  return (
    <div  className='loginmain'>
        <form onSubmit={handleSubmit(handleLogin)}>
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
            <Col span={6}>
            <button type='submit'><Button  size='middle' style={{width : "190px"}} type='primary'  >Login</Button></button>
             </Col>
            </Row>
        </form>
    </div>
  )
}
