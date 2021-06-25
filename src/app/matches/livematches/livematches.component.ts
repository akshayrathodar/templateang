import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../Service/common.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-livematches',
  templateUrl: './livematches.component.html',
  styleUrls: ['./livematches.component.scss']
})
export class LivematchesComponent implements OnInit {
  public data:any = [];
  constructor(public cs:CommonService) { }

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.cs.getDataFromUrl('/api/v1/match/corn/fetchlive','{Content-Type: application/json}').then((res) => {
      if(res.success) {
        
         this.data = res.response;
         this.dtTrigger.next();
      }
    }).catch((err) => {
      console.log(err);
    })

  }

}
