import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/service/rest-api.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  prods: any = {};
  id: any;
  token: any;
  login =false;
  bookingt =false;
  constructor(
        public rest: RestApiService,
        private activatedRoute: ActivatedRoute,
        public data:DataService
  ) { }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      this.id = res['id'];
      this.dataHeader();
    });
  }

  async dataHeader(){
    await this.rest.getDetailProducts(this.id).subscribe((data) => {
      if (data['success']) {
        this.prods = data['prod'][0];
      }
    });
  }

  Booking(){
    this.bookingt = true;
  }

}
