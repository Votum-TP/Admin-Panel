import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dragdrop',
  templateUrl: './dragdrop.component.html',
  styleUrls: ['./dragdrop.component.css']
})
export class DragDropComponent implements OnInit {

   public listNumbers1: any;
  //  public listNumbers2: any;

  constructor() { }

  ngOnInit() {
    this.listNumbers1 = [];
    // this.listNumbers2 = [];

    for (let index = 0; index < 10; index++) {
      this.listNumbers1.push(index);
    }

    // for (let index = 10; index < 20; index++) {
    //   this.listNumbers2.push(index);
    // }
    
  }

  drop($event: CdkDragDrop<number[]>){

    if($event.previousContainer === $event.container){
      moveItemInArray(
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      )
    }else{
      transferArrayItem(
        $event.previousContainer.data,
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      );
    }


  }

}