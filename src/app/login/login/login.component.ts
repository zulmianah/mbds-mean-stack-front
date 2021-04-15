import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';
import {LoginUser, User} from '../../model/models';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user = new LoginUser();
    error: any;

    constructor(
        private authService: AuthService, private router: Router) {
    }

    ngOnInit(): void {
    }


    login(): void {
        console.log(this.user.email, this.user.password);
        this.error = this.authService.logIn(this.user);
        if (this.error !== null) {

        } else {
            this.router.navigate(['/home']).then();
        }
    }

}
