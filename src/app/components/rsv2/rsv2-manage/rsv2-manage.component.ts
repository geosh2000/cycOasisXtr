import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, Input, SimpleChanges, HostListener, ElementRef, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CompleterService, CompleterData } from 'ng2-completer';
import { Title } from '@angular/platform-browser';

import { Router, ActivatedRoute } from '@angular/router';

import { ApiService, InitService, TokenCheckService } from '../../../services/service.index';

declare var jQuery: any;
import * as moment from 'moment-timezone';
import * as Globals from '../../../globals';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-rsv2-manage',
  templateUrl: './rsv2-manage.component.html',
  styleUrls: ['./rsv2-manage.component.css']
})
export class Rsv2ManageComponent implements OnInit {

  currentUser: any;
  showContents = false;
  flag = false;
  listFlag = false;
  large = true;
  mainCredential = 'rsv_manage';
  loading:Object = {}
  viewLoc:any

  data:Object = {
    master: {},
    items: []
  }

  constructor(public _api: ApiService,
              public _init: InitService,
              private titleService: Title,
              private _tokenCheck: TokenCheckService,
              private route: Router,
              private orderPipe: OrderPipe,
              private activatedRoute: ActivatedRoute,
              public toastr: ToastrService) {

      this.currentUser = this._init.getUserInfo();
      this.showContents = this._init.checkCredential( this.mainCredential, true );

      this._tokenCheck.getTokenStatus()
          .subscribe( res => {

            if ( res['status'] ){
              this.showContents = this._init.checkCredential( this.mainCredential, true );
            }else{
              this.showContents = false;
              jQuery('#loginModal').modal('show');
            }
          });

      this.activatedRoute.params.subscribe( params => {
        if( this.showContents ){
          if ( params.loc ){
            this.viewLoc = params.loc;
            this.getLoc( params.loc )
            let title = 'CyC - Rsv Manager'
            if( this.viewLoc ){
              title += ` Loc: ${this.viewLoc}`
            }
            this.titleService.setTitle(title);
            jQuery('div.modal').modal('hide');
          }
        }
      });
  }

  ngOnInit() {
    this.titleService.setTitle('CyC - Rsv Manager');
  }

  getLoc( l ){
    this.loading['loc'] = true

    this._api.restfulGet( l, 'Rsv/manage2Loc' )
                .subscribe( res => {

                  this.loading['loc'] = false;

                  if( res['data']['master'] ){
                    let data = {
                      master: res['data']['master'],
                      items: res['data']['items']
                    }

                    data['master']['tickets'] = data['master']['tickets'] != null ? data['master']['tickets'].split(',') : []

                    this.data = data
                  }else{
                    this.data = {
                      master: {},
                      items: []
                    }
                  }




                }, err => {
                  this.loading['loc'] = false;

                  const error = err.error;
                  this.toastr.error( error.msg, err.status );
                  console.error(err.statusText, error.msg);

                });
  }

  selectLoc( e ){
    this.route.navigateByUrl(`/rsv2/${e['masterlocatorid']}`);
  }

  formatDate( d, f ){
    return moment(d).format(f)
  }

  colorConfirm( i ){
    switch( i ){
      case 'Cancelada':
        return 'text-danger'
      case 'Cotización':
      case 'Cotizacion':
        return 'text-warning'
      case 'Pendiente':
        return 'text-info'
      default:
        return 'text-success'
    }
  }

  getDiff( a, b ){
    return parseFloat(a)-parseFloat(b)
  }

}
