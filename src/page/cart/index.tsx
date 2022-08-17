import React, { UIEvent, useContext, useEffect, useState } from 'react'
import "./style.css"

import { useNavigate } from 'react-router-dom';
import { ItemDetail } from '../detail/interface';
import { Button, Col, message, Row, Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import ContextCart from '../../context/ContextCart';
import { dataCart } from './interface';
import ContextPay from '../../context/contextPay';
export default function Cart() {
  const {cart , addToCart ,
     reduceAndIncreaseQuantitiesItemCart ,
      removeItemCart} = useContext(ContextCart) ; 
  const {pay  , handleSetPay}  = useContext(ContextPay)
  let totalPrice = 0 ; 
  let totalFood = 0 ; 
  const nav = useNavigate() ; 
  const [windowSize , SetWindowSize] = useState<any>(window.innerWidth)
    function resizeEvent() {
             SetWindowSize(window.innerWidth)
    }
    useEffect(()=>{
        window.onresize = resizeEvent ; 
        
    })
    cart.forEach((element : dataCart) => {
      totalPrice+=(element.price* element.quantities) ; 
      totalFood+=element.quantities
    });
    const handlePay =()=>{
      handleSetPay(cart)
      nav("/pay")
    }
    let renderCart = cart.map((itemCart : any)=>{
        return {
          ...itemCart , 
          imgbig : <img style={{width: "70px"}} src={itemCart.imgbig} />,
          imgsmail : <img style={{width: "70px"}} src={itemCart.imgsmail} /> , 
          renderQuatities : <Row align='middle'   gutter={20}>
            <Col>
              <Button size={windowSize < 550  ? "small" : "large" } 
               onClick={()=>reduceAndIncreaseQuantitiesItemCart("re" , itemCart.id)}> - </Button>
              </Col>
            <Col>
              <p>{itemCart.quantities}</p>
              </Col>
              <Col>
              <Button size={windowSize < 550  ? "small" : "large" } 
                onClick={()=>reduceAndIncreaseQuantitiesItemCart("in" , itemCart.id)} > + </Button>
              </Col>
              <Col>
              <Button size={windowSize < 550  ? "small" : "large" } 
              type="primary" 
              danger
              className='btnremove'
              onClick={()=>removeItemCart(itemCart.id)} >
                 <DeleteOutlined />
                 </Button>
              </Col>
          </Row>
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
    dataIndex: 'renderQuatities',
    key: 'renderQuatities',
    sorter: (a : any, b : any) => a.quantities - b.quantities,
  },
];
  return (
    <div className='cart'>
    <h1>Cart list</h1>
     <div className='container'> 
     <Table dataSource={renderCart} columns={columns} />
    
      </div>
      <div id="total">
        <Row className='total' gutter={40}>
          <Col flex={1}>
      <p>Số Món :{cart.length}</p>
      </Col>
      <Col flex={1}>
            <p>Số lượng : {totalFood}</p>
            
            </Col>
            <Col flex={1}>
            <p>Tổng Tiền : {totalPrice} </p>
            </Col>
            </Row>
      </div>
      <div className="pay">
    <Button type='primary' id="setpay" onClick={handlePay}>  Thanh toán</Button>
    </div>
      </div>
  )
}
