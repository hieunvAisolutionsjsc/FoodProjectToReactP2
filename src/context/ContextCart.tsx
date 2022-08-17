import React , {useState} from 'react' ; 
import { dataCart } from '../page/cart/interface';
import { ItemDetail } from '../page/manage/interface';


const ContextCart = React.createContext<any>([]) ; 
export const  CartProvider = (props : any)=>{
    const [cart , setCart ] = useState<dataCart[] | []>([]) ; 
    
    const addToCart = (data : ItemDetail) =>{
             setCart(dataCart  => [...dataCart , data] )
    }
    const removeCart = (data : ItemDetail) =>{
        setCart(dataCart  => [...dataCart , data] )
}
    const reduceAndIncreaseQuantitiesItemCart =(type : string , id : string)=>{
        let data  :dataCart[] ; 
        console.log(id)
                if(type==="re"){
                     data = cart.map((itemCart)=>{
                        return itemCart.id === id 
                        ? {...itemCart , quantities : itemCart.quantities-1}
                        : itemCart
                     })
                } else{
                    data = cart.map((itemCart)=>{
                        return itemCart.id === id 
                        ? {...itemCart , quantities : itemCart.quantities+1}
                        : itemCart
                     })
                }
                data = data.filter((itemCart)=>{
                    return itemCart.quantities != 0
                })
                setCart(data)
    }
    const removeItemCart =(id : string) =>{
           let data ; 
           data = cart.filter((itemCart)=>{
            return itemCart.id !== id
        })
        setCart(data)
    }
    return (
        <ContextCart.Provider value = {{
            cart , addToCart , reduceAndIncreaseQuantitiesItemCart , removeItemCart
        }}>
            {props.children}
        </ContextCart.Provider>
    )
}

export default ContextCart