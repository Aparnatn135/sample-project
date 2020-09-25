import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

export interface IUser {
    username: string;
    userType: string;
    newAssignment : any;
    assignments: [];
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    userLoginStatusSubject$: Subject<any> = new Subject<any>();

    userDoc: any


    constructor(private afAuth: AngularFireAuth, private zone: NgZone,
        private afs: AngularFirestore,
    ) {
        this.checkForAuthChange();
    }

    login(username: string, password: string) {
        return this.afAuth.auth
            .setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() =>
                this.afAuth.auth.signInWithEmailAndPassword(username, password)
            )
    }

    signup(username: string, password: string) {
        return this.afAuth.auth
            .setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {

                return this.afAuth.auth.createUserWithEmailAndPassword(username, password)
            }
            )
    }

    signInWithEmailLink() {
        if (this.afAuth.auth.isSignInWithEmailLink(window.location.href)) {

            // You can also get the other parameters passed in the query string such as state=STATE.
            // Get the email if available.
            var email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                // User opened the link on a different device. To prevent session fixation attacks, ask the
                // user to provide the associated email again. For example:
                email = window.prompt('Please provide the email you\'d like to sign-in with for confirmation.');
            }
            if (email) {
                // The client SDK will parse the code from the link for you.
                this.afAuth.auth.signInWithEmailLink(email, window.location.href).then(function (result) {
                    // Clear the URL to remove the sign-in link parameters.
                    if (history && history.replaceState) {
                        window.history.replaceState({}, document.title, window.location.href.split('?')[0]);
                    }
                    // Clear email from storage.
                    window.localStorage.removeItem('emailForSignIn');
                    // Signed-in user's information.
                    var user = result.user;
                    var isNewUser = result.additionalUserInfo.isNewUser;
                    console.log(result)
                }).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // [START_EXCLUDE]
                    //handleError(error);
                    // [END_EXCLUDE]
                });
            }
        }
    }

    sendEmailVerificationLink(email: string) {
        console.log("Auth SErvice", email)

        let actionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be whitelisted in the Firebase Console.
            url: window.location.href,
            // This must be true.
            handleCodeInApp: true
        };

        this.afAuth.auth.sendSignInLinkToEmail(email, actionCodeSettings)
            .then(function () {
                // The link was successfully sent. Inform the user.
                // Save the email locally so you don't need to ask the user for it again
                // if they open the link on the same device.
                window.localStorage.setItem('emailForSignIn', email);
            })
            .catch(function (error) {
                // Some error occurred, you can inspect the code: error.code
            });
    }


    signout() {
        this.afAuth.auth.signOut();
    }

    checkForAuthChange() {

        this.afAuth.auth.onAuthStateChanged
            (
                user => {
                    this.zone.run(() => {
                        if (user) {
                            return this.userLoginStatusSubject$.next(user)
                        } else {
                            return this.userLoginStatusSubject$.next(null)
                        }
                    });
                }
            ).bind(this)

    }

}
