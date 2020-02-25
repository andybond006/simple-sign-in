import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ParticpantsRoutingModule } from './participants.routing';
import { ParticipantsComponent } from './participants.component';

@NgModule({
  declarations: [
    ParticipantsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ParticpantsRoutingModule
  ]
})
export class ParticipantsModule { }
