import React, { ChangeEvent, MouseEvent, MouseEventHandler, useEffect, useState } from 'react'

import { PropsListManage, Sort, ItemDetail } from './../interface';
import "./style.css"
import star from "../../../img/star.png"
import { Button, Col, Dropdown, Menu, Row, Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { columnsManage } from '../../../common/ColumnList';
import { useDispatch } from 'react-redux';
import iconUpdate from "../../../img/update_ic_icon.png"
import Item from 'antd/lib/list/Item';
import {GrUpdate} from "react-icons/gr"
export default function ListManage(props : PropsListManage) {
  const {listFood , loadmore   } = props;
  const [screen , setScreen] = useState(window.innerWidth); 
  useEffect(()=>{
     const resize =  window.onresize = ()=>{
        setScreen(window.innerWidth)
      }
     
  } )

  const newData = listFood.map((item , index)=>{
    const rateJSX  = [] ; 
    for (let index = 1; index <= item.rate; index++) {
      rateJSX.push(<img  key={index} src={star} alt="" />) ; 
    }
        const menu = (
                   <Menu
         items={[
          {
            key: '1',
            label: (
           <span> Rate :<span className='rate'> {rateJSX.map((item , index)=>{
                             return <React.Fragment key={index}>{item}</React.Fragment>
           })} </span></span>
            ),
          },
          {
            key: '2',
            label: (
           <span> Price : {item.price} </span>
            ),
          },
          {
            key: '3',
            label: (
           <span> Dicription : {item.dc2} </span>
            ),
          },
         
         
        ]}
      />
    );
 
                  return {
                    
                    ...item ,
                    moreInfor : <Dropdown
                    overlay={menu}
                    placement="top"
                    overlayStyle={{width : "250px"}}
                    
                    arrow={{
                      pointAtCenter: true,
                    }}
                  >
                    <Button>See more</Button>
                  </Dropdown>, 
                   
                    dc2 : item.dc2,
                    rate : <span className='rate'> {rateJSX.map((item , index)=>{
                      return <React.Fragment key={index}>{item}</React.Fragment>
                           })} </span>,
                    imgbig : <img style={{width: "70px"}} src={item.imgbig} />,
                    imgsmail : <img style={{width: "70px"}} src={item.imgsmail} /> , 
                    stt : index
                  }
  })
 let columns = columnsManage ; 
  columns = screen < 712 ?  (columns.filter(item => {
    return ((!item.isHide )  &&  item.key !== "stt" )
  }      
))
: columns ; 
screen < 712 && columns.push({
title: 'More Infor',
dataIndex: 'moreInfor',
key: 'moreInfor',

})

  return (
    <Table className='manage' dataSource={newData} columns={columns} />
  )
}
