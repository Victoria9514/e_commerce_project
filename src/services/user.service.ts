import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class UserService {

  // getAll(): Observable<{ users: UserTableModel[]; message: string }> {
  //   return this.http.get<{ users: UserTableModel[]; message: string }>(
  //     this.apiEndPoint
  //   );
  // }

  // delete(id: string): Observable<{ user: IUser }> {
  //   return this.http.delete(`${this.apiEndPoint}/users/${user_id}`);
  // }

  // update(user: IUser): Observable<IUser> {
  //   return this.http.put(`${this.apiEndPoint}/users/${user.user_id}`, user);
  // }

  // updateAvatar<T,P>(userData: FormData): Observable<{user: IUser, message: string}> {
  //   console.log(userData, 'USERDATA')
  //   return this.http.put(`${this.url}/avatars`,userData);
  // }
}
