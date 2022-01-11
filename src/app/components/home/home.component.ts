import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public sort: string = ''
  constructor() { }



  ngOnInit(): void {
    console.log(this.sort);
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(changes);
  //   console.log(this.sort)
  // }




}
