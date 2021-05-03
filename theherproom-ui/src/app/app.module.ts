import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StepperComponent} from "./shared/components/stepper/stepper.component";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {ProgressBarComponent} from "./shared/components/progress-bar/progress-bar.component";
import {MultiStepFormComponent} from "./shared/components/multi-step-form/multi-step-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FormlyIonicModule } from '@ngx-formly/ionic';
import {FormlyModule} from "@ngx-formly/core";
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AutocompleteComponent} from "./shared/components/autocomplete/autocomplete.component";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ErrorMessageComponent} from "./shared/components/error-message/error-message.component";
import {UsernameValidatorComponent} from "./shared/validators/username-validator/username-validator.component";
import {PasswordValidatorComponent} from "./shared/validators/password-validator/password-validator.component";

@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent,
    MultiStepFormComponent,
    StepperComponent,
    UsernameValidatorComponent,
      PasswordValidatorComponent,
    AutocompleteComponent,
      ErrorMessageComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    MatStepperModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyIonicModule,
    FormlyModule,
    BrowserAnimationsModule,
    FormlyModule.forRoot({
      types: [
        {name: 'stepper', component: StepperComponent, wrappers: []},
        {
          name: 'autocomplete',
          component: AutocompleteComponent,
          wrappers: ['form-field'],
        },
      ],
      validationMessages: [
        {name: 'required', message: 'This field is required'},
      ],
    }),
    MatAutocompleteModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
      ErrorMessageComponent,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  exports: [
    MultiStepFormComponent,
    AutocompleteComponent,
      PasswordValidatorComponent,
    ErrorMessageComponent,
    UsernameValidatorComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
