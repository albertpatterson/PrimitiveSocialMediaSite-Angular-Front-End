import { Component, OnInit ,EventEmitter} from '@angular/core';

@Component({
  selector: 'tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css'],
  inputs: [
    "width", 
    "left",
    "bottom",
    "message",
    "visibility",
    "arrowLocation"
  ],
  outputs: [
    "onExit"
  ]
})
export class TooltipComponent implements OnInit {

  public width: string;
  public left: string;
  public bottom: string;
  public message: string;
  public visibility: string;
  public arrowLocation: string;

  public onExit: EventEmitter<null> = new EventEmitter();
  constructor() {
    this.width = this.width || "";
    this.left = this.left || "0";
    this.bottom = this.bottom || "0";
    this.message = this.message || "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.";
    this.visibility = this.visibility || "visible";
    this.arrowLocation = this.arrowLocation || "bottom";
  }

  ngOnInit() {
  }

  public exit(): void{
    this.visibility = "hidden";
    this.onExit.next();
  }

}
