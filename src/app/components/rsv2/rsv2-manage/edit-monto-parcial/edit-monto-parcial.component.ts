import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as moment from 'moment-timezone';
import { ApiService } from 'src/app/services/service.index';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-monto-parcial',
  templateUrl: './edit-monto-parcial.component.html',
  styleUrls: ['./edit-monto-parcial.component.css']
})
export class EditMontoParcialComponent implements OnInit {

  @Input() i:Object = {}
  @Output() saveMonto = new EventEmitter()

  editFlag = false
  loading:Object = {}

  constructor(public _api: ApiService,
              public toastr: ToastrService) { }

  ngOnInit() {
  }

  formatDate( d, f ){
    return moment(d).format(f)
  }

  editMonto( m ){

    if( this.i['isNR'] == '1' ){
      this.toastr.error('No es posible modificar el monto a prepagar de una reserva "No Reembolsable". El prepago debe hacerse al 100%', 'ERROR!')
      return false
    }

    if( this.i['itemType'] != '1' ){
      this.toastr.error('Este servicio no permite realizar un pago parcial. El prepago debe hacerse al 100%', 'ERROR!')
      return false
    }

    let params = {
      original: this.i,
      new: {
        montoParcial: m.value
      },
      itemId: this.i['itemId']
    }

    this.saveMontos( params )
  }

  saveMontos( e ){
    this.loading['editMonto'] = true

    this._api.restfulPut( e, 'Rsv/editMontoParcial' )
                .subscribe( res => {

                  this.loading['editMonto'] = false;
                  this.i['montoParcial'] = e['new']['montoParcial']
                  this.saveMonto.emit( res['data'] )
                  this.editFlag = false

                }, err => {
                  this.loading['editMonto'] = false;

                  const error = err.error;
                  this.toastr.error( error.msg, err.status );
                  console.error(err.statusText, error.msg);

                });
  }


}
