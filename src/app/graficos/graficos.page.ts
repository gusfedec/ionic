import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Chart } from 'chart.js';
import { combineLatest, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.page.html',
  styleUrls: ['./graficos.page.scss'],
})
export class GraficosPage implements AfterViewInit, OnInit {
  @ViewChild('barCanvas') barCanvas: ElementRef;
  @ViewChild('doughnutCanvas') doughnutCanvas: ElementRef;
  @ViewChild('lineCanvas') lineCanvas: ElementRef;

  private barChart: Chart;
  private doughnutChart: Chart;
  private lineChart: Chart;
  fotos: any;
  fotosFeas: any;
  fotosLindas: any;

  constructor(private afStore: AngularFirestore) {}

  ngOnInit(): void {
    let foto = this.afStore
      .collection('fotos', (ref) => ref.orderBy('date', 'desc'))
      .snapshotChanges();
    foto.subscribe((dataFotos) => {
      this.fotos = dataFotos.map((e) => {
        return {
          own: e.payload.doc.data()['own'],
          name: e.payload.doc.data()['name'],
          file: e.payload.doc.data()['file'],
          date: e.payload.doc.data()['date'],
          key: e.payload.doc.id,
          likes: e.payload.doc.data()['likes'],
          seccion: e.payload.doc.data()['seccion'],
        };
      });
      console.log(dataFotos);
      console.log(this.fotos);
      this.fotosFeas = this.fotos
        .filter((a) => a.seccion == 'feas')
        .map((e) => {
          return {
            file: e.file,
            likes: e.likes,
          };
        });
      console.log(this.fotosFeas);

      this.fotosLindas = this.fotos
        .filter((a) => a.seccion == 'lindas')
        .map((e) => {
          return {
            file: e.file,
            likes: e.likes,
          };
        });
      console.log(this.fotosLindas);
      console.log(
        this.fotosLindas.map((a) => {
          return a.likes;
        })
      );
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: 'bar',
        data: {
          //labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          labels: this.fotosLindas.map((a) => a.file),
          datasets: [
            {
              label: '# de votos',
              //data: [12, 19, 3, 5, 2, 3],
              data: this.fotosLindas.map((a) => {
                return a.likes;
              }),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    }, 3000);

    setTimeout(() => {
      this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
        type: 'doughnut',
        data: {
          labels: this.fotosFeas.map((a) => a.file),
          datasets: [
            {
              label: '# de votos',
              data: this.fotosFeas.map((a) => a.likes),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
              ],
            },
          ],
        },
      });
    }, 3000);
  }
}
