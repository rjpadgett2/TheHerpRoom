import {Component, OnInit, ViewChild} from '@angular/core';
import { FieldType } from '@ngx-formly/material';
import { MatInput } from '@angular/material/input';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent extends FieldType implements OnInit {

  filter: Observable<any>;

  ngOnInit() {
    super.ngOnInit();
    this.filter = this.formControl.valueChanges.pipe(
            startWith(''),
            switchMap(term => this.to.filter(term)),
        );
    console.log(this.filter);
  }


}
