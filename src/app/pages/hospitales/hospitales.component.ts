import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  totalRegistros = 0;
  cargando: boolean = true;
  creandoHospital = false;

  constructor(public _hospitalService: HospitalService,
              public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe(resp => this.cargarHospitales());
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales()
          .subscribe((resp: any) => {
            this.hospitales = resp.hospitales;
            this.totalRegistros = this.hospitales.length;
            this.cargando = false;
          });
  }

  borrarHospital(hospital: Hospital) {
    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then(borrar => {
      this._hospitalService.borrarHospital(hospital._id)
            .subscribe(borrado => {
              console.log(borrado);
              this.cargarHospitales();
            });
    });
  }

  controlCrearHospital() {
    this.creandoHospital = !this.creandoHospital;
    this.cargarHospitales();
  }

  crearHospital(nombreHospital: string) {
    if (nombreHospital.length === 0) {
      return;
    }
    let hospital = new Hospital(nombreHospital);
    this._hospitalService.crearHospital(hospital)
          .subscribe(resp => {
            this.cargarHospitales();
          });
  }

  buscarHospitales(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;
    this._hospitalService.buscarHospital(termino)
          .subscribe((hospitales: Hospital[]) => {
             this.hospitales = hospitales;
             this.cargando = false;
          });
  }

  actualizarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital)
          .subscribe();
  }

}
