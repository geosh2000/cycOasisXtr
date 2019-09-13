import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService, InitService, TokenCheckService } from '../../../services/service.index';
import { ToastrService } from 'ngx-toastr';
import { SearchZdUserComponent } from '../../../shared/search-zd-user/search-zd-user.component';

declare var jQuery: any;
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-create-rsv',
  templateUrl: './create-rsv.component.html',
  styles: []
})
export class CreateRsvComponent implements OnInit {

  @ViewChild( SearchZdUserComponent ,{static:false}) private zdSearch: SearchZdUserComponent
  // tslint:disable-next-line: no-output-native
  @Output() error = new EventEmitter<any>()
  @Output() save = new EventEmitter<any>()

  moneda = true
  tipo = 'hotel'
  data:Object = {}
  loading:Object = {}
  isNew = true
  searchUserFlag = true
  newRsvForm:FormGroup
  masterLoc:any
  total = 0
  all:any

  constructor(public _api: ApiService,
              public _init: InitService,
              private _tokenCheck: TokenCheckService,
              public toastr: ToastrService) {

    this.newRsvForm =  new FormGroup({
      ['nombreCliente']:    new FormControl('', [ Validators.required, Validators.pattern('^[A-ZÁÉÍÓÚ]{1}[a-záéíóúA-ZÁÉÍÓÚ\\s]*$')]),
      ['correoCliente']:   new FormControl('', [ Validators.required, Validators.pattern('^(.)+@(.)+\\.(.)+$')]),
      ['telCliente']:   new FormControl('', []),
      ['zdUserId']:   new FormControl('', [ Validators.required, Validators.pattern('^\\d+$')]),
      ['userCreated']:   new FormControl(this._init.currentUser['hcInfo']['id'], [ Validators.required, Validators.pattern('^\\d+$')])
    })

   }

  ngOnInit() {
  }

  selectedUser( e ){
    this.newRsvForm.reset()
    this.masterLoc = null
    this.newRsvForm.controls['userCreated'].setValue(this._init.currentUser['hcInfo']['id'])


    if( !this.isNew ){
      this.masterLoc = e['masterlocatorid']
      this.newRsvForm.controls['nombreCliente'].setValue(e['nombreCliente'])
      this.newRsvForm.controls['correoCliente'].setValue(e['correoCliente'])
      this.newRsvForm.controls['telCliente'].setValue(e['telCliente'])
      this.newRsvForm.controls['zdUserId'].setValue(e['zdUserId'])
    }else{
      this.newRsvForm.controls['nombreCliente'].setValue(e['name'])
      this.newRsvForm.controls['correoCliente'].setValue(e['email'])
      this.newRsvForm.controls['telCliente'].setValue(e['phone'])
      this.newRsvForm.controls['zdUserId'].setValue(e['id'])
    }
    this.searchUserFlag = false

  }

  chgUser(){
    this.newRsvForm.reset()
    this.searchUserFlag = true
  }

  saveRsv(){
    let arr = {
      master: this.newRsvForm.value,
      item: this.data,
      habs: [],
      type: this.tipo,
      moneda: this.moneda
    }

    if( !this.isNew ){
      arr['masterLoc'] = this.masterLoc
    }

    if( this.tipo == 'hotel' ){
      for( let h of arr['item']['habs'] ){
        if( !h['fdp'] ){
          this.error.emit('Debes elegir una forma de pago para cada habitación')
          return
        }
  
        let hab = {
            hotel: {
              hotel: h['hotel'],
              categoria: h['cat'],
              mdo: h['mayorista'],
              agencia: this.moneda ? h['agenciaMX'] : h['agenciaUS'],
              gpoTfa: this.moneda ? h['cieloMXN'] : h['cieloUSD'],
              titular: this.newRsvForm.controls['nombreCliente'].value,
              adultos: h['rateAdults'],
              juniors: parseInt(h['rateMinors']) > 2 ? 1 : 0,
              menores: parseInt(h['rateMinors']) > 2 ? 2 : h['rateMinors'],
              inicio: h['@inicio'],
              fin: h['@fin'],
              noches: h['noches'],
              isNR: h['isNR'],
              isLocal: h['grupo'] == 'CCQROO' ? 1 : 0,
            },
            monto: {
              montoOriginal: this.moneda ? h['MXN'] : h['USD'],
              lv: this.data['lSelected'],
              monto: Math.round((this.moneda ? h['l' + this.data['lSelected'] + 'MXN_total'] : h['l' + this.data['lSelected'] + 'USD_total']) * 100) / 100,
              moneda: this.moneda ? 'MXN' : 'USD',
              isPagoHotel: h['fdp']
            },
            item: {
              itemType: 1,
              isQuote: h['fdp'] == 1 ? 0 : 1,
              userCreated: this._init.currentUser.hcInfo.id
            }
        }
  
        arr['habs'].push(hab)
      }
    }

    this.saveRsvPut( arr )
  }

  saveRsvPut( a ){
    this.loading['save'] = true;

    this._api.restfulPut( a, 'Rsv/saveRsv' )
                .subscribe( res => {

                  this.loading['save'] = false;
                  // this.toastr.success( 'Reserva creada', res['data']['masterlocator'] )
                  this.save.emit(res['data'])
                  this.chgUser()

                  jQuery('#rsvPop').modal('hide')
                  this.save.emit(res['data'])

                }, err => {
                  this.loading['save'] = false;

                  const error = err.error;
                  this.toastr.error( error.msg, err.status );
                  console.error(err.statusText, error.msg);

                });
  }

  popReserve( h ){
    console.log(h)
    this.all = h
    this.data = h['data']
    this.moneda = h['moneda']
    this.tipo = h['tipo']
    jQuery('#rsvPop').modal('show')
  }

  printDate(d,f){
    return moment(d).format(f)
  }

}
