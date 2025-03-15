import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, InjectionToken, Renderer2, RendererFactory2, Signal, computed, effect, inject, linkedSignal, signal } from '@angular/core';

export type ColorMode = 'light' | 'dark';

export const PREFERRED_COLOR_MODE = new InjectionToken<Signal<ColorMode>>(
  'PREFERRED_COLOR_MODE',
  {
    providedIn: 'root',
    factory: () => {
      const destroyRef = inject(DestroyRef);
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      const colorMode = signal<ColorMode>(
        mediaQuery.matches ? 'dark' : 'light',
      );

      const preferredColorModeChangeListener = (event: MediaQueryListEvent): void => {
        event.matches ? colorMode.set('dark') : colorMode.set('light');
      };

      mediaQuery.addEventListener('change', preferredColorModeChangeListener);

      destroyRef.onDestroy(() =>
        mediaQuery.removeEventListener('change', preferredColorModeChangeListener),
      );

      return colorMode;
    },
  },
);

export const injectRenderer2 = (): Renderer2 =>
  inject(RendererFactory2).createRenderer(null, null);

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly DARK_MODE_CLASS = 'dark-mode';

  private readonly _renderer = injectRenderer2();
  private readonly _document = inject(DOCUMENT);
  private readonly _preferredColorMode = inject(PREFERRED_COLOR_MODE);

  private readonly _mode = linkedSignal(() => this._preferredColorMode());
  readonly mode = this._mode.asReadonly();
  readonly isDarkMode = computed(() => this.mode() === 'dark');

  constructor() {
    effect(() => {
      this._applyDarkModeClass(this.isDarkMode());
    });
  }

  toggleDarkMode(): void {
    this._mode.update((mode) => (mode === 'light' ? 'dark' : 'light'));
  }

  setDarkMode(enabled: boolean): void {
    this._mode.set(enabled ? 'dark' : 'light');
  }

  private _applyDarkModeClass(enabled: boolean): void {
    if (enabled) {
      this._renderer.addClass(this._document.body, this.DARK_MODE_CLASS);
    } else {
      this._renderer.removeClass(this._document.body, this.DARK_MODE_CLASS);
    }
  }
}
