import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-table',
  templateUrl: './table.component.html',
  styleUrls: ['table.scss']
})
export class TableComponent implements OnInit {

  public numeroLoteria = 0;
  public numeroSerie = 0;
  public numeroFavorito = 0;
  public fechaJuego: any;
  public horaJuego: any;

  constructor() { }

  ngOnInit() {
    this.numeroLoteria = this.numeroAleatorio(9999, 1000);
    this.numeroSerie = this.numeroAleatorio(999, 100);
    this.numeroFavorito = this.numeroAleatorio(9999, 1000);
    this.fechaJuego = new Date(Date.now()).toLocaleString().split(',')[0];
    this.horaJuego = this.numeroAleatorio(23, 10).toString().concat(':00');
  }

  private numeroAleatorio(max: number, min: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

}
