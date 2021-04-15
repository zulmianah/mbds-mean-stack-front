import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';
import {AssignmentsService} from '../shared/assignments.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
    title = 'Application de gestion des assignments';
    userName = '';
    userRole = '';
    userPicture = 'assets/img/profile-7.jpg';

    constructor(
        private authService: AuthService,
        private router: Router,
        private assignmentsService: AssignmentsService) {
    }

    ngOnInit(): void {
        const user = this.authService.getUser();
        if (user !== null) {
            this.userName = user.nomutilisateur;
            this.userRole = user.role;
        }
    }

    peuplerBD(): void {
        // version naive et simple
        // this.assignmentsService.peuplerBD();
        // meilleure version :
        this.assignmentsService.peuplerBDAvecForkJoin().subscribe(() => {
            console.log(
                'LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES, ON RE-AFFICHE LA LISTE'
            );
            this.router.navigate(['/home'], {replaceUrl: true});
        });
    }

    isLoged(): boolean {
        return false;
    }
}
