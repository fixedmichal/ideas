import { Directive, ElementRef, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTypeColorClass]'
})
export class TypeColorClassDirective implements OnInit {
  @Input() appTypeColorClass;
  @HostBinding('class') elementClass;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    
    switch(this.appTypeColorClass) {
      case 'idea':
        this.elementClass = "bg-warning";
        break;
      case 'observation':
        this.elementClass = "bg-dark";
        break;
      case 'gratitude':
        this.elementClass = "bg-success";
        break;
    }
    
    const thisElement = this.elementRef.nativeElement;
    if(this.elementClass==="bg-warning" && thisElement.classList.contains("text-white")) {
      thisElement.classList.remove('text-white');
    }
  }

}
