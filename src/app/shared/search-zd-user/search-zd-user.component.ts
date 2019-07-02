import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { OrderPipe } from 'ngx-order-pipe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search-zd-user',
  templateUrl: './search-zd-user.component.html',
  styleUrls: ['./search-zd-user.component.css']
})
export class SearchZdUserComponent implements OnInit {

  mail:any
  loading:Object = {
  }
  data:any = []

  constructor(public _api: ApiService,
                private orderPipe: OrderPipe,
                public toastr: ToastrService) { }

  ngOnInit() {
  }

  search(){

    this.loading['search'] = true;


    this._api.restfulGet( this.mail, 'Calls/searchUser' )
                .subscribe( res => {

                  this.loading['search'] = false;
                  let result = res['data']
                  result = this.orderPipe.transform(result, 'email')

                  this.data = result

                }, err => {
                  this.loading['search'] = false;

                  const error = err.error;
                  this.toastr.error( error.msg, err.status );
                  console.error(err.statusText, error.msg);

                });
}

}
