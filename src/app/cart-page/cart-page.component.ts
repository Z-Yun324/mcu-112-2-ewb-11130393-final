import { JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { map } from 'rxjs';
import { Product } from '../model/product';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  product!: Product;

  ngOnInit(): void {
    this.route.paramMap.subscribe();

    this.route.data.subscribe((data) => (this.product = data['product']));

    this.route.data
      .pipe(
        map((data: Data) => data['product'])
        //..
        //..
        //..
      )
      .subscribe((product) => (this.product = product));
  }
}
