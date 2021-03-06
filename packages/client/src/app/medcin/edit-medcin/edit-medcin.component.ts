import { AuthService } from './../../shared/services/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { Medcin } from '../../shared/models/Medcin';
import { MedcinService } from './../../shared/services/medcin.service';

@Component({
  selector: 'app-edit-medcin',
  templateUrl: './edit-medcin.component.html',
  styleUrls: ['./edit-medcin.component.scss']
})
export class EditMedcinComponent implements OnInit {
  public form: FormGroup;
  loading: Boolean;
  @Input() medcin: Medcin = {};
  @Output() annulerMedcinForm = new EventEmitter();
  @Output() updateForm = new EventEmitter();


  constructor(private fb: FormBuilder, private medcinService: MedcinService, private authService: AuthService) { }

  ngOnInit() {
    this.form = this.fb.group({
      fname: [this.medcin.firstName, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
      lname: [this.medcin.lastName, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
      email: [this.medcin.email, Validators.compose([Validators.required, CustomValidators.email])],
      date: [new Date(this.medcin.dateDeNaissance), Validators.compose([CustomValidators.date])],
      specialty: [this.medcin.specialty, Validators.compose([Validators.required])],
      gender: [this.medcin.sexe, Validators.required],
      roleId: [this.medcin.roleId]
    });
  }

  annulerForm() {
    this.annulerMedcinForm.emit();
  }

  onSubmit() {
    const { fname, lname, date, specialty, gender, email, password, roleId } = this.form.value;
    const medcin = new Medcin(this.medcin.id, fname, lname, gender, date, specialty, email, password, roleId);
    this.medcinService.updateMedcin(medcin)
      .subscribe(() => this.updateForm.emit());
  }

}
