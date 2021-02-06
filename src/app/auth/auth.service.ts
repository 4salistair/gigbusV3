import { User } from './user.model';
import { AuthData } from './auth.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UIService } from '../ui.service';


@Injectable()
export class AuthService {

    authChange = new Subject<boolean>();
    currentUser = new Subject<string>();
    currentUserType = new Subject<string>();
    
    private user: User;
    private  currentUserDetails: string;

    constructor( private router: Router,
                 private afauth: AngularFireAuth,
                 private UIservice: UIService) {}



     innitAuthListener(): void {
        this.afauth.authState.subscribe(user => {
            if (user) {
                this.authChange.next(true);
                this.router.navigate(['/']);
            } else {
                this.authChange.next(false);
                this.router.navigate(['']);
            }
        });
    }

    registerUser(authData: AuthData  ): void{

        this.UIservice.loadingStateChange.next(true);

        this.afauth.createUserWithEmailAndPassword(
        authData.email,
        authData.password,
       )
        .then(result => {
            console.log(result);
            this.UIservice.loadingStateChange.next(false);
            this.router.navigate(['/']);
            this.authChange.next(true);
            })
        .catch(error => {
            console.log(error);
            });


    }



    login(authData: AuthData ): void  {


        this.UIservice.loadingStateChange.next(true);

        this.afauth.signInWithEmailAndPassword(
        authData.email,
        authData.password)
        .then(result => {
            console.log(result);
            this.UIservice.loadingStateChange.next(false);
            this.router.navigate(['/']);
            this.authChange.next(true);
        })
        .catch(error => {
            console.log(error);
        });
    }


    logout(): void {
    this.afauth.signOut();
    this.user = null;
    this.authChange.next(false);
    }

    getUser(): User {
        return {...this.user};
    }

    isAuth(): boolean {
        return this.user != null;
    }

    getUserID(): void {
         this.afauth.user.subscribe(user => {
             this.currentUser.next(user.uid);

         });
    }


    // getUserType(): void {
    //     this.afauth.user.subscribe(user => {
    //         this.currentUserType.next(user.);

    //     });
  // }
}
