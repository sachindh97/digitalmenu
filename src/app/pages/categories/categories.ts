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
import { Toast } from 'primeng/toast';
import { CategoriesService } from '../service/categories.service';
import { OrderListModule } from 'primeng/orderlist';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}
@Component({
  selector: 'app-categories',
  imports: [
     CommonModule,
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
        FormsModule,
        Toast,
        OrderListModule,
        OrderListModule 
  ],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
    providers: [ProductService, MessageService, ConfirmationService, CategoriesService, RestaurantSerivce] // Add the service here

})
export class Categories {
    productDialog: boolean = false;
    restaurant!: any;
    selectedItem!: Product[] | null;
    submitted: boolean = false;
    statuses!: any[];
    @ViewChild('dt') dt!: Table;
    exportColumns!: ExportColumn[];
    cols!: Column[];
    categoriesDetails: any;
    categoriesForm!: FormGroup;
    isEditMode: boolean = false;
    restaturantOption:any=[];
    selectedRestaurantId!:number;
    categoriesData:any=[];
        totalRecords: number = 0;
rows: number = 10;  
showTitle:string="";
    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private fb: FormBuilder,
        private categoriesService:CategoriesService,
        private restaturntService:RestaurantSerivce
    ) { }

    exportCSV() {
        this.dt.exportCSV();
    }
    activeOptions:any = [
        {id:1,name:'Yes',code:'Y'},
        {id:2,name:'No',code:'N'}
    ];

    ngOnInit() {
        this.categoriesForm = this.fb.group({
            id: [null],
            name: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', [Validators.required]],
            selectedRestaurant:['',[Validators.required]],
            active:['',[Validators.required]]
        })
        this.getRestaurant();
    }

    getRestaurant(){
      this.restaturntService.getAllRestaurantLookup().subscribe(result=>{
          this.restaturantOption = result.map((r:any)=>({id:r.id,name:r.name}));
      });

    }

    loadListData(event?:any) {
              const first = event?.first ?? 0;
        const rows  = event?.rows ?? 10;  
  const page = (first / rows) + 1;  // page number (1-based)
        let limit = rows;
      this.categoriesDetails = [];
        this.categoriesService.getAllCategoriesList(page,limit,3).subscribe((result) => {
            this.categoriesDetails = result.data;
                this.totalRecords = result.total;  // backend count

        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.restaurant = {};
        this.submitted = false;
        this.productDialog = true;
        this.isEditMode = false;
        this.categoriesForm.reset();
        this.showTitle="New Categories"
    }

    editItem(data: any) {
        this.showTitle=`Categories ID(${data.id})`
        this.isEditMode = true;
        this.categoriesForm.patchValue({
            id: data.id,
            name: data.name,
            description:data.description,
            selectedRestaurant:data.restaurantObj.id,
            active:data.active ? 'Y' : 'N'
        });
        this.productDialog = true;
    }

    deleteSelectedItem() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Products Deleted',
                    life: 3000
                });
            }
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    deleteItem(product: Product) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.restaurant = {};
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Deleted',
                    life: 3000
                });
            }
        });
    }

    saveData() {
        this.submitted = true;
        if (this.categoriesForm.valid) {
            const { name, description, selectedRestaurant, active } = this.categoriesForm.value;
            let formData = {
                name: name,
                description:description,
                restaurant_id: selectedRestaurant,
                active:active
            }

            if (this.isEditMode) {
                const { id } = this.categoriesForm.value;
                console.log(this.categoriesForm.value,'eee');
                
                this.categoriesService.updateCategories(formData, id).subscribe((result) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Restaurant Updated',
                        life: 3000
                    });
                    this.loadListData();
                });
            } else {
                this.categoriesService.createCategories(formData).subscribe((result) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Restaurant Added',
                        life: 3000
                    });
                    this.loadListData();
                });
            }


            this.productDialog = false;
            this.restaurant = {}
        }
    }

    selectRestaurant(){
        this.loadListData();
    }

    onRowReorder(event: any) {
  console.log("New order:",event);
  this.categoriesDetails=[...this.categoriesDetails]
}


}
