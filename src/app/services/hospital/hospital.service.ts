import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { Hospital } from '../../models/hospital.model';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient) {
    this.cargarStorage();
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  cargarHospitales() {
    let url = URL_SERVICIOS + '/hospital';
    return this.http.get(url);
    // Retorna un observable con todos los hospitales
  }

  obtenerHospital(id: string) {
    // Recibe un ID de hospital y retorna toda la información del mismo
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url)
            .pipe(map((resp: any) => resp.hospital));
  }

  borrarHospital(id: string) {
    // Recibe un id de un Hospital y lo borra
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url)
      .pipe(map(resp => {
        swal('Hospital borrado', 'El hospital ha sido eliminado correctamente', 'success');
        return true;
      }));
  }

  crearHospital(hospital: Hospital) {
    // Recibe el nombre del hospital y lo crea
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this.token;
    return this.http.post(url, hospital)
            .pipe(map((resp: any) => {
              swal('Hospital creado', resp.hospital.nombre, 'success');
              return resp.hospital;
            }));
  }

  buscarHospital(termino: string) {
    // Recibe el término de búsqueda y retorna todos los hospitales que coincidan con ese término de búsqueda
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url)
            .pipe(map((resp: any) => resp.hospitales));
  }

  actualizarHospital(hospital: Hospital) {
    // Recibe un hospital y lo actualiza
    let url = `${URL_SERVICIOS}/hospital/${hospital._id}?token=${this.token}`;
    return this.http.put(url, hospital)
            .pipe(map((resp: any) => {
              swal('Hospital actualizado', hospital.nombre, 'success');
                  return true;
            }));
  }

}
