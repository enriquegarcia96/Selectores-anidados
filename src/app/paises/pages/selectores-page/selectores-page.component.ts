import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesServiceService } from '../../services/paises-service.service';
import { PaisSmall, Pais } from '../../interfaces/paises.interface';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selectores-page',
  templateUrl: './selectores-page.component.html',
  styleUrls: ['./selectores-page.component.css'],
})
export class SelectoresPageComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    region: ['', [Validators.required]],
    pais: ['', Validators.required],
    frontera: ['', Validators.required],
  });

  //llenar selectores
  regiones: string[] = [];
  paises: PaisSmall[] = [];
  //fronteras: string[] = [];
  fronteras: PaisSmall[] = [];

  //UI
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private paisesService: PaisesServiceService
  ) {}

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;

    // this.miFormulario.get('region')?.valueChanges.subscribe((region) => {
    //   console.log(region);

    //   this.paisesService.getPaisesPorRegion(region).subscribe((paises) => {
    //     console.log(paises);
    //     this.paises = paises;
    //   });
    // });

    // cuando cambie la region en el selector del segundo selector
    // y pueda purgarse el segundo selector
    this.miFormulario
      .get('region')
      ?.valueChanges.pipe(
        tap((_) => {
          // para que reseteo el segundo selector
          this.miFormulario.get('pais')?.reset('');
          this.cargando = true;
        }),
        switchMap((region) => this.paisesService.getPaisesPorRegion(region))
      )
      .subscribe((paises) => {
        //console.log(paises);
        this.paises = paises;
        this.cargando = false;
      });

    /**
     * Cuando cambia el pais
     */
    this.miFormulario
      .get('pais')
      ?.valueChanges.pipe(
        tap(() => {
          this.miFormulario.get('frontera')?.reset('');
          this.cargando = true;
        }),
        switchMap((codigo) => this.paisesService.getPaisPorCodigo(codigo)),

        switchMap((pais) =>
          this.paisesService.getPaisesPorCodigos(pais?.borders!)
        ),
        tap(console.log)
      )
      .subscribe((paises) => {
        console.log(paises);
        // this.fronteras = pais?.borders || [];
        this.fronteras = paises;
        this.cargando = false;
      });
  }

  guardar() {
    console.log(this.miFormulario.value);
  }
}
