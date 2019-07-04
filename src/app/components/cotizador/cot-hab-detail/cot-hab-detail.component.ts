import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cot-hab-detail',
  templateUrl: './cot-hab-detail.component.html',
  styles: [`.mat-radio-button ~ .mat-radio-button {
    margin-left: 16px;
  }`]
})
export class CotHabDetailComponent implements OnInit {

  @Input() habs:any = []
  @Input() moneda:boolean = true
  @Input() paymentSelect:boolean = false

  constructor() { }

  ngOnInit() {
  }

}
