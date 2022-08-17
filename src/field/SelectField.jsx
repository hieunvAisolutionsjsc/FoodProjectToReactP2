import { Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import React from 'react';
import { Controller } from 'react-hook-form';

const SelectField = ({ style , onChangeData, control , name , label , dataOption}) => {
    return (
        <div>
         <label>{label}</label>
         <Controller
            name={name}
         control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
             <Select
             style={style}
           showSearch
           placeholder="Select Place"
           optionFilterProp="children"
           onChange={(data)=>{
            onChangeData(name , data)
            onChange(data)
           }
           }
          //  onSearch={onSearch}
        
           filterOption={
                   (input, option) =>
                    option.children.toLowerCase()
                    .includes(input.toLowerCase())}
         >
            {
               dataOption.map((item , index)=>{
                         return <Option value={item.code}>{item.name}</Option>
                  })
            }
            </Select>
        )}
     
         />
        </div>
    );
}

export default SelectField;
