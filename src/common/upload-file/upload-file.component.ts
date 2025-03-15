import {
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
  booleanAttribute,
  inject,
  input,
  output
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';

@Component({
    selector: 'upload-file',
    templateUrl: './upload-file.component.html',
    imports: [MatIconModule],
    styleUrls: ['./upload-file.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UploadFileComponent {
  selectedFile!: FileList | null;
  store = inject(Store);
  data = input<number>();
  isMultiple = input<boolean>();
  hidden = input(false, { transform: booleanAttribute });
  showIcon = input(false)
  readonly fileSubmitted = output<FileList>();

  @ViewChild('fileUploader') fileUploader!: ElementRef;

  onFileSelected(event: Event): void {
    this.selectedFile = (event.target as HTMLInputElement).files;
    console.log(this.selectedFile);
    if (this.selectedFile) {
      this.fileSubmitted.emit(this.selectedFile);
    }
    this.resetFiles();
  }

  resetFiles() {
    this.fileUploader.nativeElement.value = null;
  }

  // onSubmit(): boolean {
  //   // this.store.dispatch(loadingSpinner({ status: true }));
  //   console.log(this.selectedFile);

  //   this.onsubmit.subscribe(data => console.log(data))

  //   if (this.selectedFile) {
  //     if (this.selectedFile?.length === 1 && !this.isMultiple()) {
  //       // upload an avatar
  //       this.formData.append('user_id', JSON.stringify(this.user_id()));
  //       this.formData.append('image', this.selectedFile[0]);
  //       this.store.dispatch(updateAvatar({ userData: this.formData }));
  //     }
  //     // upload products
  //     else {
  //       console.log(this.selectedFile);
  //       for (let product of this.selectedFile) {
  //         this.formData.append(`images`, product);
  //       }
  //       this.formData.append('data', JSON.stringify(this.data()));
  //       this.store.dispatch(
  //         ProductsActions.addProduct({ product: this.formData })
  //       );
  //     }
  //     this.fileUploader.nativeElement.value = null;
  //   }
  //   return true;
  // }
}
