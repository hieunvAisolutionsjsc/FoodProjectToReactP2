import React , {useState} from 'react' ; 
import { dataCart } from '../page/cart/interface';
import { ItemDetail } from '../page/manage/interface';

const ContextFood = React.createContext<any>([]) ; 
export const  FoodProvider = (props : any)=>{
    const [food , setFood ] = useState<ItemDetail[] | []>([]) ; 
   
  
   
    return (
        <ContextFood.Provider value = {{
            food , setFood
        }}>
            {props.children}
        </ContextFood.Provider>
    )
}

export default ContextFood