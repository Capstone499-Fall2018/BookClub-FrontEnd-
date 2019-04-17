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

  countnum = 0;
  checkInterest = 0;
  noti = 0;
  showNoti: boolean;
  count: boolean;

  member: any;
  deleteSuccess: boolean;
  showMemberBooks: boolean;
  displayedColumns = ['isbn', 'title', 'author', 'actions'];
  data1: {
    Isbn: String,
    Title: String,
    Author: String
  };

  displayedColumns1 = ['uname', 'title'];
  data2: {
    uname: String,
    Title: String
  };

  constructor(private db: DBService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    if (sessionStorage.getItem('user-jwt') == null) {
      this.snackBar.open('Please login to view this page', 'OK', {
        duration: 3000
      });
      this.router.navigate(['/Home']);
    }

    this.db.countInterested(this.userid).subscribe((res: any) => {
      console.log(res[0]["count (Interested.memberUname)"]);
      this.checkInterest = res[0]["count (Interested.memberUname)"];
      console.log(this.checkInterest);
      this.db.getCountInt(this.userid).subscribe((res: any) => {
        console.log(res[0].InterestedCount);
        this.countnum = res[0].InterestedCount;
        console.log(this.countnum);
        if(this.countnum === null) {
          this.countnum = this.checkInterest;
          console.log("noti1");
          this.noti = this.countnum;
        } else if(this.checkInterest != this.countnum) {
          if(this.checkInterest > this.countnum) {
            this.noti = this.checkInterest - this.countnum;
          } else {
            this.noti = this.countnum - this.checkInterest;
          }
          this.countnum = this.checkInterest;
        }
      });
    });

    this.deleteSuccess = false;
    this.showMemberBooks = false;
    this.interested = false;
    this.count = false;
    this.showNoti = false;
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
          this.manageBooks();
      }
    });
  }

  deleteIntBook(unid) {
    this.ngOnInit();
    this.db.deleteIntBook(unid, this.userid).subscribe((res: any) => {
      console.log(res);
      if (res.affectedRows > 0) {
          this.snackBar.open('Book deleted successfully', 'OK', {
              duration: 3000
          });
          this.router.navigate(['/Member']);
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

   updateNoti() {
     this.db.showIntUser(this.userid).subscribe((res: any) => {
       console.log(res);
       this.data2 = res;
       this.showNoti = true;
     });
     this.db.updateCount(this.userid).subscribe((res: any) => {
       if(res.affectedRows > 0)
          console.log("updated count");
     })
     this.noti = 0;
   }
}
