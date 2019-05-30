import { Component, OnInit } from '@angular/core';
import { Plant } from 'src/app/models/Plant';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { PlantService } from 'src/app/_services/plant.service';
import { MuncipioService } from 'src/app/_services/muncipio.service';

@Component({
  selector: 'app-create-plant',
  templateUrl: './create-plant.component.html',
  styleUrls: ['./create-plant.component.css']
})
export class CreatePlantComponent implements OnInit {
  plantRegister: Plant;
  createPlantForm: FormGroup;
  municipios: any[];

    constructor(private plantService: PlantService,
                private router: Router,
                private municipioService: MuncipioService,
                private alertService: AlertifyService, private fb: FormBuilder) {}

  ngOnInit() {
    this.createRegisterForm();
    this.getAllMunicipios();
  }

  createRegisterForm() {
    this.createPlantForm = this.fb.group(
        {
          name: ['', Validators.required],
          address: ['', Validators.required],
          municipioId: ['', Validators.required],
          operatorsQuantity: ['', Validators.required],
        }
    );
  }

  get f() { return this.createPlantForm.controls; }

  save() {
    if (this.createPlantForm.invalid) {return; }

    this.plantRegister = Object.assign({}, this.createPlantForm.value);

    this.plantService.create(this.plantRegister).subscribe(() => {
       this.alertService.success('Creado Exitosamente');
     }, error => {
       this.alertService.error(error);
     }, () => {
         this.router.navigate(['/Plant']);
     });
 }

 cancel() {
   this.router.navigate(['/Plant']);
 }

 getAllMunicipios(){
   this.municipioService.getAll().subscribe(data =>  { 
    this.municipios = data.municipios;
   }, error => {
      this.alertService.error(error);
   }, () => {
   });
 }

}
