import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/service/rest-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  prods: Object;
  // length = 0;
  constructor(
    public rest:RestApiService
    ) { }

  async ngOnInit() {
    await this.rest.getProducts().subscribe((data) => {
      if (data['success']) {
        this.prods = data['prod'];
        // this.length = data['prod'].length
      }
    });
  }

}
