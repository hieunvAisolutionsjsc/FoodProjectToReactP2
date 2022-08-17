import React, { ChangeEvent, EventHandler, FormEvent, MouseEvent, useContext, useEffect, useState } from 'react'
import {  PropsFormAdd, ItemDetail, Res, DataForm } from '../interface';
import { useDispatch, useSelector } from 'react-redux';

import "./style.css"
import { Button, Col, Input, message, Row, Upload } from 'antd';
import FileField from '../../../field/FileField';
import { useForm } from 'react-hook-form';
import TextField from '../../../field/TextField';

import ContextFood from '../../../context/ConTextFood';
export default function FormFood(props : PropsFormAdd) {
  const {  handleOpenAdd , isAdd ,dataUpdate  } = props;
  console.log(dataUpdate)
  const { food , setFood } = useContext(ContextFood)
  console.log(dataUpdate)
  const [fileListBig , setFileListBig] =useState<any>([]) ; 
  const [fileListSmail , setFileListSmail] =useState<any>([]) ; 
const {register , reset , resetField ,  setValue , getValues, handleSubmit , control ,watch} = useForm({
  defaultValues :{
    imgbig : {
      fileList: []
    } , 
    imgsmail:{
      fileList : []
    }  , 
    name : "", 
    dc : "",
    dc2 : "", 
    price : "", 
    contry : "",
    restaurant : "",
  }
}) ; 
useEffect(()=>{
  if(dataUpdate !== null){
 
      setFileListBig([{url : dataUpdate.imgbig}])
      setFileListSmail([{url : dataUpdate.imgsmail}])
      setValue("name" , dataUpdate.name) 
      setValue("dc" , dataUpdate.dc )
      setValue("dc2" , dataUpdate.dc2 ) 
      setValue("price" , dataUpdate.price ) 
      setValue("contry" , dataUpdate.contry)
      setValue("restaurant" , dataUpdate.restaurant)
  }else{
    setFileListBig([])
      setFileListSmail([])
    reset() ; 
  }

} , [dataUpdate])
; 
let listId = food.map((item :ItemDetail)=>{
             return Number(item.id)
})
const hanhdleFood =(newData:any) =>{
  
   setFood([...food , {...newData ,rate : 5 ,
            imgbig : newData.imgbig.fileList[0].thumbUrl  , imgsmail : newData.imgsmail.fileList[0].thumbUrl, comment : []}])
   reset()
   setFileListBig([])
   setFileListSmail([])
   message.success("Add food success")
   handleOpenAdd()
  }
  return (
    <div className={ isAdd === true ? "formadd addactive" : "formadd"  } id="formadd">
   
    <div className="container"  >
        <form action="" id="formadd" onSubmit={handleSubmit((data)=> hanhdleFood(data))} >
          <Row style={{alignItems:"center !important"}} gutter={[12,20]} >
           <Col xs={{span : 24}} sm= {{span:12}} className="formadd__item file ">
  
           <FileField
           fileList={fileListBig}
           setFileList={setFileListBig}
           
            name="imgbig"
           control={control}
           label="Chose a image (Big)" 
           watch={watch}
           />
           </Col>
           <Col xs={{span : 24}} sm= {{span:12}} className="formadd__item file ">
           <FileField
           fileList={fileListSmail}
           setFileList={setFileListSmail}
            name="imgsmail"
           
                   control={control}
           label="Chose a image (small)" 
           watch={watch}
           />
           </Col>
           <Col xs={{span : 24}} sm={{span:12}} md={{span:8}} className="formadd__item">
            <TextField 
                 control={control}
                 label="Name"
                 name="name"
                 size="middle"
                 perfix={null}
                 defaultValue= ""
                 rules={{required : {
                value : true , 
                message : "This field is required"
               }}}
               type="text" 

            />
           </Col>
           <Col xs={{span : 24}} sm={{span:12}} md={{span:8}} className="formadd__item">
           
            <TextField
                   type="text"
                    name="dc" 
                    defaultValue=""
                    size="middle"
                    perfix={null}
                  control={control}
                  label ="Describe(Full)"
                  rules={{required : {
                    value : true , 
                    message : "This field is required"
                   }}}
                    />
           
           </Col>
           <Col xs={{span : 24}} sm={{span:12}} md={{span:8}} className="formadd__item">
           
           <TextField
                   type="text"
                    name="dc2" 
                    defaultValue=""
                    size="middle"
                    perfix={null}
                  control={control}
                  label ="Describe(Short)"
                  rules={{required : {
                    value : true , 
                    message : "This field is required"
                   }}}
                    />
           </Col>
           <Col xs={{span : 24}} sm={{span:12}} md={{span:8}} className="formadd__item">
           
            <TextField
                   type="number" 
                   name="price" 
                   defaultValue=""
                   control={control}
                   label="Price"
                   rules={{required : {
                    value : true , 
                    message : "This field is required"
                   }}}
                   size="middle"
                    perfix={null}
                   />
           </Col>
           <Col xs={{span : 24}} sm={{span:12}} md={{span:8}} className="formadd__item">
           
            <TextField
                  size="middle"
                  perfix={null}
                   type="text"
                  name="contry" 
                  defaultValue=""
                  control={control}
                  label="Country"
                  rules={{required : {
                value : true , 
                message : "This field is required",
               }}}
             />
           
           </Col>
       
           <Col  span={24} className="ncc">
            <h3>Restaurant</h3>
                <Row gutter={[20,10]} >
           <Col xs={{span : 24}} md={{span: 12}} className="formadd__item">
            <TextField  
                   size="middle"
                   perfix={null}
                   type="text"
                   name="restaurant.address" 
                   defaultValue=""
                   control={control}
                   label="Address"
                   rules={{
                    required : {
                    value : true , 
                    message : "This field is required"
                   }}}
                   />

           </Col>
           <Col xs={{span : 24}} md={{span: 12}} className="formadd__item">
            
            <TextField 
                   type="text" 
                   name="restaurant.name"
                   defaultValue=""
                   size="middle"
                   perfix={null}
                   control={control}
                   label="Name"
                   rules={
                       {
                        required : {
                    value : true , 
                    message : "This field is required"
                   }}}
                    />
           </Col>
           </Row>
        </Col>
        </Row>
           <div className="formadd__item btn">
              <Button type='primary'><input type="submit" value="Save" /></Button>
              <Button id="cancel" danger onClick={handleOpenAdd}>Cancel</Button>
           </div>
        </form>
    </div> 
</div>
  )
}
