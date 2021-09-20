import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {
  AngularFireStorage,
  AngularFireStorageReference,
} from '@angular/fire/compat/storage';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { AuthenticationService } from '../shared/authentication-service';

export interface Meta {
  name: string;
  size: number;
  timeCreated: string;
}

@Component({
  selector: 'app-upload',
  template: `
    <input type="file" (change)="uploadFile($event)" />
    <div>{{ uploadPercent | async }}</div>
    <a [href]="downloadURL | async">{{ downloadURL | async }}</a>
    <!--<a [href]="">{{ meta | async }}</a>-->
    <img style="width:100px;" [src]="downloadURL | async" />
    <!--<pre *ngIf="meta | async"><code>{{(meta | async)?.size}}</code></pre>-->
    <!--<pre *ngIf="meta | async"><code>{{(meta.size}}</code></pre>-->
  `,
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  ngOnInit() {}

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  meta: Meta;
  user: any;
  usuario: any;
  fotosCollection: AngularFirestoreCollection;

  constructor(
    private storage: AngularFireStorage,
    private authService: AuthenticationService,
    private afStore: AngularFirestore
  ) {
    //this.user = this.authService.getUser();
    this.usuario = this.authService.getUsuario();
    console.log(this.authService.getUser());
    console.log(this.authService.getUsuario());
    console.log(this.authService.isLogged);
    console.log(this.usuario);
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `cosas-lindas/${new Date().getTime()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          fileRef.getMetadata().subscribe((meta) => {
            this.meta = meta;
          });
          /* this.fotosCollection = this.afStore.collection(
            `users/${this.usuario.uid}/fotos`
          ); */
          /* const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
            `users/${this.user.uid}`
          ); */
          this.fotosCollection = this.afStore.collection('fotos');
          this.downloadURL.subscribe((url) => {
            console.log(this.meta);
            console.log(this.meta.size);

            this.fotosCollection.add({
              own: this.usuario.uid,
              file: url,
              name: this.meta.name,
              size: this.meta.size,
              date: this.meta.timeCreated,
            });
            console.log(this.usuario.uid);

            console.log(url);
          });

          /* this.fotosCollection.add({
            file: this.downloadURL,
          }); */
          /* this.itemsCollection
            .doc(this.user.uid)
            .get()
            .subscribe((e) => {
              console.log(e);
            }); */
        })
      )
      .subscribe();
  }

  //re = this.storage.ref('cosas-lindas.jpg');
  //this.profileUrl = re.getDownloadURL();
}
