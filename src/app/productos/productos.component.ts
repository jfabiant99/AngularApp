import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  lista = null;
  prod = {
    "codigo": null,
    "descripcion": null,
    "precio": null
  }

  constructor(private productosServicio: ProductosService) { }

  ngOnInit() {
    this.recuperarTodos();
  }

  recuperarTodos() {
    this.productosServicio.listar().subscribe(result => {
      this.lista = result;
    });
  }

  nuevo() {
    this.productosServicio.nuevo(this.prod).subscribe(result => {
      // if (result == 'ok') {
      //   this.limpiar();
      //   this.recuperarTodos();
      // }
      this.limpiar();
      this.recuperarTodos();
    });
  }

  eliminar(codigo) {
    if (!confirm("Esta seguro que desea eliminar este registro?"))
      return;
    this.productosServicio.eliminar(codigo).subscribe(result => {
      // if (result == 'ok') {
      //   this.recuperarTodos();
      // }
      this.recuperarTodos();
    });
  }

  actualizar() {
    this.productosServicio.actualizar(this.prod).subscribe(result => {
      if (result.nModified == '1') {
        this.limpiar();
        this.recuperarTodos();
      }
    });
  }

  mostrar(codigo) {
    this.productosServicio.mostrar(codigo).subscribe(resultado => {
      this.prod = resultado;
    });
  }

  hayRegistros() {
    try {
      console.log(this.lista);
      if (this.lista.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
    }
  }

  limpiar() {
    this.prod = {
      codigo: null,
      descripcion: null,
      precio: null
    };
  }

}
