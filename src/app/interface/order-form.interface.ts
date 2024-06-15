import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { IOrderDetailForm } from './order-detail-form.interface';

export interface IOrderForm {
  name: FormControl<string | undefined>;
  address: FormControl<string | undefined>;
  telephone: FormControl<string | undefined>;
  details: FormArray<FormGroup<IOrderDetailForm>>;
}
