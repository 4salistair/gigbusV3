import { User } from './user.model';
import { AuthData } from './auth.model';
import { Subject,Subscription  } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UIService } from '../ui.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';


@Injectable()
export class AuthService {

    authChange = new Subject<boolean>();
    authType = new Subject<string>();
    currentUser = new Subject<string>();
    currentUserType = new Subject<string>();
    userSubscription: Subscription;
    
    private user: User;
    private  currentUserDetails: string;
    private userID: string;
    private userType: AuthData[];

    constructor( private router: Router,
                 private afauth: AngularFireAuth,
                 private db: AngularFirestore,
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
           
            this.db.collection('users').add({'userID': result.user.uid,
                                             'userType': authData.type });
            this.UIservice.loadingStateChange.next(false);
            this.router.navigate(['/']);
            this.authChange.next(true);
            this.authType.next(authData.type);
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
            this.UIservice.loadingStateChange.next(false);
            this.authChange.next(true);

            const filter =  this.db.collection('users', ref => ref.where('userID', '==', result.user.uid ));
            filter
            .snapshotChanges()
            .pipe(map(docData => {
              return docData.map(doc => {
              return {
                type: doc.payload.doc.data()['userType']
                };
              });
             })
            )
            .subscribe((userType: AuthData[]) => { 
                this.userType = userType
                this.authType.next(this.userType[0].type);


                if (this.userType[0].type == 'Driver') {

                    this.router.navigate(['/price']);
        
                    } else {

                        this.router.navigate(['/']); 
                    }


            })
        

        })
        .catch(error => {
            console.log(error)

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



    addUserType(): void {
        // this.getUserID()
        // this.currentUser.subscribe(UserID => this.userID = UserID);
        // console.log('user ID ' + this.userID);




    }
}
