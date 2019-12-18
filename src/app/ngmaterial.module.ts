import { NgModule } from '@angular/core';
import {
	MatIconModule,
	MatInputModule,
	MatFormFieldModule,
	MatDialogModule
			} from '@angular/material';

const ExportedMatModules = [
			MatIconModule,
			MatInputModule,
			MatFormFieldModule,
			MatDialogModule
]


@NgModule({
  	imports: [...ExportedMatModules	],
  	exports: [...ExportedMatModules ]
})
export class MaterialAppModule { }
