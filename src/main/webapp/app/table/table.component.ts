import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-table',
  templateUrl: './table.component.html',
  styleUrls: ['table.scss']
})
export class TableComponent implements OnInit {

  constructor() { }

  numeroLoteria = 0;

  ngOnInit() {
    this.numeroLoteria = this.numeroAleatorioCuatroDigitos();
  }

  private numeroAleatorio(max: number, min: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private numeroAleatorioCuatroDigitos(): number {
    return this.numeroAleatorio(9999,1000);
  }

  private numeroAleatorioTresDigitos(): number{
    return this.numeroAleatorio(999,0);
  }

}
