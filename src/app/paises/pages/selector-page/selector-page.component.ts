import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { PaisSmall } from '../../interfaces/paises.interfaces';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html'
})
export class SelectorPageComponent implements OnInit {

  miFormulario:FormGroup=this.fb.group({
    region:  ['',Validators.required],
    pais:    ['',Validators.required],
    frontera:['',Validators.required]
  })

  //llenar selector
  regiones:string []=[];
  paises:PaisSmall[]=[];
  fronteras:string[]=[];

  //ui
  cargando:boolean=false;

  constructor(private fb:FormBuilder,
              private pservice:PaisesService){}

  ngOnInit(): void {
  //carga el select con los valores del service
   this.regiones =this.pservice.regiones;

  // al momento de cambiar la region borra el pais selecionado por el switchmap
  this.miFormulario.get('region')?.valueChanges
    .pipe(
      tap((_)=>{
        this.miFormulario.get("pais")?.reset('');
        this.cargando=true;
      }),
      switchMap(region=>this.pservice.getpaisesPorRegion(region))
    )
    .subscribe(paises=>{
      this.paises=paises;
      this.cargando=false;
    })

    this.miFormulario.get('pais')?.valueChanges
    .pipe(
      tap((_)=>{
        this.miFormulario.get("frontera")?.reset('');
        this.cargando=true;
      }),
      switchMap(codigo=>this.pservice.getPaisPorCodigo(codigo))
    )
      .subscribe(pais=>{
        this.fronteras = pais[0]?.borders;
        this.cargando=false;
      })
  }

  guardar(){
    console.log(this.miFormulario.value);
  }
}
