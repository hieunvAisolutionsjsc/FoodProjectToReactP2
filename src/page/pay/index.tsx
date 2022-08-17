import React, { useContext, useEffect, useState } from 'react'
import FormPay from './components/FormPay/'
import "./style.css"
import { PropsPay, ItemDetail } from './interface';
import { Button, Col, message, Row, Table } from 'antd';
import ContextPay from '../../context/contextPay';
import { dataCart } from '../cart/interface';
import ContextUser from '../../context/ContextUser';
import { useNavigate } from 'react-router-dom';
import ContextCart from '../../context/ContextCart';
export default function Pay() {
  const {pay  , handleRestPay}  = useContext(ContextPay)
  const { cart , addToCart } = useContext(ContextCart) ; 

  const {user}  = useContext(ContextUser) ; 
  const nav = useNavigate()
  let totalPrice = 0 ; 

  
  pay.forEach((element : dataCart)  => {
    totalPrice+=(element.price* element.quantities)
  });
  let renderPay = pay.map((itemPay : dataCart)=>{
    return {
      ...itemPay , 
      imgbig : <img style={{width: "70px"}} src={itemPay.imgbig} />,
      imgsmail : <img style={{width: "70px"}} src={itemPay.imgsmail} /> , 
    }
})

const columns = [
{
title: 'Image',
dataIndex: 'imgsmail',
key: 'imgsmail',
},
{
title: 'Name',
dataIndex: 'name',
key: 'name',
sorter: (a : any, b : any) => (a.name).localeCompare(b.name),
},
{
title: 'Price',
dataIndex: 'price',
key: 'price',
sorter: (a : any, b : any) => a.price - b.price,
},
{
title: 'Quantities',
dataIndex: 'quantities',
key: 'quantities',
sorter: (a : any, b : any) => a.quantities - b.quantities,
},
];
console.log(user)
const handlePay = ()=>{
  
  if(Object.keys(user).length === 0){
      nav("/login")
  }else{
    if(pay.length === 0 ){
      message.error("No item to pay");
    }
    else{
      handleRestPay();
      
      message.success("Pay done");
    
      
    }
  }


 

}
  return (
    
 <div className="pay">
    <h1>pay list</h1>
  <Row gutter={40} className="payment">
      
        
        <Col  xs= {{span:24}} md={{span : 16}} className="container">
        <Table dataSource={renderPay} columns={columns} pagination={{
                 current: 1,
                 pageSize: 3,
  }} />
       
      <div className="formpay__top" id="paytop">
             <div className="totalpay">
                <p> total pay  :  {totalPrice} VND</p>
            </div>
            <div className="totalitem">
                <p>total food : {pay.length}</p>
            </div> 
        </div>
           
     
    </Col>
    <Col xs= {{span:24}} md={{span : 8}} >
    <FormPay handlePay={handlePay} />
    </Col>
    </Row>
    </div>
  )
}
