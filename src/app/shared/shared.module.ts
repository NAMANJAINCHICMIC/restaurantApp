import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
// import {MatToolbarModule} from '@angular/material/toolbar';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LoaderComponent } from './loader/loader.component';
const material =[
  MatToolbarModule,
  MatIconModule
]
@NgModule({
  declarations: [
    HeaderComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    material
  ],
  exports:[
    material,
    HeaderComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
