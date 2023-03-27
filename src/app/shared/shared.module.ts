import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
// import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LoaderComponent } from './loader/loader.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';
const material =[
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
 MatCheckboxModule,
 MatListModule

]
@NgModule({
  declarations: [
    HeaderComponent,
    LoaderComponent,
    SidebarComponent
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
    SidebarComponent
  ]
})
export class SharedModule { }
