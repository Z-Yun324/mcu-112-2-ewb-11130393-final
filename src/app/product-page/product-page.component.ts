import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, startWith, switchMap } from 'rxjs';
import { Product } from '../model/product';
import { ProductCardListComponent } from '../product-card-list/product-card-list.component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [AsyncPipe, ProductCardListComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent {
  //公告資料變動，用在新增、刪除
  private readonly refresh$ = new Subject<void>();

  //DI 依賴注入
  private productService = inject(ProductService);

  //監控products，一旦變動就執行
  readonly products$ = this.refresh$.pipe(
    startWith(undefined),
    switchMap(() => this.productService.getList('書籍A', 1, 5))
  );

  router = inject(Router);

  onView(product: Product): void {
    this.router.navigate(['product', 'view', product.id]);
  }
  onAddCart(product: Product): void {
    this.router.navigate(['product', 'addCart', product.id]);
  }
}
