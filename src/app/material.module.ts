import { NgModule } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule
  ],
  exports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule
  ]
})
export class MaterialModule {}