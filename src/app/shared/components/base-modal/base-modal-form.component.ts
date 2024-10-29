import { ViewChild, Directive, Input, OnInit } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { FormGroup } from '@angular/forms';

@Directive()
export abstract class BaseModalFormComponent implements OnInit {
  @Input() FormGroup!: FormGroup;
  @ViewChild('modal') modal: IonModal | undefined;
  presentingElement?: any;

  ngOnInit() {
    this.presentingElement = document.getElementById('header');
  }

  closeModal() {
    this.modal?.dismiss(null, 'cancel');
  }
}
