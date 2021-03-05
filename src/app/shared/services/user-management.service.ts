import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  user?: UserModel;
  constructor(private afs: AngularFirestore) {}

  login(userCredentials: {
    email: string;
    phoneNumber: string;
  }): Observable<UserModel | undefined> {
    const user$ = from(
      this.afs
        .collection<UserModel>('users')
        .doc<UserModel>(
          `${userCredentials.email}-${userCredentials.phoneNumber}`
        )
        .valueChanges()
    );
    return user$;
  }

  getUser(userId: string): Observable<UserModel | undefined> {
    const user$ = this.afs
      .collection<UserModel>('users')
      .doc<UserModel>(`${userId}`)
      .valueChanges();

    return user$;
  }

  register(user: UserModel): Observable<UserModel> {
    const user$ = from(
      this.afs
        .collection<UserModel>('users')
        .doc<UserModel>(`${user.email}-${user.phoneNumber}`)
        .set({ ...user, userId: `${user.email}-${user.phoneNumber}` })
    );
    return of(user);
  }

  updateProfile(user: UserModel) {
    const user$ = from(
      this.afs
        .collection<UserModel>('users')
        .doc<UserModel>(user.userId)
        .set(user, { merge: true })
    );
    return of(user);
  }
}
// this.afs
// .collection<UserModel>('users')
// .ref.where('email', '==', userCredentials.email)
// .where('phoneNumber', '==', userCredentials.phoneNumber)
// .get()
