import {Component, Input, OnInit} from '@angular/core';
import { DBService } from '../../db.service';
import { SearchComponent } from '../search/search.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  @Input () searchComponent: SearchComponent;

     data: {
       Title: String,
       Author: String,
       listPrice: String,
       Description: String,
       memberUname: String
     };
     member: {
       uname: String,
       name: String,
       email: String,
       phone: String
     };
     unid: String;
     show: boolean;
     displayInfo: boolean;
     notLoggedIn: boolean;

  constructor(private db: DBService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.show = true;
    this.displayInfo = false;
    this.route.params.subscribe(params => {
      this.unid = params.unid;
      this.db.searchDetail(this.unid).subscribe((res: any) => {
        this.data = res[0];
        console.log(this.data);
      });
    });
  }

  interested() {
    this.show = false;
    const log = localStorage.getItem('loggedIn');
    const uid = localStorage.getItem('userid');
    const jwt = localStorage.getItem('user-jwt');
    console.log(uid + ' ' + jwt);
    if (/*log.charAt(0) === 'f' ||*/ jwt === null) {
      this.notLoggedIn = true;
    } else {
        this.db.interested(uid, this.unid).subscribe((res: any) => {
            this.member = res[0];
            console.log(this.member);
            this.displayInfo = true;
        });
    }
  }
}
