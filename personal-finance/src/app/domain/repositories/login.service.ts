import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  protected endpoint =
    "http://ec2-18-224-109-208.us-east-2.compute.amazonaws.com:8080/login";
  protected allUserInfo =
    "http://ec2-18-224-109-208.us-east-2.compute.amazonaws.com:8080/api/login/";
  constructor(private http: HttpClient) {}

  login(username: String, password: String) {
    return this.http
      .post<any>(`${this.endpoint}`, { userName: username, pWord: password })
      .pipe(
        map(user => {
          console.log(user);
          // login successful if there's a jwt token in the response
          if (user.userName === username) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("currentUser", JSON.stringify(user));
          } else {
            alert(user.message);
            return 0;
          }

          return user;
        })
      );
  }

  getInfo(userName: String) {
    return this.http.get<any>(`${this.allUserInfo}${userName}`);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    localStorage.removeItem("balance");
  }
}
