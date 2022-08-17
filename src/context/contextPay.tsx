import React , {useState} from 'react' ; 
import { dataCart } from '../page/cart/interface';

const ContextPay = React.createContext<any>([]) ; 
export const  PayProvider = (props : any)=>{
    const [pay , setPay ] = useState<dataCart | []>([]) ; 
    const [isPay , setIsPay] = useState(false)
   const handleSetPay = (payList :dataCart)=>{
         setIsPay(true)
         setPay(payList)
   }
   const handleRestPay =()=>{
    setIsPay(false)
    setPay([])
   }
    return (
        <ContextPay.Provider value = {{
            pay ,isPay  , handleSetPay , handleRestPay
        }}>
            {props.children}
        </ContextPay.Provider>
    )
}

export default ContextPay