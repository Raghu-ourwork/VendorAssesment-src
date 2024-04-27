import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as pbi from 'powerbi-client';
import { ActivatedRoute, Router } from '@angular/router';
import { Report } from 'report';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})

export class ReportsComponent implements OnInit, AfterViewInit {
  public subPages: any = {};
  public sidebarItems: any = {};
  public currentSubMenu: String;
  public isReportLoading = false;
  public result: any;

  public report: Report;
  public reportId: string;
  public reportSectionId:string;
  public clicksOnZoom = 0;
  public zoom: number;
  @ViewChild('reportContainer') reportContainer: ElementRef;

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService) { }
  async ngOnInit() {
    let _this=this

    this.route.paramMap.subscribe(async function(params){
      if ( params.get('reportName')!=null && _this.reportId == params.get('reportName')) {
        await _this.report.setPage(params.get('sectionName')); 
       
      }
     
      _this.reportId=params.get('reportName')
      _this.reportSectionId=params.get('sectionName')
     
    })

  }
  async ngAfterViewInit() {
   // this.result = await this.apiService.generateEmbedToken().toPromise();
    
    this.showReport();
  }

  showReport() {
    let reportContainer = this.reportContainer.nativeElement;
    let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
    powerbi.reset(reportContainer);
    
    let embedData = {
      token:localStorage.getItem('access-token'),
      embedUrl: 'https://app.powerbi.com/reportEmbed',
      reportId:  this.reportId,
    }

    var models = pbi.models;
    let config = {
      type: 'report',
      tokenType: models.TokenType.Aad,
      accessToken: embedData.token,
      embedUrl: embedData.embedUrl,
      pageName: this.reportSectionId,
      id: embedData.reportId,
      settings: {
        filterPaneEnabled: false,
        navContentPaneEnabled: false,
      }
    } as pbi.IEmbedConfiguration;


    var self = this;
    self.report = <Report>(powerbi.embed(reportContainer, config));

    
    self.report.on("rendered", () => {
      this.isReportLoading = false;
      //enable left side menu action

      document.getElementById('sidebar').style.pointerEvents = 'auto';
      document.getElementsByTagName('iframe')[0].style.border = '0';
    });

    self.report.on("error", (e) => {
      let error:any=e.detail
      console.log(error.errorCode)
      // if(error.errorCode==403)
      //   this.apiService.logoutUser()
    });
  }
  async zoomGraph(x) {
    this.zoom = await this.report.getZoom();
    if(this.clicksOnZoom == 0){
      localStorage.setItem("defaultZoom", String(this.zoom));
    }
    this.clicksOnZoom++;
    
    if(x == 'refresh')
      this.zoom = Number(localStorage.getItem('defaultZoom'));
    else
      this.zoom += x;
    if(this.zoom < 0.25)
      this.zoom = 0.25;
    else if(this.zoom > 4.00)
      this.zoom = 4.00;
    await this.report.setZoom(this.zoom);
  }
}
