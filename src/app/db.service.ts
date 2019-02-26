import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DBService {
  constructor(private http: HttpClient) { }
  getBooks() {
    return this.http.get('http://localhost:4000/client/Book');

  }
  login(email: String, pw: String) {
    return this.http.put('http://localhost:4000/verify/login', {
        email: email,
        password: pw
    });
   }
   searchAll() {
      return this.http.get('http://localhost:4000/client/All');
   }
   search(type: String, value: String) {
     return this.http.put('http://localhost:4000/client/Book', {
         type: type,
         value: value
     });
   }
   searchDetail(unid: String) {
      return this.http.put('http://localhost:4000/client/Detail', {
          unid: unid
      });
   }
   register(uname: String, email: String, major: String, name: String, phone: String, password: String) {
      return this.http.put('http://localhost:4000/verify/register', {
          uname: uname,
          email: email,
          major: major,
          name: name,
          phone: phone,
          password: password
      });
   }
   createBook(isbn: String, title: String, author: String, description: String,
              subject: String, oprice: String, cprice: String, member: String) {
      return this.http.put('http://localhost:4000/client/Create', {
          isbn: isbn,
          title: title,
          author: author,
          description: description,
          subject: subject,
          oprice: oprice,
          cprice: cprice,
          member: member
      });
   }
   getMemberBooks(member: String) {
      return this.http.put('http://localhost:4000/client/Memberbooks', {
          member: member
      });
   }
   delete(unid: String) {
      return this.http.put('http://localhost:4000/client/Delete', {
          unid: unid
      });
   }
   deleteIntBook(unid: String) {
      return this.http.put('http://localhost:4000/client/DeleteIntBook', {
          unid: unid
      });
   }
   interested(member: String, book: String) {
      return this.http.put('http://localhost:4000/client/Interested', {
          member: member,
          book: book,
          auth_token: localStorage.getItem('user-jwt')
      });
   }
   interestedMember(member: String) {
      return this.http.put('http://localhost:4000/client/MemberIntBooks', {
          member: member
      });
   }
   updatemajor(major: String, uname: String) {
       return this.http.put('http://localhost:4000/client/updatemajor', {
           major: major,
           uname: uname
       });
   }
   updatename(name: String, uname: String) {
       return this.http.put('http://localhost:4000/client/updatename', {
           name: name,
           uname: uname
       });
   }
   updatephonenum(phone: String, uname: String) {
       return this.http.put('http://localhost:4000/client/updatephonenum', {
           phone: phone,
           uname: uname
       });
   }
   getMember(uname: String) {
       return this.http.put('http://localhost:4000/client/getmember', {
           uname: uname
       });
   }
}
