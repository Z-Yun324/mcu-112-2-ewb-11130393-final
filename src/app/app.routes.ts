import { Routes } from '@angular/router';
import { CartPageComponent } from './cart-page/cart-page.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { productResolver } from './resolver/product.resolver';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  { path: 'products', component: ProductPageComponent },
  { path: 'cart', component: CartPageComponent },
  {
    path: 'product/view/:id',
    component: ProductDetailPageComponent,
    resolve: { product: productResolver },
  },
  {
    path: 'product/addCart/:id',
    component: CartPageComponent,
    resolve: { product: productResolver },
  },
];
