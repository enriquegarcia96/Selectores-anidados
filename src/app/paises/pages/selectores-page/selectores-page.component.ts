import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesServiceService } from '../../services/paises-service.service';
import { PaisSmall } from '../../interfaces/paises.interface';

@Component({
  selector: 'app-selectores-page',
  templateUrl: './selectores-page.component.html',
  styleUrls: ['./selectores-page.component.css'],
})
export class SelectoresPageComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    region: ['', [Validators.required]],
    pais: ['', Validators.required]
  });

  //llenar selectores
  regiones: string[] = [];
  paises: PaisSmall[] = [];

  constructor(
    private fb: FormBuilder,
    private paisesService: PaisesServiceService
  ) {}

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;

    // cuando cambie la region en el selector
    this.miFormulario.get('region')?.valueChanges.subscribe((region) => {
      console.log(region);

      this.paisesService.getPaisesPorRegion(region).subscribe((paises) => {
        console.log(paises);
        this.paises = paises;
      });
    });
  }

  guardar() {
    console.log(this.miFormulario.value);
  }
}
