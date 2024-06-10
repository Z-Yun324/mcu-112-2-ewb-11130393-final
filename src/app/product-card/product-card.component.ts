import { CurrencyPipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  booleanAttribute,
  numberAttribute,
} from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input({ required: true, transform: numberAttribute }) id!: number;
  @Input() imgUrl!: string;
  @Input() productName!: string;
  @Input() authors!: string[];
  @Input() company!: string;
  @Input({ transform: numberAttribute }) price!: number;
  @Input({ transform: booleanAttribute }) isSale!: boolean;

  OnSale(isSale: boolean): void {
    this.isSale = isSale;
  }
  @HostBinding('class')
  class = 'product-card';

  @Output()
  view = new EventEmitter<void>();

  @Output()
  addCart = new EventEmitter<void>();
}
