import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, startWith, switchMap } from 'rxjs';
import { Product } from '../model/product';
import { ProductCardListComponent } from '../product-card-list/product-card-list.component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, ProductCardListComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent {
  //公告資料變動，用在新增、刪除
  private readonly refresh$ = new Subject<void>();

  //表單資料
  protected readonly formControl = new FormControl<string | undefined>(
    undefined,
    { nonNullable: true }
  );

  pageIndex = 1;

  //DI 依賴注入
  private productService = inject(ProductService);

  protected pageSize = 5;

  //監控products，一旦變動就執行
  readonly products$ = this.refresh$.pipe(
    startWith(undefined),
    switchMap(() => this.productService.getList(undefined, 1, 5))
  );

  //總頁數監控
  readonly totalCount$ = this.refresh$.pipe(
    startWith(undefined),
    switchMap(() => this.productService.getCount())
  );

  router = inject(Router);

  onView(product: Product): void {
    this.router.navigate(['product', 'view', product.id]);
  }
  onAddCart(product: Product): void {
    this.router.navigate(['product', 'addCart', product.id]);
  }
}
