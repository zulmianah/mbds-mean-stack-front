import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  title = "Application de gestion des assignments";
  userName = "User Name";
  userRole = "Role Name";
  userPicture = "assets/img/profile-7.jpg";
  constructor() {}

  ngOnInit(): void {}
}
