import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Products } from './components/products/products';
import { Order } from './components/order/order';
import { AboutUs } from './components/about-us/about-us';
import { ProductDetails } from './components/product-details/product-details';
import { NotFound } from './components/not-found/not-found';
import { Vision } from './components/vision/vision';
import { Values } from './components/values/values';
import { Login } from './components/login/login';
import { authGuard } from './guards/auth-guard';
import { AddProduct } from './components/add-product/add-product';
import { UpdateProduct } from './components/update-product/update-product';
import { Categories } from './components/categories/categories';

export const routes: Routes = [
    // first match win
        {path:"",redirectTo:"home",pathMatch:'full'},
        {path:"home",component:Home},
        {path:"login",component:Login},
        {path:"categories",component:Categories},
        // lazy loading (promise)
        {path:"products",
            loadComponent:()=>import('./components/products/products')
            .then((obj)=>obj.Products),
        canActivate:[authGuard]},
        
        {path:"productDetails/:id",component:ProductDetails},
        {path:"addProduct",component:AddProduct},
        {path:"updateProduct/:id",component:UpdateProduct},
        {path:"order",component:Order},
        {path:"about",component:AboutUs,children:[
        {path:"",redirectTo:"vision",pathMatch:'full'},
        {path:'vision',component:Vision},
        {path:"values",component:Values}
        ]},

        {path:"**",component:NotFound}
];
