import { Component, OnInit, Output, EventEmitter } from '@angular/core';

declare var jQuery: any;
import * as moment from 'moment-timezone';
import { ApiService, InitService } from 'src/app/services/service.index';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rsv-link-any-payment',
  templateUrl: './rsv-link-any-payment.component.html',
  styles: []
})
export class RsvLinkAnyPaymentComponent implements OnInit {

  @Output() linked = new EventEmitter<any>()

  loading = {}
  ml:any
  op:any
  pid:any

  constructor(public _api: ApiService,
              public _init: InitService,
              public toastr: ToastrService ) { }

  ngOnInit() {
  }

  closeModal( reload = false ){
    this.op = null
    this.ml = null
    this.pid = null
    // this.close.emit( reload )
    jQuery('#rsvLinkAnyPayment').modal('hide')
  }

  openModal( op ){
    this.ml = null
    this.op = op

    jQuery('#rsvLinkAnyPayment').modal('show')
  }

  locSelected( e ){
    if( e[1] ){
      this.ml = e[0]['Locs']
      this.pid = e[0]['id']
    }else{
      this.ml = null
      this.pid = null
    }
  }

  linkRsv(){

    let params = {
      link: {
        paymentId: this.pid
      },
      operacion: this.op,
      last_id: this.pid,
      unset: null
    }

    this.loading['save'] = true;

    this._api.restfulPut( params, 'Rsv/linkPayment' )
                .subscribe( res => {

                  this.loading['save'] = false;
                  this.linked.emit( true )

                }, err => {
                  this.loading['save'] = false;

                  const error = err.error;
                  this.toastr.error( error.msg, err.status );
                  console.error(err.statusText, error.msg);

                });
  }

}
