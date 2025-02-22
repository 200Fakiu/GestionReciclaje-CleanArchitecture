import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../../../shared/services/alertify.service';
import { ProductService } from '../../../shared/services/product.service';
import { ModalService } from '../../../shared/services/modal.service';
import { ProductFilter } from '../../../shared/models/product-filter';
import { Product } from '../../../shared/models/product';
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit, AfterViewInit {
  
  filters = new ProductFilter();
  panelOpenState: boolean;
  displayedColumns: string[] = [ 'name', 'categoryName', 'description' , 'actions'];

  public dataSource = new MatTableDataSource<Product>();
  @ViewChild(MatPaginator ,{static: true}) sort: MatSort;
  @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator;

  constructor(private route: ActivatedRoute, private router: Router,  private alertify: AlertifyService,
              private productService: ProductService,  public dialogService: ModalService) {
              }


  ngOnInit() {
    this.route.data.subscribe(data => {
      this.dataSource.data =  data.products.entity as Product[];
      this.filters.totalRecords = data.products.filters.totalRecords;
    });
  }

  ngAfterViewInit(): void {
     this.dataSource.sort = this.sort;
  }

 pageChanged(event: any): void {
    this.filters.pageNumber = event.pageIndex + 1;
    this.filters.pageSize = event.pageSize;
    this.getAll();
  }


  getAll()  {
    this.productService.getAll(this.filters).subscribe((res) => {
      this.dataSource.data = res.entity as Product[];
    }, error => {
      this.alertify.error(error);
    });
  }

  createProduct() {
    this.router.navigate(['productos/crear']);
  }

  clearFilters(){
    this.filters.name = '';
    this.getAll();
  }

  goToEdit(productSelected: Product) {
    this.router.navigate(['/productos/editar', productSelected.productId]);
   }

   delete(productSelected): void {
    this.dialogService.openConfirmDialog('Está seguro que desea eliminar este producto ?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.productService.delete(productSelected.productId).subscribe(() => {
          this.getAll();
          this.alertify.success('Eliminado exitosamente !');
        }, error => {
          this.alertify.error(error);
        });
      }
    });
  }
}
