import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/product';
import { ProductCardListComponent } from '../product-card-list/product-card-list.component';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [ProductCardListComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent {
  products = [
    new Product({
      id: 1,
      imgUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      name: '書籍A',
      authors: ['作者甲', '作者乙', '作者丙'],
      company: '公司名稱',
      isSale: true,
      price: 10000,
    }),

    new Product({
      id: 2,
      imgUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      name: '書籍B',
      authors: ['作者甲', '作者乙', '作者丙'],
      company: '公司名稱',
      isSale: true,
      price: 10000,
    }),

    new Product({
      id: 3,
      imgUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      name: '書籍C',
      authors: ['作者甲', '作者乙', '作者丙'],
      company: '公司名稱',
      isSale: true,
      price: 10000,
    }),

    new Product({
      id: 4,
      imgUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      name: '書籍D',
      authors: ['作者甲', '作者乙', '作者丙'],
      company: '公司名稱',
      isSale: true,
      price: 10000,
    }),
  ];

  router = inject(Router);

  onView(product: Product): void {
    this.router.navigate(['product', 'view', product.id]);
  }
  onAddCart(product: Product): void {
    this.router.navigate(['product', 'addCart', product.id]);
  }
}
