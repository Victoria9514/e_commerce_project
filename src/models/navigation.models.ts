export interface NavLinks {
  route: string;
  name: string;
}




export interface NavigationState {
  route: string;
  selected: { navLink: string; value: null | string[]
   }[];
}
