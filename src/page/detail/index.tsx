import React, { useContext, useEffect, useState } from 'react'
 import DetailContent from './compoments/DetailContent'
 import { useLocation } from "react-router-dom"
import Comments from './compoments/Comments';
import { PropsDetail, ItemDetail } from './interface';
import { useSelector } from 'react-redux';
import ContextFood from '../../context/ConTextFood';
 

function Detail() {
    const sampleLocation = useLocation();
    const {food , setFood} = useContext(ContextFood)
    let id : string = sampleLocation.search.split("=")[1]
    const [foodItem, setFoodItem] = useState<ItemDetail >({
      imgbig :"" , 
    dc :"" ,
     name:"" , 
     price :0 ,
      dc2  :"",
       id :  ""  ,
       rate : 0, 
    restaurant  : {
     name : "" , 
     address : ""
    } , 
    comment : [
      {
        name : "" , 
        avatar : "" , 
        comment : ""
      }
    ]
  
  });
 

    useEffect(()=>{
           const dataFood : ItemDetail | undefined = food.find((item : ItemDetail ) => item.id === id) ; 
             dataFood != undefined  &&  setFoodItem(dataFood);
       
    } , [food])


  return (
    <div className='fooddetail'>
        <DetailContent  {...foodItem} />
        <Comments  comment = {foodItem.comment}/>
    </div>
  )
}
export default Detail
