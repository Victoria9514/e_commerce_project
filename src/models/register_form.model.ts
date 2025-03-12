import { FormControl } from "@angular/forms";

export type RegisterForm = {
  [prop: string] : FormControl<string | null>
};


