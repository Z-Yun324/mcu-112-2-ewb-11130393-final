import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Subject,
  combineLatest,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { Product } from '../model/product';
import { ProductCardListComponent } from '../product-card-list/product-card-list.component';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, ProductCardListComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent {
  //表單資料
  protected readonly formControl = new FormControl<string | undefined>(
    undefined,
    { nonNullable: true }
  );

  //公告資料變動，用在新增、刪除
  private readonly refresh$ = new Subject<void>();

  //查詢監控
  private readonly condition$ = new BehaviorSubject<string | undefined>(
    undefined
  );
  get condition() {
    return this.condition$.value;
  }
  set condition(value: string | undefined) {
    this.condition$.next(value);
  }

  //當前頁監控
  private readonly pageIndex$ = new BehaviorSubject<number>(1);
  get pageIndex() {
    return this.pageIndex$.value;
  }
  set pageIndex(value: number) {
    this.pageIndex$.next(value);
  }

  //取得資料
  readonly products$ = combineLatest([
    this.refresh$.pipe(
      startWith(undefined),
      tap((condition) => console.log('refresh', condition))
    ),
    this.condition$.pipe(
      tap((condition) => console.log('condition', condition))
    ),
    this.pageIndex$.pipe(tap((index) => console.log('pageIndex', index))),
  ]).pipe(
    tap((data) => console.log(data)),
    switchMap(([_, condition, pageIndex]) =>
      this.productService.getList(condition, pageIndex, this.pageSize)
    ),
    tap((data) => console.log(data))
  );

  //總頁數監控
  readonly totalCount$ = combineLatest([
    this.refresh$.pipe(startWith(undefined)),
    this.condition$,
  ]).pipe(
    switchMap(([_, condition]) => this.productService.getCount(condition))
  );

  //DI 依賴注入
  private readonly productService = inject(ProductService);
  readonly shoppingCartService = inject(ShoppingCartService);

  protected pageSize = 5;

  router = inject(Router);

  onView(product: Product): void {
    this.router.navigate(['product', 'view', product.id]);
  }
  /*onAddCart(product: Product): void {
    this.router.navigate(['product', 'addCart', product.id]);
  }*/

  onOageIndexChange(index: number): void {
    console.log(index);
    this.pageIndex = index;
  }
}
