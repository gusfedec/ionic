import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../shared/authentication-service';

@Component({
  selector: 'app-mis-fotos',
  templateUrl: './mis-fotos.page.html',
  styleUrls: ['./mis-fotos.page.scss'],
})
export class MisFotosPage implements OnInit {
  usuario: any;
  constructor(
    private afStore: AngularFirestore,
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private storage: AngularFireStorage
  ) {
    this.usuario = this.authService.getUsuario();
  }
  fotosPropias: any;

  ngOnInit() {
    let foto = this.afStore
      .collection('fotos', (ref) =>
        ref.orderBy('date', 'desc').where('own', '==', this.usuario.uid)
      )
      .snapshotChanges();
    foto.subscribe((data) => {
      this.fotosPropias = data.map((e) => {
        return {
          own: e.payload.doc.data()['own'],
          name: e.payload.doc.data()['name'],
          file: e.payload.doc.data()['file'],
          date: e.payload.doc.data()['date'],
          key: e.payload.doc.id,
        };
      });
      console.log(this.fotosPropias);
    });
  }
}
