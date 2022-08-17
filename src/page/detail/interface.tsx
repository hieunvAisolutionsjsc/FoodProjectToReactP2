export interface PropsDetailContent {
    id : string ,
    imgbig  : string  , 
    dc  : string ,
    name : string ,
    price : number,
    dc2 : string ,
    rate : number,
    comment : PropsCommentItem[]
    restaurant : Res,
 
}
 interface Res {
    name : string , 
    address : string
}
export interface PropsDetail {
    handleMess(mess : string) : void
}
 export interface ItemDetail {
id : string ,
imgbig  : any, 
dc  : string ,
name : string ,
price : number ,
dc2 : string ,
rate : number , 
restaurant :Res ,
comment : PropsCommentItem[]
}
export interface PropsCommentItem {
     name : string  , 
     avatar : string , 
     comment : string
}