import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import FormFood from './FormFood/';
import { DataForm, ItemDetail } from './interface';
import ListManage from './ListManage/index';
import "./style.css"
import { useDispatch, useSelector } from 'react-redux';
import Search from 'antd/lib/input/Search';
import { Button, Col, Input, Row } from 'antd';
import ContextFood from '../../context/ConTextFood';


export default function Manage() {
  const [search , setSearch] = useState(""); 
  const [loadmore , setLoadMore] = useState<number>(1);
  const [isAdd , setIsAdd] = useState<boolean>(false)
  const {food , setFood} = useContext(ContextFood)
  const  [dataFood , setDataFood] = useState(food)  ; 
  
  const [dataUpdate , setDataUpdate] = useState<ItemDetail | null>(null)
  const handleLoadMore =() : void=>{
    setLoadMore(prevState =>{
      return prevState +1;
    })
  }
  const handleOpenAdd =() : void=>{
    setDataUpdate(null)
    setIsAdd(!isAdd);
  }
 

  useEffect(()=>{
  
    const newFood = search === "" ? food
                                        : food.filter((item : ItemDetail)=>{
                                              return item.name.indexOf(search)!== -1 || 
                                                     item.dc2.indexOf(search)!== -1           
                                          }) ;

    setDataFood((prevState : ItemDetail[])  =>{
      return  newFood;
    })
  }
  
  , [search , food])
const handleOnChange = (e: ChangeEvent<HTMLInputElement>) : void=>{
    setSearch(e.target.value);
}


  return (
    <>
       <header>
<Row className="container">
        <Col  flex ={1} className="search">
        <Input
        style={{width  :"200px"}}
        allowClear
        onChange={handleOnChange} />
          
        </Col>
       <Col span={3} className="addnew">
        <div className="container">

            <div className="addnew__btn"            
            id="add"
            onClick={handleOpenAdd}
            >
                <Button type='primary' >Add A Food</Button>
            </div>
        </div>
        
       </Col>
    </Row>
    </header>
    <div className='manage'>
   <div className='container'>
       <div>
        <ListManage 
         listFood ={dataFood}
         loadmore={loadmore}
 
        />
       
       </div>
       </div>
   </div>
   <FormFood dataUpdate={dataUpdate} handleOpenAdd={handleOpenAdd} isAdd={isAdd}/>
    </>
  )
}
