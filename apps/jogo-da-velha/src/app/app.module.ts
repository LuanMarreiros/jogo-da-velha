import { JogoLogicaModule } from './../../../../libs/features/jogo-logica/src/lib/jogo-logica.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, JogoLogicaModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
