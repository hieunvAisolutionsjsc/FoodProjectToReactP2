import React , {useState} from 'react' ; 
import { dataCart } from '../page/cart/interface';
import { ItemDetail } from '../page/manage/interface';


const ContextUser = React.createContext<any>([]) ; 
export const  UserProvider = (props : any)=>{
    const [user , setUser ] = useState({}) ; 
    
    const login = (user  : any) =>{
           setUser(user);
    }
    const logout =()=>{
          setUser({})
    }
    return (
        <ContextUser.Provider value = {{
           user , login , logout
        }}>
            {props.children}
        </ContextUser.Provider>
    )
}

export default ContextUser