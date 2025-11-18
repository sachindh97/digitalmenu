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
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../service/auth.service';


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
    selector: 'app-restaurant',
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
        RouterModule
    ],
    templateUrl: './restaurant.html',
    styleUrl: './restaurant.scss',
    providers: [ProductService, MessageService, ConfirmationService, RestaurantSerivce] // Add the service here

})
export class Restaurant implements OnInit {
    productDialog: boolean = false;
    restaurant!: any;
    selectedItem!: Product[] | null;
    submitted: boolean = false;
    statuses!: any[];
    @ViewChild('dt') dt!: Table;
    exportColumns!: ExportColumn[];
    cols!: Column[];
    restaurantDetails: any;
    restaurantForm!: FormGroup;
    isEditMode: boolean = false;
    totalRecords: number = 0;
rows: number = 10;  
    activeOptions:any = [
        {id:1,name:'Yes',code:'Y'},
        {id:2,name:'No',code:'N'}
    ];
    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private restaturantService: RestaurantSerivce,
        private fb: FormBuilder,
        private router:Router,
        private authService:AuthService
    ) { }

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {
        this.restaurantForm = this.fb.group({
            id: [null],
            name: ['', [Validators.required, Validators.minLength(3)]],
            phone: ['', [Validators.required]],
            address: ['', [Validators.required]],
            is_active:['',[Validators.required]]
        })
    }

    loadListData(event?:any) {

        const first = event?.first ?? 0;
        const rows  = event?.rows ?? 10;
                    
        const page = (first / rows ) + 1;  // page number (1-based)
        let limit = rows;
        this.restaturantService.getRestaurantList(page,limit).subscribe((result) => {
            this.restaurantDetails = result.data;
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
        this.restaurantForm.reset();
    }

    editItem(data: any) {
        this.isEditMode = true;
        this.restaurantForm.patchValue({
            id: data.id,
            name: data.name,
            address: data.address,
            phone: data.phone,
            acttive:data.is_active ? 'Y' : 'N'
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
                this.restaturantService.deleteRestaurant(product.id).subscribe((result:any)=>{
                    if(result.status){
                    this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Restaurant Deleted',
                    life: 3000
                });
                    this.loadListData();

                    }
                   
                });

            }
        });
    }

    saveData() {
        this.submitted = true;
        if (this.restaurantForm.valid) {
            const { name, address, phone,is_active } = this.restaurantForm.value;
            let formData = {
                name: name,
                address: address,
                phone: phone,
                is_active:is_active
            }

            if (this.isEditMode) {
                const { id } = this.restaurantForm.value;
                this.restaturantService.updateRestaurant(formData, id).subscribe((result) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Restaurant Updated',
                        life: 3000
                    });
                    this.loadListData();
                });
            } else {
                this.restaturantService.createRestaurant(formData).subscribe((result) => {
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
    viewMenu(restaurant_id:number){    
    let owner_id = this.authService.decodeToken().id;
    const url = this.router.serializeUrl(
    this.router.createUrlTree([`/template/${owner_id}/${restaurant_id}`])
  );
    window.open(url, '_blank');
    }
}
