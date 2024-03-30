import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appImgBroken]',
  standalone: true
})
export class ImgBrokenDirective {

  /**
   *
   * *img path for invalid src
   */
  @Input()
  handleImgError?: string;

  /**
   *
   * @param event
   */
  @HostListener('error', ['$event'])
  handleImageError(event: Event): void {
    const image = event.target as HTMLInputElement;
    image.src = this.handleImgError ?? '/assets/sistema/background.jpg'; // e.g. ./assets/images/default-image.png
  }
}
