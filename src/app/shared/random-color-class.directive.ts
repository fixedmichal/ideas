import { Directive, HostBinding, OnInit } from '@angular/core';

@Directive({
  selector: '[appRandomColorClass]'
})
export class RandomColorClassDirective implements OnInit {
  @HostBinding('class') elementClass;
  constructor() { }

  ngOnInit() {
    const bootstrapColorClasses: string[] = ['bg-danger', 'bg-dark'];
    const randomInteger = Math.floor(Math.random() * bootstrapColorClasses.length);
    this.elementClass = bootstrapColorClasses[randomInteger];
  }

}

