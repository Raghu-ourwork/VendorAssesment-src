import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit {
  private readonly _destroying$ = new Subject<void>();

  constructor(private authService: MsalService, private router: Router,
    private msalBroadcastService: MsalBroadcastService
  ) { }

  ngOnInit(): void {
    console.log('lenSubscribe length', this.authService.instance.getAllAccounts())
    // if (this.authService.instance.getAllAccounts().length > 0)
    //   // this.router.navigate(['/reports', '9c35b38b-b414-42ac-9e24-cbab01a9b1e2', 'ReportSection']);
    //   this.router.navigate(['/master-data']);

    // this.msalBroadcastService.inProgress$
    //   .pipe(
    //     filter((status: InteractionStatus) => status === InteractionStatus.None),
    //     takeUntil(this._destroying$)
    //   )
    //   .subscribe(() => {
    //     console.log('lenSubscribe length', this.authService.instance.getAllAccounts())
    //     this.router.navigate(['/master-data']);

    //   });
  }
}
