import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Plant } from 'src/app/models/Plant';
import { ActivatedRoute, Router } from '@angular/router';
import { PlantService } from 'src/app/_services/plant.service';
import { ModalService } from 'src/app/_services/modal.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { PlantFilter } from 'src/app/models/plantFilter';

@Component({
  selector: 'app-list-plant',
  templateUrl: './list-plant.component.html',
  styleUrls: ['./list-plant.component.css']
})
export class ListPlantComponent implements OnInit, AfterViewInit {
  
  filters = new PlantFilter();
  displayedColumns: string[] = [ 'name', 'address', 'municipioName', 'operatorsQuantity','actions'];
  public dataSource = new MatTableDataSource<Plant>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private route: ActivatedRoute, private router: Router,  private alertify: AlertifyService,
              private plantService: PlantService,  public dialogService: ModalService) { }


  ngOnInit() {
    this.route.data.subscribe(data => {
      this.dataSource.data =  data.plants.entity as Plant[];
      // this.filters = data.Plant.filters;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

 pageChanged(event: any): void {
    this.filters.pageNumber = event.page;
    this.getAll();
  }


  getAll()  {
    this.plantService.getAll(this.filters).subscribe((res) => {
      // this.dataSource.data = res.Plant.entity as Plant[];
      // this.filters = res.Plant.filters;
      console.log(res);
    }, error => {
      this.alertify.error(error);
    });
  }

  createPlant() {
    this.router.navigate(['Plant/create']);
  }

  clearFilters(){

  }

  goToEdit(plantSelected: Plant) {
    this.router.navigate(['/Plant/edit', plantSelected.plantId]);
   }

   delete(plantSelected): void {
    this.dialogService.openConfirmDialog('Está seguro que desea eliminar esta planta ?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.plantService.deletePlant(plantSelected.plantId).subscribe(() => {
          this.getAll();
          this.alertify.success('Eliminado exitosamente !');
        }, error => {
          this.alertify.error(error);
        });
      }
    });
  }
}
