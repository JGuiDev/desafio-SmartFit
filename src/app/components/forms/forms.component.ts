import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GetUnitsService } from '../../services/get-units.service';
import { HttpClientModule } from '@angular/common/http';
import { Location } from '../../types/Location.interface';

@Component({
  selector: 'form-filter',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  providers:[GetUnitsService],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
})
export class FormsComponent implements OnInit {
  results: Location[] = [];
  filteredResults: Location[] = []
  formGroup!: FormGroup

  constructor(private formBuilder: FormBuilder, private unitService: GetUnitsService) {}

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: false
    })
    this.unitService.getAllUnits().subscribe(data => {
      this.results = data.locations
      this.filteredResults = data.locations
    })
  }

  onSubmit(): void{
    if(!this.formGroup.value.showClosed){
      this.filteredResults = this.results.filter(location => location.opened === true)
    }
  }

  onClean(){
    this.formGroup.reset()
  }
}
