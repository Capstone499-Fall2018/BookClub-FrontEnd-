import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DBService } from '../../db.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-member-home',
  templateUrl: './member-home.component.html',
  styleUrls: ['./member-home.component.css']
})
export class MemberHomeComponent implements OnInit {

  interested: boolean;
  interestedMemberBooks: {
    Isbn: String,
    Title: String,
    Author: String
  };
  member: any;
  deleteSuccess: boolean;
  showMemberBooks: boolean;
  displayedColumns = ['isbn', 'title', 'author', 'actions'];
  data1: {
    Isbn: String,
    Title: String,
    Author: String
  };

  constructor(private db: DBService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.deleteSuccess = false;
    this.showMemberBooks = false;
    this.interested = false;
  }
  get userid(): any {
    return sessionStorage.getItem('userid');
  }
  get username(): any {
    return sessionStorage.getItem('username');
  }

  manageBooks() {
    this.ngOnInit();
    this.showMemberBooks = true;
    this.db.getMemberBooks(this.userid).subscribe((res: any) => {
      console.log(res);
      this.data1 = res;
    });
  }

  deleteBook(unid) {
    this.ngOnInit();
    this.db.delete(unid).subscribe((res: any) => {
      console.log(res);
      if (res.affectedRows > 0) {
          this.snackBar.open('Book deleted successfully', 'OK', {
              duration: 3000
          });
      }
    });
  }

  deleteIntBook(unid) {
    this.ngOnInit();
    this.db.deleteIntBook(unid).subscribe((res: any) => {
      console.log(res);
      if (res.affectedRows > 0) {
          this.snackBar.open('Book deleted successfully', 'OK', {
              duration: 3000
          });
      }
    });
  }

  interestedBooks() {
    this.ngOnInit();
    this.db.interestedMember(this.userid).subscribe((res: any) => {
      this.interestedMemberBooks = res;
      console.log(res);
    });
    this.interested = true;
  }

  logout() {
    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('user-jwt');
    this.router.navigate(['/Home']);
   }
}
