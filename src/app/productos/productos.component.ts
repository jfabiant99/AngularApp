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
    "_id": null,
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
      if (result == 'ok') {
        this.limpiar();
        this.recuperarTodos();
      }
    });
  }

  eliminar(codigo) {
    if (!confirm("Esta seguro que desea eliminar este registro?"))
      return;
    this.productosServicio.eliminar(codigo).subscribe(result => {
      if (result == 'ok') {
        this.recuperarTodos();
      }
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
      // this.prod = resultado;
      this.prod._id = resultado._id;
      this.prod.descripcion = resultado.descripcion;
      this.prod.precio = resultado.precio;
    });
  }

  hayRegistros() {
    console.log(this.lista);
    if (this.lista.length>0) {
      return true;
    } else {
      return false;
    }
  }

  limpiar() {
    this.prod = {
      _id: null,
      descripcion: null,
      precio: null
    };
  }

}
