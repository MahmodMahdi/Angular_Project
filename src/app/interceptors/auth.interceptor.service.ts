import { HttpEventType, HttpHandlerFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { tap } from "rxjs";

export function authInterceptor(req:HttpRequest<any>,next:HttpHandlerFn){
   let modifiedRequest = req
    if(req.method=="GET"){
     modifiedRequest =  req.clone({
        headers: req.headers.append("lang","en")
     })
   }
   // tap => to reach the response obj to make any thing that i need
    return next(req).pipe(tap((event)=>{
       if(event.type==HttpEventType.Response){
        console.log(event)
        if(event.status==200){
           
        }
        else if (event.status==500){

        }
       }
    }))
}