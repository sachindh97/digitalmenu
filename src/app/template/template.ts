import { CategoriesService } from '@/pages/service/categories.service';
import { MenuitemService } from '@/pages/service/menuitem.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-template',
  imports: [CommonModule,RouterModule,SelectModule],
  templateUrl: './template.html',
  styleUrl: './template.scss'
})
export class Template  {
  restaurant_name:any;
  response:any;
  categoriesOption:any=[];
  data:any;
    constructor(
          private menuItemService: MenuitemService,
          private router:ActivatedRoute,
          private categoriesService:CategoriesService
      ) { }


  ngOnInit(){
   const owner_id = this.router.snapshot.paramMap.get('owner_id');
   const restaurant_id = this.router.snapshot.paramMap.get('restaurant_id');

   
    let obj = {
      owner_id:owner_id,
      restaurant_id:restaurant_id
    }
    this.menuItemService.getAllShowMenuList(obj).subscribe((result:any)=>{
      console.log(result,'ddd#');
      this.restaurant_name = result.restaurant_name;
      this.response = result.categories;

      console.log(this.response,'ee');
      this.response.map((ele:any)=>{
        this.categoriesOption.push({id:ele.category_id,name:ele.category_name});
      })      
      console.log(this.categoriesOption,'c#');
      
      // this.restaurant = result;
      // this.categories = result.categories
    });
    }

}
