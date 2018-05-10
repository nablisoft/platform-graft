import { Bilan } from './../../../shared/models/Bilan';
import { Clinique } from './../../../shared/models/Clinique';
import { Instruction } from './../../../shared/models/Instruction';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Patient } from './../../../shared/models/Patient';
import { PatientService } from './../../services/patient.service';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-patient-item',
  templateUrl: './patient-item.component.html',
  styleUrls: ['./patient-item.component.scss']
})
export class PatientItemComponent implements OnInit {
  patientId: number;
  patient: Patient = {};
  index = 0;
  switch = true;
  switchbilan = true;
  switchInfor = true;
  informations = true;
  instructions: Instruction[];
  lastInformation: any ;
  cliniques: Clinique[];
  switchUpload = true;
  bilan: Bilan; // = {};
  switchBilanUp = true;


  constructor(private patientService: PatientService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPatient();

    this.getInstructions();
    this.patientService.subscribeToNewMessages();

    this.getCliniques();
    this.patientService.subscribeToNewMessagesCliniques();
  }

  getPatient() {
    this.patientId = +this.route.snapshot.params['id'];
    this.patientService.getOne(this.patientId)
      .subscribe(patient => {
        this.patient = patient.getPatient;
        // console.log('pppp', this.patient);
        // todo imporove this
        if (this.patient['informations']) {
                 this.lastInformation = this.patient['informations'][ this.patient['informations'].length - 1];
        }

      });
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.index = tabChangeEvent.index;
  }

  getInstructions() {
    this.patientService.getInstructions(this.patientId)
      .subscribe((instruction) => {
        this.instructions = instruction.instructions;
      });
  }

  getCliniques() {
    this.patientService.getCliniques(this.patientId)
      .subscribe((clinique) => {
        this.cliniques = clinique.cliniques;
      });
  }

  updatePatientForm() {
    this.switch = false;
  }

  annulerPatientForm() {
    this.switch = true;
  }

  updateForm() {
    this.switch = true;
  }

  ajoutBilanForm() {
    this.bilan = {};
    this.bilan.patientId = this.patientId;
    this.switchbilan = false;
  }

  annulerForm() {
    this.switchbilan = true;
    this.switchBilanUp = true;
  }
  submitOK() {
    this.switchbilan = true;
    this.switchBilanUp = true;
  }

  annulerInformationForm() {
    this.switchInfor = true;
  }

  addInforForm() {
    this.switchInfor = false;
  }

  afficherInforForm() {
    this.informations = false;
  }

  uploadForm() {
    this.switchUpload = false;
  }

  annulerUploadForm() {
    this.switchUpload = true;
  }

  return() {
    this.informations = true;
  }

  updateBilan(event) {
    this.bilan = {...event, patientId: this.patientId};
    // this.bilan.date = new Date(event.date);
    // console.log(new Date(event.date).toLocaleString());
    this.switchBilanUp = false;
  }
}
