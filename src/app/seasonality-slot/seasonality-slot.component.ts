import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-seasonality-slot',
  templateUrl: './seasonality-slot.component.html',
  styleUrls: ['./seasonality-slot.component.css']
})
export class SeasonalitySlotComponent implements OnInit {
  @Input() slot: any;

  constructor() { }

  ngOnInit() {
  }

}
