import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';
import React from 'react';
import { Controller } from 'react-hook-form';

const TextField = ({ rules  , size  , perfix , control, name , label, type , defaultValue}) => {
 
    return (
        <div style={{margin : "0 .4rem" , position: "relative"}}>
        <label>{label}</label>
        <Controller
           name={name}
           control={control}
           rules={rules}
           
           render={({ field , fieldState:{error} }) =>  
           {
            
              return <><Input
              
              size={size}
              defaultValue={defaultValue}
           type={type}
           status={error && "error"}
              {...field}
              allowClear 
              prefix={perfix}
         />
           {error && <p style={{position : "absolute" , bottom : "-25px" , right : "0" , color : "red" , fontSize : "10px"}}>{error.message}</p>}
         </>
           }
           
         }
      />
        </div>
    );
}

export default TextField;
