import React from 'react'
import { categoryList } from '../../../../varlocal'
import CategoryItem from './components/CategoryItem'
import "./style.css"
import { category } from './../../interface';
import 'antd/dist/antd.css';
import { Col, Row } from 'antd';
export default function Category(props : category) {
  return (
    <div className='category'>
        
        <p className="titlefood">Danh Sách Đồ Ăn</p>
       <Row gutter={[10 , 10]} style={{ justifyContent : "center"}} className='container'>
   {
    categoryList.map((item , index)=>{
        return <CategoryItem  
        {...props}
        key={index}
        {
            ...item
        } /> 
    })
   }
   </Row>
   

   </div>
  )
}
