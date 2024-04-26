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
    let token='eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InEtMjNmYWxldlpoaEQzaG05Q1Fia1A1TVF5VSIsImtpZCI6InEtMjNmYWxldlpoaEQzaG05Q1Fia1A1TVF5VSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvODU1MGNjYTgtMTA1NS00MjU4LWFkM2ItZWUzY2NhMGVmNDYyLyIsImlhdCI6MTcxNDExODk3OCwibmJmIjoxNzE0MTE4OTc4LCJleHAiOjE3MTQxMjQ0ODYsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84V0FBQUFDZkZGT21wWHh0Y1g0cGl0WDFzdmJaQVZzZ0l0dy8wRnlCcEQ3WVVsZnAwSHJZb1dsV3RoRU5sUEdnZnRneHp2IiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6IjI2M2M4NWNjLTRmMGEtNDNhZS05YTY1LWE4YjVlYzFlYTE5ZiIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiRGVtbyIsImdpdmVuX25hbWUiOiJJb25JZGVhIiwiaXBhZGRyIjoiMjQwNToyMDE6ZDAxMDpiMjdmOjQ4OWY6OGJkZTpjNDVhOmYyODMiLCJuYW1lIjoiaW9uSWRlYSBEZW1vIiwib2lkIjoiYmE1ZDNjN2EtNzBlYi00MzUwLWI4M2ItNTQ5YWMzMjFjOTljIiwicHVpZCI6IjEwMDMyMDAzNzYxRDQwNDIiLCJyaCI6IjAuQVhVQXFNeFFoVlVRV0VLdE8tNDh5ZzcwWWdrQUFBQUFBQUFBd0FBQUFBQUFBQUIxQUhNLiIsInNjcCI6IkFwcC5SZWFkLkFsbCBDYXBhY2l0eS5SZWFkLkFsbCBDYXBhY2l0eS5SZWFkV3JpdGUuQWxsIENvbm5lY3Rpb24uUmVhZC5BbGwgQ29ubmVjdGlvbi5SZWFkV3JpdGUuQWxsIENvbm5lY3Rpb24uUmVzaGFyZS5BbGwgQ29udGVudC5DcmVhdGUgRGFzaGJvYXJkLkV4ZWN1dGUuQWxsIERhc2hib2FyZC5SZWFkLkFsbCBEYXNoYm9hcmQuUmVhZFdyaXRlLkFsbCBEYXNoYm9hcmQuUmVzaGFyZS5BbGwgRGF0YWZsb3cuRXhlY3V0ZS5BbGwgRGF0YWZsb3cuUmVhZC5BbGwgRGF0YWZsb3cuUmVhZFdyaXRlLkFsbCBEYXRhZmxvdy5SZXNoYXJlLkFsbCBEYXRhbWFydC5FeGVjdXRlLkFsbCBEYXRhbWFydC5SZWFkLkFsbCBEYXRhbWFydC5SZWFkV3JpdGUuQWxsIERhdGFtYXJ0LlJlc2hhcmUuQWxsIERhdGFQaXBlbGluZS5FeGVjdXRlLkFsbCBEYXRhUGlwZWxpbmUuUmVhZC5BbGwgRGF0YVBpcGVsaW5lLlJlYWRXcml0ZS5BbGwgRGF0YVBpcGVsaW5lLlJlc2hhcmUuQWxsIERhdGFzZXQuUmVhZC5BbGwgRGF0YXNldC5SZWFkV3JpdGUuQWxsIERldlguUmVhZFdyaXRlLkFsbCBFbnZpcm9ubWVudC5FeGVjdXRlLkFsbCBFbnZpcm9ubWVudC5SZWFkLkFsbCBFbnZpcm9ubWVudC5SZWFkV3JpdGUuQWxsIEVudmlyb25tZW50LlJlc2hhcmUuQWxsIEV2ZW50aG91c2UuRXhlY3V0ZS5BbGwgRXZlbnRob3VzZS5SZWFkLkFsbCBFdmVudGhvdXNlLlJlYWRXcml0ZS5BbGwgRXZlbnRob3VzZS5SZXNoYXJlLkFsbCBHYXRld2F5LlJlYWQuQWxsIEdhdGV3YXkuUmVhZFdyaXRlLkFsbCBMYWtlaG91c2UuRXhlY3V0ZS5BbGwgTGFrZWhvdXNlLlJlYWQuQWxsIExha2Vob3VzZS5SZWFkV3JpdGUuQWxsIExha2Vob3VzZS5SZXNoYXJlLkFsbCBSZXBvcnQuRXhlY3V0ZS5BbGwgUmVwb3J0LlJlYWQuQWxsIFJlcG9ydC5SZWFkV3JpdGUuQWxsIFJlcG9ydC5SZXNoYXJlLkFsbCBXYXJlaG91c2UuRXhlY3V0ZS5BbGwgV2FyZWhvdXNlLlJlYWQuQWxsIFdhcmVob3VzZS5SZWFkV3JpdGUuQWxsIFdhcmVob3VzZS5SZXNoYXJlLkFsbCBXb3Jrc3BhY2UuR2l0Q29tbWl0LkFsbCBXb3Jrc3BhY2UuR2l0VXBkYXRlLkFsbCBXb3Jrc3BhY2UuUmVhZC5BbGwgV29ya3NwYWNlLlJlYWRXcml0ZS5BbGwiLCJzdWIiOiJyZ3pPWVRTMHNvM3RKRHhwbFZrR1FWa3JNMjAyWnZQZmwwVEFzVEM2NEFFIiwidGlkIjoiODU1MGNjYTgtMTA1NS00MjU4LWFkM2ItZWUzY2NhMGVmNDYyIiwidW5pcXVlX25hbWUiOiJpb25pZGVhZGVtb0BwbGF0ZWF1aW5jLmNvbSIsInVwbiI6ImlvbmlkZWFkZW1vQHBsYXRlYXVpbmMuY29tIiwidXRpIjoiTmdrNjhyektFRWVLbWZlcmVxZWlBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.Kb7M4DJ0bhLh-iBniBI334rAVcGGT8kgvcZYHR-HYsYBIJHleLsbzU8nKp5QAJQaxi1RcM0uwXXwS_lEueHxhvezD7xjfOn3uxz5SocTeXBEuuqiEFDnevXdiimSIrn2UI15d2JCh22yKfJP4PgkrHmENxCtePNptcSAdgH7f8vj36WbGcf3xRxU_gMnWvhBRCo0BSOCVcanFfAdM5kdOn06p4QphGBsfN04QdB020qKz2S1583g9CEKB5COHj7xWdpP9gV9yCNt_l-jfkPzj-vQj-UZ6a9QhrgOn8DVRx3VY7KAZFiCMiCzqNkgFbMhuzuGNbt1V0Vvkeg_MxW4ZQ'

    let embedData = {
      token:token,// localStorage.getItem('access-token'),
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
      if(error.errorCode==403)
        this.apiService.logoutUser()
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
