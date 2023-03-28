import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
// import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LoaderComponent } from './loader/loader.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';

const material =[
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
 MatCheckboxModule,
 MatListModule,
 MatMenuModule

]
@NgModule({
  declarations: [
    HeaderComponent,
    LoaderComponent

  ],
  imports: [
    CommonModule,
    material,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    material,
    HeaderComponent,
    LoaderComponent,

  ]
})
export class SharedModule { }
