import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  themeSignal = signal<string>('light');

  setTheme(theme: string) {
    this.themeSignal.set(theme);
  }

  toggleTheme() {
    this.themeSignal.update(value => value==='light'?'dark':'light');
  }
}
