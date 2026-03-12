import { Directive, ElementRef, HostListener, Input, input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlightCard]',
})
export class HighlightCard implements OnChanges{
@Input() externalColor:string = 'black'
@Input('appHighlightCard') defaultColor:string = 'wheat'
  // first life cycle execute then it will take default color above (wheat) then the color in html 
constructor(private element:ElementRef) {
  }
  // so i need onchanges
  ngOnChanges(changes: SimpleChanges): void {
  this.element.nativeElement.style.backgroundColor = this.defaultColor

  }
  // to accept this action i need decorator function @HostListener
 @HostListener('mouseover') over(){
  //  this.element.nativeElement.style.backgroundColor=this.externalColor
    this.element.nativeElement.style.backgroundColor=this.externalColor

}
 @HostListener('mouseout') out(){
   this.element.nativeElement.style.backgroundColor = this.defaultColor
  }
}


// custom directive
