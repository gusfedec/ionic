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
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

export interface Meta {
  name: string;
  size: number;
  timeCreated: string;
}

@Component({
  selector: 'app-upload',
  template: `
    <ion-button
      expand="full"
      class="boton-upload"
      color="success"
      (click)="selectImage()"
    >
      <ion-icon lazy="true" slot="start" name="image"></ion-icon>
      <ion-label slot="end">Subir</ion-label>
    </ion-button>

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
  image: any;
  dir: string;
  seccion: string;

  constructor(
    private storage: AngularFireStorage,
    private authService: AuthenticationService,
    private afStore: AngularFirestore,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private activatedRoute: ActivatedRoute
  ) {
    //this.user = this.authService.getUser();
    this.usuario = this.authService.getUsuario();
    console.log(this.authService.getUser());
    console.log(this.authService.getUsuario());
    console.log(this.authService.isLogged);
    console.log(this.usuario);
    this.activatedRoute.params.subscribe((params) => {
      this.seccion = params['cosas'];
      this.dir = params['cosas'] == 'lindas' ? 'cosas-lindas' : 'cosas-feas';
    });
  }

  base64ToImage(dataURI) {
    const fileDate = dataURI.split(',');
    // const mime = fileDate[0].match(/:(.*?);/)[1];
    const byteString = atob(fileDate[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: 'image/png' });
    return blob;
  }

  pickImage(sourceType) {
    console.log(sourceType);

    const options: CameraOptions = {
      quality: 50,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        this.image = 'data:image/jpeg;base64,' + imageData;
        console.log(this.image);
        let file = this.base64ToImage(this.image);
        this.uploadFile(file);
      },
      (err) => {
        // Handle error
      }
    );
  }

  async selectImage() {
    console.log('a');

    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image source',
      buttons: [
        {
          text: 'Use Camera',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
          },
        },
        {
          text: 'Load from Library',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          },
        },

        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  uploadFile(file) {
    //const file = event.target.files[0];
    const filePath = `${this.dir}/${new Date().getTime()}_imagen`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    console.log(file);

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
              seccion: this.seccion,
              likes: 0,
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
