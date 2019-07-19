import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cot-hab-detail',
  templateUrl: './cot-hab-detail.component.html',
  styles: [`.mat-radio-button ~ .mat-radio-button {
    margin-left: 16px;
  }`]
})
export class CotHabDetailComponent implements OnInit {

  @Output() total = new EventEmitter<any>()
  @Input() habs:any = []
  @Input() moneda:boolean = true
  @Input() paymentSelect:boolean = false

  constructor() { 
    this.total.emit(0)
  }

  ngOnInit() {
  }

  calcTotal(){
    let t = 0
    for ( let i of this.habs ){
      if( i['fdp'] ){
        t += parseFloat( i['fdp'] == 1 ? (this.moneda ? i['l1MXN_total'] : i['l1USD_total']) : (this.moneda ? i['MXN_total'] : i['USD_total']) )
      }
    }

    this.total.emit(t)
  }

}
