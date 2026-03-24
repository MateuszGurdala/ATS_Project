import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public readonly theme: WritableSignal<"default" | "dark" | "contrast"> = signal("default")

  constructor() {
    if (localStorage.getItem("theme") == null)
      localStorage.setItem("theme", "default")
    this.theme.set(<"default" | "dark" | "contrast">localStorage.getItem("theme"))
    this.setTheme(this.theme());
  }

  public switchTheme(): void {
    switch (this.theme()) {
      case "default":
        this.setDark()
        break;
      case "dark":
        this.setContrast()
        break;
      case "contrast":
        this.setDefault()
        break;
    }
    localStorage.setItem("theme", this.theme())
  }

  private setTheme(theme: "default" | "dark" | "contrast"): void {
    switch (theme) {
      case "default":
        this.setDefault()
        break;
      case "dark":
        this.setDark()
        break;
      case "contrast":
        this.setContrast()
        break;
    }
  }

  private setDark(): void {
    document.documentElement.style.setProperty('--main', '#212529');
    document.documentElement.style.setProperty('--main-tint', '#212529');
    document.documentElement.style.setProperty('--main-shade', '#0D0F10');
    document.documentElement.style.setProperty('--grey-shadow', '#22b8cf');
    this.theme.set("dark")
  }

  private setDefault(): void {
    document.documentElement.style.setProperty('--main', '#dee2e6');
    document.documentElement.style.setProperty('--main-tint', '#f1f3f5');
    document.documentElement.style.setProperty('--main-shade', '#adb5bd');
    document.documentElement.style.setProperty('--grey-shadow', '#888');
    this.theme.set("default")
  }

  private setContrast(): void {
    this.setDark()
    this.theme.set("contrast")
  }
}
