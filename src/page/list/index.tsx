import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ContextFood from '../../context/ConTextFood';
import Category from './components/Category/index';
import ListFood from './components/ListFood';
import { PropsList } from './interface';
import { ItemDetail } from './interface';

export default function List() {

  const {food , setFood} = useContext(ContextFood)
  const [dataFood  , setDataFood]= useState(food)
  const [category , setCategory] = useState<string>("all");
  const [loadMore , setLoadMore] = useState<number>(1) ; 
  const changeCategory = (name : string ) : void =>{
           setCategory(name)
  }
  useEffect(()=>{
    if(category === "all"){
      setDataFood(food)
    } else{
      setDataFood( food.filter((item : ItemDetail)=>{
        return item.contry === category           
    }) )
    }
                                        

    // setDataFood(newFood);
    // console.log(newFood)
   }
  
  , [category ,food ])
   console.log(dataFood , food)
  return (
    <div>
      <Category changeCategory={changeCategory} category={category}/>
      
      <ListFood  listFood={dataFood} />
      
    </div>
  )
}
