import {
  Component,
  OnInit,
  ViewChild,
  inject
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

import { NgTemplateOutlet, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { UploadFileComponent } from '../../../common/upload-file/upload-file.component';
import {
  ProductClothesSize,
  ProductColor,
  ProductForm,
  ProductGender,
  ProductShoesSize,
  sizes
} from '../../../models/product.model';
import { ICategory, ISubCategory } from '../../../models/states.models';
import { CategoryActions, loadingSpinner } from '../../../store/actions';
import {
  selectCategories,
  selectCurrentSubCategory
} from '../../../store/selectors';
import { Utils } from '../../../utils';
import { ProductsActions } from '../store/product.actions';

@Component({
    selector: 'app-product-add-form',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatListModule,
        TitleCasePipe,
        UploadFileComponent,
        PushPipe,
        MatButtonModule,
        NgTemplateOutlet
    ],
    templateUrl: './product-add-form.component.html',
    styleUrl: './product-add-form.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductAddFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  public readonly productColors = Object.values(ProductColor);
  public readonly shoesSizes = Object.values(ProductShoesSize);
  public readonly clothesSizes = Object.values(ProductClothesSize);
  public readonly genders = Object.values(ProductGender);
  selectCategories$ = this.store.select(selectCategories);
  selectSubCategories$ = this.store.select(selectCurrentSubCategory);
  readonly sizes = sizes
  toggleBtns = { toggleCategory: false, toggleSubCategory: false };
  productForm: FormGroup = new FormGroup({});
  categoryForm: FormGroup = new FormGroup({});
  subCategoryForm: FormGroup = new FormGroup({});
  formData = new FormData();

  @ViewChild(FormGroupDirective) private formDir!: FormGroupDirective;


  ngOnInit() {
    this.productForm = this.fb.group<ProductForm>({
      product_id: new FormControl(Utils.generateUUID()),
      title: new FormControl('', [Validators.required]),
      desc: new FormControl('', [Validators.required]),
      quantity: new FormControl(1, [Validators.required]),
      color: new FormControl(null, [Validators.required]),
      category: new FormControl(0, [Validators.required]),
      sub_category: new FormControl([Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      size: new FormControl(null, [Validators.required]),
      price: new FormControl(0, [Validators.required]),
    });

    this.categoryForm = new FormGroup({
      name: new FormControl(''),
      desc: new FormControl(''),
    });

    this.subCategoryForm = new FormGroup({
      name: new FormControl(''),
      desc: new FormControl(''),
      categoryName: new FormControl(''),
    });

    this.store.dispatch(loadingSpinner({ status: true }));
    this.store.dispatch(CategoryActions.getCategories());
    this.store.dispatch(CategoryActions.getSubCategories());
  }

  submit(files: FileList) {
    if (!files) throw new Error('no files selected');
    if (files instanceof FileList) {
      for (let i = 0; i < files?.length; i += 1) {
        this.formData.append(`images`, files[i]);
      }
    }
  }

  onSubmit() {
    this.formData.append('data', JSON.stringify(this.productForm.value));
    this.store.dispatch(loadingSpinner({ status: true }));
    this.store.dispatch(ProductsActions.addProduct({ product: this.formData }));
    this.formDir.resetForm();
  }

  addCategory(newCategory: ICategory) {
    this.store.dispatch(CategoryActions.addCategory({ newCategory }));
    this.categoryForm.reset();
  }

  addSubCategory(newSubCategory: ISubCategory) {
    this.store.dispatch(CategoryActions.addSubCategory({ newSubCategory }));
    this.subCategoryForm.reset();
  }

  valueChanged(event: MatSelectChange) {
    console.log(event.value)
    this.store.dispatch(CategoryActions.valueChaged({value: event.value}))
    console.log(this.sizes)
  }
}
