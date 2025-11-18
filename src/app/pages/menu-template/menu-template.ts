import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Product, ProductService } from '../service/product.service';
import { RestaurantSerivce } from '../service/restaurant.service';
import { CategoriesService } from '../service/categories.service';
import { MenuitemService } from '../service/menuitem.service';

@Component({
  selector: 'app-menu-template',
  imports: [        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule,
        ReactiveFormsModule,
        FormsModule],
  templateUrl: './menu-template.html',
  styleUrl: './menu-template.scss',
  providers: [ProductService, MessageService, ConfirmationService, CategoriesService, RestaurantSerivce] // Add the service here

})
export class MenuTemplate implements OnInit {
  
  restaurant:any;
  categories:any;
  data:any;
  constructor(
        private fb: FormBuilder,
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private restaturntService: RestaurantSerivce,
        private menuItemService: MenuitemService
    ) { }

  ngOnInit(){
    let obj = {
      owner_id:3,
      restaurant_id:1
    }
    this.menuItemService.getAllShowMenuList(obj).subscribe((result:any)=>{
      console.log(result,'res');
      this.data = result;
      // this.restaurant = result;
      // this.categories = result.categories
    });
    }
    

    
}
