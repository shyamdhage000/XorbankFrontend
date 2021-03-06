import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { Subject, Subscription } from "rxjs";
import { LoginModuleService } from "src/app/loginModule/login-module.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  userId: any;
  loggedIn: boolean = false;
  authStatusSub: Subscription = new Subscription();
  authListner: Subject<boolean> = new Subject();

  // @Input()
  // name: String = "";
  // @Output() buttonClicked: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private loginModuleService: LoginModuleService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.authListner = this.loginModuleService.getAuthListner();
    this.userId = localStorage.getItem("userId");
    this.authStatusSub = this.loginModuleService
      .getAuthListnerStatus()
      .subscribe((status) => {
        this.loggedIn = status;
        console.log(this.loggedIn);
      });
  }

  logout() {
    //this.buttonClicked.emit("This button is clicked");
    localStorage.removeItem("userId");
    this.authListner.next(false);
    this.router.navigate(["/login"]);
    this.createNotification("success", "Success", "Logout SuccessFul");
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message, {
      nzStyle: {
        marginTop: "50px",
      },
    });
  }
}
