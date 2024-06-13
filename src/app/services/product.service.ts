import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _data = [
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

  /*getList(): Product[] {
    return this._data;
  }*/

  //可被監控的
  getList(
    name: string | undefined,
    pageIndex: number,
    pageSize: number
  ): Observable<Product[]> {
    return of(this._data);
  }

  getById(productId: number): Observable<Product> {
    const product = this._data.find(({ id }) => id === productId)!;
    return of(product);
  }
}
