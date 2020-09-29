import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-metadata-filter',
  templateUrl: './metadata-filter.component.html',
  styleUrls: ['./metadata-filter.component.scss']
})
export class MetadataFilterComponent implements OnInit {
   @Input() selectedItems = [];
  constructor() { }

  ngOnInit(): void {
    console.log({se: this.selectedItems});
  }
  onDataUpdate(data: any, action: string) {
    console.log({data, action});
  }

}
