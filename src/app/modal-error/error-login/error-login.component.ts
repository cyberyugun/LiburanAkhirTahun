import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-error-login',
  templateUrl: './error-login.component.html',
  styleUrls: ['./error-login.component.css']
})
export class ErrorLoginComponent implements OnInit {
reason='';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  		this.reason=this.data;
  }

}
