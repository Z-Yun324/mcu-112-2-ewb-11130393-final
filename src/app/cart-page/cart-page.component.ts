import { CurrencyPipe, JsonPipe } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { filter, map } from 'rxjs';
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

  private readonly destroyRef = inject(DestroyRef);

  form = new FormGroup<IOrderForm>({
    name: new FormControl<string | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    address: new FormControl<string | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    telephone: new FormControl<string | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    details: new FormArray<FormGroup<IOrderDetailForm>>([]),
  });

  product!: Product;

  totalPrice = 0;

  ngOnInit(): void {
    this.route.paramMap.subscribe();

    this.route.data.subscribe((data) => (this.product = data['product']));

    this.route.data
      .pipe(map((data: Data) => data['product']))
      .subscribe((product) => (this.product = product));

    this.details.valueChanges
      .pipe(
        map((items) =>
          items.length === 0
            ? 0
            : items.reduce((total, item) => total + (item.price || 0), 0)
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((totalPrice) => (this.totalPrice = totalPrice));
    this.setOrderDetail();
  }

  setOrderDetail() {
    for (const item of this.shoppingCartService.data) {
      const control = new FormGroup<IOrderDetailForm>({
        id: new FormControl<number>(item.id, {
          nonNullable: true,
        }),
        product: new FormControl<Product>(item.product, {
          nonNullable: true,
        }),
        count: new FormControl<number>(item.count, {
          nonNullable: true,
        }),
        price: new FormControl<number>(item.product.price * item.count, {
          nonNullable: true,
        }),
      });

      control
        .get('count')!
        .valueChanges.pipe(
          filter((value) => value !== undefined),
          map((value) => value * item.product.price),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe((price) =>
          control.get('price')!.setValue(price, { emitEvent: false })
        );

      this.details.push(control);
    }
  }

  onSave(): void {
    console.log('save');
  }

  get name(): FormControl<string | undefined> {
    return this.form.get('name') as FormControl<string | undefined>;
  }

  get address(): FormControl<string | undefined> {
    return this.form.get('address') as FormControl<string | undefined>;
  }

  get telephone(): FormControl<string | undefined> {
    return this.form.get('telephone') as FormControl<string | undefined>;
  }

  get details(): FormArray<FormGroup<IOrderDetailForm>> {
    return this.form.get('details') as FormArray<FormGroup<IOrderDetailForm>>;
  }
}
