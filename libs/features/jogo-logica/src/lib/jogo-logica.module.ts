import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GerenciadorComponent } from './componentes/gerenciador/gerenciador.component';
import { CorpoPrincipalComponent } from './componentes/corpo-principal/corpo-principal.component';
import { CampoComponent } from './componentes/campo/campo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    GerenciadorComponent,
    CorpoPrincipalComponent,
    CampoComponent
  ],
  exports: [
    GerenciadorComponent
  ]
})
export class JogoLogicaModule { }