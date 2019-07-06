import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, Input, SimpleChanges, HostListener, ElementRef } from '@angular/core';
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
  selector: 'app-rsv-manage',
  templateUrl: './rsv-manage.component.html',
  styles: [`.mat-radio-button ~ .mat-radio-button {
    margin-left: 16px;
  }`]
})
export class RsvManageComponent implements OnInit {

  // @ViewChild(AddNewAgentComponent) addNew:AddNewAgentComponent

  currentUser: any;
  showContents = false;
  flag = false;
  listFlag = false;
  large = true;
  mainCredential = 'rsv_manage';
  loading:Object = {}

  viewLoc:any
  data:Object = {}
  originalData:Object = {}

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
      if ( params.loc ){
        this.viewLoc = params.loc;
        this.getLoc( params.loc )
        let title = 'CyC - Rsv Manager'
        if( this.viewLoc ){
          title += ` Loc: ${this.viewLoc}`
        }
        this.titleService.setTitle(title);
      }
    });
  }

  ngOnInit() {
    this.titleService.setTitle('CyC - Rsv Manager');
  }

  selectLoc( e ){
    this.route.navigateByUrl(`/rsv/${e['masterlocatorid']}`);
  }

  getLoc( loc ){

    this.loading['search'] = true;

    this._api.restfulGet( loc, 'Rsv/manageLoc' )
                .subscribe( res => {

                  this.loading['search'] = false;

                  let items = res['data']['items']
                  items = this.orderPipe.transform(items, 'itemlocator')

                  let master = res['data']['master']

                  this.data = {
                    masterLoc: master,
                    items: items.length > 0 ? items : []
                  }

                  this.originalData = JSON.parse(JSON.stringify(this.data))

                  let scrollToTop = window.setInterval(() => {
                    let pos = window.pageYOffset;
                    let target = 380
                    if (pos > target) {
                      window.scrollTo(0, pos - 20); // how far to scroll on each step
                  } else if (pos < target - 20) {
                      window.scrollTo(0, pos + 20); // how far to scroll on each step
                  } else {
                      window.clearInterval(scrollToTop);
                  }
                }, 16);

                }, err => {
                  this.loading['search'] = false;

                  const error = err.error;
                  this.toastr.error( error.msg, err.status );
                  console.error(err.statusText, error.msg);

                });
  }

  updateLoc( field, val, ml, loader, f ){

    this.loading[loader] = true;

    let params = {
      field,
      val,
      masterItemLocator: ml
    }

    this._api.restfulPut( params, 'Rsv/itemFieldChg' )
                .subscribe( res => {

                  this.loading[loader] = false;

                  this.toastr.success('Cambio guardado', res['data']['msg'])

                  f(true)

                }, err => {
                  this.loading[loader] = false;

                  const error = err.error;
                  this.toastr.error( error.msg, err.status );
                  console.error(err.statusText, error.msg);
                  f(false)

                });
  }

  formatDate( d, f){
    return moment(d).format(f)
  }

  editItem( f, i ){

    let fields = {
      titular: ['titular', 'ro_titular'],
      comment: ['notas_hotel', 'ro_notas']
    }

    i[fields[f][1]] = false
  }

  pMethodChg( o, e ){
    this.updateLoc( 'fdp', e.value , o['masterItemLocator'], 'fdpChange', (f) => {
      if( f ){
        this.getLoc(o['masterlocatorid'])
      }else{
        o['fdp'] = o['fdp']
      }
    })

  }

  fieldEdit(f, o, e, l, fl ){
    console.log(e)
    this.updateLoc( f, e.target.value , o['masterItemLocator'], l, ( x ) => {
      if ( x ){
        return true
      }else{
        o[f] = o[f]
      }
      o[fl] = false
    })
  }
}