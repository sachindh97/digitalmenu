import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { Restaurant } from './restaurant/restaurant';
import { Categories } from './categories/categories';
import { Menuitem } from './menuitem/menuitem';
import { MenuTemplate } from './menu-template/menu-template';
import { authGuard } from './auth/auth-guard';
export default [
    { path: 'restaurant', component: Restaurant, canActivate:[authGuard] },
    { path: 'categories', component: Categories, canActivate:[authGuard] },
    { path: 'menuitem', component: Menuitem, canActivate:[authGuard] },
    { path: 'template', component: MenuTemplate },
    { path: 'documentation', component: Documentation },
    { path: 'crud', component: Crud },
    { path: 'empty', component: Empty },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
