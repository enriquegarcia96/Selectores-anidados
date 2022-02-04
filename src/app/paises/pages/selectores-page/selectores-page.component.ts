import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesServiceService } from '../../services/paises-service.service';

@Component({
  selector: 'app-selectores-page',
  templateUrl: './selectores-page.component.html',
  styleUrls: ['./selectores-page.component.css'],
})
export class SelectoresPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region: ['', [Validators.required]],
  });

  //llenar selectores
  regiones: string[] = [];


  constructor(
    private fb: FormBuilder,
    private paisesService: PaisesServiceService
  ) {}

  ngOnInit(): void {

    this.regiones = this.paisesService.regiones;

  }

  guardar() {
    console.log(this.miFormulario.value);
  }
}

