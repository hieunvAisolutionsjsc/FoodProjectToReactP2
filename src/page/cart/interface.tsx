import { ItemDetail } from "../manage/interface"

export interface PropsPay{
    handleMess(mess : string) : void , 

}
 interface Res {
    name : string , 
    address : string
}
export interface PropsCartList {
    listCart  : ItemDetail[] ,
     handleInRe(type : string , id : string ) : void ,
    handleRemove(id : string) : void
}
export interface  dataCart{
    name : string,
     imgbig : string  ,
    restaurant : Res, 
    contry : string | undefined ,
     dc : string ,
     dc2 : string,
      comments :PropsCommentItem[] | undefined ,
      quantities : number ,
      id: string ,
      imgsmail : string | undefined, 
      price :number,
       rate : number
}

export interface PropsCommentItem {
     name : string  , 
     avatar : string , 
     comment : string ,
}
export interface PropsList {
    listFood : ItemDetail[]
}
export interface PropsFormPay{
    handleMess(mess : string ) : void 
}
export interface location {
    code : string | undefined, 
    name : string | undefined , 
}
export interface LocationPick{
    tp : location , 
    qh : location  , 
    px : location 
}
export  interface ListLocation {
    tp : location[] |[] ,
    qh : location[] |[]  ,
    px : location[] |[] ,
}
