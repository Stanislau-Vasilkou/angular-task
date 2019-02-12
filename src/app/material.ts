import {NgModule} from "@angular/core";
import {
  MatButtonModule, MatIconModule,
  MatInputModule, MatOptionModule, MatProgressSpinnerModule, MatSelectModule, MatTabsModule,
  MatToolbarModule
} from "@angular/material";

@NgModule( {
  imports: [MatButtonModule, MatInputModule, MatOptionModule, MatSelectModule, MatToolbarModule,MatIconModule, MatTabsModule, MatProgressSpinnerModule],
  exports: [MatButtonModule, MatInputModule, MatOptionModule, MatSelectModule, MatToolbarModule, MatIconModule, MatTabsModule, MatProgressSpinnerModule],
})

export class MaterialModule { }
