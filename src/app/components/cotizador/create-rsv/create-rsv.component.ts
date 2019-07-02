import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-rsv',
  templateUrl: './create-rsv.component.html',
  styles: []
})
export class CreateRsvComponent implements OnInit {

  loading:Object = {}
  data:any
  isNew:boolean = true

  constructor() { }

  ngOnInit() {
  }

}
