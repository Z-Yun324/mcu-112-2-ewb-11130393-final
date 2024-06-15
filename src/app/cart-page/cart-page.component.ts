import { CurrencyPipe, JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { map } from 'rxjs';
import { IOrderDetailForm } from '../interface/order-detail-form.interface';
import { IOrderForm } from '../interface/order-form.interface';
import { Product } from '../model/product';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CurrencyPipe, JsonPipe, ReactiveFormsModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  readonly shoppingCartService = inject(ShoppingCartService);

  form = new FormGroup<IOrderForm>({
    name: new FormControl<string | undefined>(undefined, { nonNullable: true }),
    address: new FormControl<string | undefined>(undefined, {
      nonNullable: true,
    }),
    telephone: new FormControl<string | undefined>(undefined, {
      nonNullable: true,
    }),
    details: new FormArray<FormGroup<IOrderDetailForm>>([]),
  });

  product!: Product;

  ngOnInit(): void {
    this.setOrderDetail();

    this.route.paramMap.subscribe();

    this.route.data.subscribe((data) => (this.product = data['product']));

    this.route.data
      .pipe(map((data: Data) => data['product']))
      .subscribe((product) => (this.product = product));
  }

  setOrderDetail() {
    for (const item of this.shoppingCartService.data) {
      const control = new FormGroup<IOrderDetailForm>({
        id: new FormControl<number>(item.id, { nonNullable: true }),
        product: new FormControl<Product>(item.product, { nonNullable: true }),
        count: new FormControl<number>(item.count, { nonNullable: true }),
        price: new FormControl<number>(item.product.price * item.count, {
          nonNullable: true,
        }),
      });

      this.details.push(control);
    }
  }

  get details(): FormArray<FormGroup<IOrderDetailForm>> {
    return this.form.get('details') as FormArray<FormGroup<IOrderDetailForm>>;
  }
}
