import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SectionType } from 'src/app/core/models/dashboard.model';

@Component({
  selector: 'app-case-surveillance-testing',
  templateUrl: './case-surveillance-testing.component.html',
  styleUrls: ['./case-surveillance-testing.component.scss']
})
export class CaseSurveillanceTestingComponent implements OnInit {
   sectionType = SectionType.CASE_SURVEILLANCE;
  constructor() { }

  ngOnInit(): void {
  }

  updateData(data) {
    console.log({data});
  }


}
