import { Button, Input, message, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import SelectField from '../../../../field/SelectField';
import TextField from '../../../../field/TextField';
import { location, LocationPick, PropsFormPay } from '../../interface';
import { ListLocation } from './../../interface';
export default function FormPay({handlePay} : PropsFormPay) {
  const {register , control , watch , handleSubmit} = useForm({
    defaultValues : {
      tp : "" , 
      qh : ""  ,
      px : ""
    }
   }) ; 
   const [listSelectQh , setListSelectQh] = useState([])
   const [listSelectPx , setListSelectPx] = useState([])
   const [listSelectTp , setListSelectTp] = useState([])
  
   useEffect(() => {
    axios.get("https://api.mysupership.vn/v1/partner/areas/province").then((re)=>{
      console.log(re)
    setListSelectTp(re.data.results)
    })
    
   }, []);

   const onChangeData = (name : string , code : number) => {
    if(name==="tp"){
      axios.get(`https://api.mysupership.vn/v1/partner/areas/district?province=${code}`).then((re)=>{
      console.log(re)
    setListSelectQh(re.data.results)
    })
    
    }
    else if(name === "qh"){
      axios.get(`https://api.mysupership.vn/v1/partner/areas/commune?district=${code}`).then((re)=>{
        console.log(re)
      setListSelectPx(re.data.results)
    })
    
   }
  }
  // const handleOnchange =(e :ChangeEvent<HTMLSelectElement  > , name : string) :void =>{
  //   setLocation(prevState =>{
  //     return {
  //       ...prevState ,

  //       [name] : {
  //         code :  e
  //       }
  //     }
  //   })
  //   }
    
  return (
    <div className="formpay">
        <h3>Shipment Details</h3>
    <form action="" onSubmit={handleSubmit(data=> console.log(data))}>
        
        <SelectField 
     control={control} 
     dataOption={listSelectTp}
      label="City"
      name="tp"
      onChangeData ={onChangeData}
      style={{width : "200px"}}
      />
       <SelectField 
     control={control} 
     dataOption={listSelectQh}
      label="District"
      name="qh"
      onChangeData ={onChangeData}
      style={{width : "200px"}}
  
      />
       <SelectField 
     control={control} 
     dataOption={listSelectPx}
      label="Village"
      name="px"
      onChangeData ={onChangeData}
      style={{width : "200px"}}
      />
                <TextField 
                control={control}
                defaultValue =""
                label="Địa chỉ"
                name="dc"
                perfix={null}
                rules={{
                  required : true 
                }}
                type ="text"
                size ="middle"
               
                 />
                  
                  
                    
    </form>
      <div className="pay">
       
    <Button type='primary' id="paybtn" onClick={handlePay}>Thanh toán</Button>
</div>
</div>
  )
}
