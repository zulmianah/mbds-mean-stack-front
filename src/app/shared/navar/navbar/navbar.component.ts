import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {AssignmentsService} from '../../assignments.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    title = 'Application de Gestion des notes';
    isLoged: boolean;
    username: string;
    password: string;

    constructor(private authService: AuthService, private router: Router,
                private assignmentsService: AssignmentsService) {
    }

    ngOnInit(): void {
        this.isLoged = this.authService.loggedIn;
    }

    login(): void {
        // si je suis pas loggé, je me loggue, sinon, si je suis
        // loggé je me déloggue et j'affiche la page d'accueil
        // je ne suis pas loggé, je me loggue
        this.authService.logIn(this.username, this.password);
        this.isLoged = this.authService.loggedIn;
    }

    peuplerBD(): void {
        // version naive et simple
        // this.assignmentsService.peuplerBD();

        // meilleure version :
        this.assignmentsService.peuplerBDAvecForkJoin()
            .subscribe(() => {
                console.log('LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES, ON RE-AFFICHE LA LISTE');
                this.router.navigate(['/home'], {replaceUrl: true}).then();
            });
    }

    logout(): void {
        this.authService.logOut();
        this.isLoged = this.authService.loggedIn;
    }
}
