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
import { MenuitemService } from '../service/menuitem.service';
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
    selector: 'app-menuitem',
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
        Toast],
    templateUrl: './menuitem.html',
    styleUrl: './menuitem.scss',
    providers: [ProductService, MessageService, ConfirmationService, CategoriesService, RestaurantSerivce] // Add the service here

})
export class Menuitem {
    productDialog: boolean = false;
    restaurant!: any;
    selectedItem!: Product[] | null;
    submitted: boolean = false;
    statuses!: any[];
    @ViewChild('dt') dt!: Table;
    exportColumns!: ExportColumn[];
    cols!: Column[];
    menuItemDetails: any;
    menuItemForm!: FormGroup;
    isEditMode: boolean = false;
    MenuItemData: any = [];
    restaturantOption: any = [];
    categoriesOption: any = [];
        totalRecords: number = 0;
rows: number = 10;  
showTitle:string="";
activeOptions:any = [
        {id:1,name:'Yes',code:'Y'},
        {id:2,name:'No',code:'N'}
    ];
 foodTypeOptions:any = [
        {id:1,name:'Veg',code:true},
        {id:2,name:'Non Veg',code:false}
    ];   
    constructor(
        private fb: FormBuilder,
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private restaturntService: RestaurantSerivce,
        private menuItemService: MenuitemService
    ) { }

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {
        this.menuItemForm = this.fb.group({
            id: [null],
            name: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', [Validators.required]],
            price: ['', Validators.required],
            selectedRestaurant: ['', Validators.required],
            selectedCategories: ['', Validators.required],
            active:['',Validators.required],
            isveg:['',Validators.required]
        })

        this.getRestaurant();
    }

    getMenuItem() {
        this.menuItemService.getMenuItemList(3).subscribe((result: any) => {
            this.MenuItemData = result;
        });
    }

    loadListData(event?:any) {
                      const first = event?.first ?? 0;
        const rows  = event?.rows ?? 10;  
          const page = (first / rows) + 1;  // page number (1-based)
        let limit = rows;
        this.menuItemDetails = [];
        this.menuItemService.getAllMenuItemList(page,limit,3).subscribe((result: any) => {
            this.menuItemDetails = result.data;
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
        this.menuItemForm.reset();
        this.showTitle="New Menu Item"
    }

    editItem(data: any) {
        console.log(data,'data#');
        this.showTitle=`Menu Item ID (${data.menuitem_id})`
        this.isEditMode = true;

        this.menuItemForm.patchValue({
            id: data.menuitem_id,
            name: data.menuitem_name,
            description: data.menuitem_description,
            active:data.menuitem_active ? 'Y' : 'N',
            price:data.menuitem_price,
            selectedRestaurant:data.restaurant_id,
            selectedCategories:data.categories_id,
            isveg:data.menuitem_isveg
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
        if (this.menuItemForm.valid) {
            const { name, description, price, selectedRestaurant, selectedCategories,active,isveg } = this.menuItemForm.value;
            let formData = {
                name: name,
                description: description,
                price,
                restaurant_id: selectedRestaurant,
                category_id: selectedCategories,
                active:active,
                isveg:isveg
            }

            if (this.isEditMode) {
                const { id } = this.menuItemForm.value;
                this.menuItemService.updateMenuItem(formData, id).subscribe((result) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Menu Item Updated',
                        life: 3000
                    });
                    this.loadListData();
                });
            } else {
                this.menuItemService.createMenuItem(formData).subscribe((result) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Menu Item Added',
                        life: 3000
                    });
                    this.loadListData();
                });
            }


            this.productDialog = false;
            this.restaurant = {}
        }
    }

    selectRestaurant() {
        this.loadListData();
    }

    getRestaurant() {
        this.restaturntService.getAllRestaurantLookup().subscribe(result => {
            this.restaturantOption = result.map((r: any) => ({ id: r.id, name: r.name }));
        });
    }

    onRestaurantSelect(data: any) {
        this.categoriesService.getCategoriesList(data.value).subscribe((result: any) => {
            this.categoriesOption = result.map((r: any) => ({ id: r.id, name: r.name }));
        });
    }


}
