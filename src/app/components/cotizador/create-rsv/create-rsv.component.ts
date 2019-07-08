import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService, InitService, TokenCheckService } from '../../../services/service.index';
import { ToastrService } from 'ngx-toastr';
import { SearchZdUserComponent } from '../../../shared/search-zd-user/search-zd-user.component';

declare var jQuery: any;

@Component({
  selector: 'app-create-rsv',
  templateUrl: './create-rsv.component.html',
  styles: []
})
export class CreateRsvComponent implements OnInit {

  @ViewChild( SearchZdUserComponent ,{static:false}) private zdSearch: SearchZdUserComponent
  @Output() error = new EventEmitter<any>()
  @Output() save = new EventEmitter<any>()

  loading:Object = {}
  data:Object = {}
  moneda:boolean = true
  isNew:boolean = true
  searchUserFlag:boolean = true
  newRsvForm:FormGroup
  masterLoc:any

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
      habs: []
    }

    if( !this.isNew ){
      arr['masterLoc'] = this.masterLoc
    }

    for( let h of arr['item']['habs'] ){
      if( !h['fdp'] ){
        this.error.emit('Debes elegir una forma de pago para cada habitación')
        return
      }

      let hab = {
        mdo: h['mayorista'],
        agencia: this.moneda ? h['agenciaMX'] : h['agenciaUS'],
        hotel: h['hotel'],
        cat: h['cat'],
        grupo: h['grupoCielo'],
        lv: h['level'],
        llegada: h['@inicio'],
        salida: h['@fin'],
        noches: h['noches'],
        titular: this.newRsvForm.controls['nombreCliente'].value,
        a: h['rateAdults'],
        j: parseInt(h['rateMinors']) > 2 ? 1 : 0,
        m: parseInt(h['rateMinors']) > 2 ? 2 : h['rateMinors'],
        disp_a: h['adults'],
        disp_m: h['minors'],
        edad_1: h['m1'],
        edad_2: h['m2'],
        edad_3: h['m3'],
        isNR: h['isNR'],
        montoOriginal: this.moneda ? h['MXN'] : h['USD'],
        monto: Math.round((this.moneda ? h['MXN_total'] : h['USD_total']) * 100) / 100,
        mon: this.moneda ? 'MXN' : 'USD',
        fdp: h['fdp'],
        userCreated: this._init.currentUser['hcInfo']['id'],
        userLastEdit: this._init.currentUser['hcInfo']['id']
      }

      arr['habs'].push(hab)
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
                  this.save.emit(res['data']['masterlocator'])

                }, err => {
                  this.loading['save'] = false;

                  const error = err.error;
                  this.toastr.error( error.msg, err.status );
                  console.error(err.statusText, error.msg);

                }); 
  }

}
