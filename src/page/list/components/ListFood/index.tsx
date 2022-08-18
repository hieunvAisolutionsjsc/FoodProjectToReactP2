import React, { useContext, useState } from 'react'
import "./style.css"

import { useNavigate } from "react-router-dom";
import { listFood } from './../../interface';
import { dataCart } from '../../../cart/interface';
import { Button, message, Row } from 'antd';
import 'antd/dist/antd.css';
import CardFood from '../../../../components/CardFood';
import ContextCart from '../../../../context/ContextCart';
import ContextPay from '../../../../context/contextPay';

export default function ListFood( props : listFood) {
  const { cart , addToCart } = useContext(ContextCart) ; 
  const {listFood } = props ; 
 const { pay ,isPay  , handleSetPay , handleRestPay} = useContext(ContextPay)
  const [loadMore , setLoadMore] = useState(1) ; 
  //  const cart = new CartAPI();
  
   const nav = useNavigate() ; 
   ;
  

  const handleLoadMore =()=>{
    setLoadMore(prevState =>{
      return prevState +1;
    })
  }
  const handleAddCart = (item :dataCart)=>{
    addToCart(item)
        // cart.setCart(item) ; 
        message.success("Add to cart success")
  }
  const  handleBuyNow =(item : dataCart)=>{
        
        handleSetPay([item])
        nav("/pay");
  }
  console.log(cart)
  return (
    <div className='foodlist'>

   <Row gutter={[15 , 15]}   className='container'>
    {
      listFood.map((item , index)=>{
       return index >= (loadMore*20) ? "" : <CardFood
        key={index}
        col= {6}
        handleBuyNow={handleBuyNow}
        handleAddCart ={handleAddCart}
        {
          ...item 
        }
        />
      })
    }
       
       
      
   </Row>

   <div className="loadmore" id="loadmore">
    <Button type="primary" style={(loadMore*20) > listFood.length ? {display : "none" } : {} } 
            onClick={handleLoadMore}>Load More</Button>
</div>
    </div>
  )
}
