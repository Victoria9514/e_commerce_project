import { ComponentType } from '@angular/cdk/portal';
import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

export interface SnackBarOpts<D = any> {
  /** The snackbar's message. */
  msg: string;
  /** The snackbar's action. */
  action?: string;
  /** A component to open the snackbar with. */
  component?: ComponentType<any>;
  /** Configuration for the snackbar. */
  config?: MatSnackBarConfig<D>;
  /**
   * Additional options for the snackbar.
   * @deprecated Use {@link SnackBarOpts#config} instead
   */
  additionalOpts?: MatSnackBarConfig<D>;
}

@Injectable({
  providedIn : 'root'
})
export  class SharedService {
  private _snackBar = inject(MatSnackBar)

  openSnackBar(opts: SnackBarOpts): MatSnackBarRef<SimpleSnackBar> {
    return this.handleSnackBar(opts);
  }

   handleSnackBar(opts: SnackBarOpts): MatSnackBarRef<SimpleSnackBar> {
    // tslint:disable-next-line:deprecation
    const config = opts.config ? opts.config : undefined;
    return this._snackBar.open(opts.msg, opts.action ? opts.action : undefined, config);
  }

}
