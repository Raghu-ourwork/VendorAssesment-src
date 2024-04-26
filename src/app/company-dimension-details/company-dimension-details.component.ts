import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-company-dimension-details',
  templateUrl: './company-dimension-details.component.html',
  styleUrls: ['./company-dimension-details.component.scss']
})

export class CompanyDimensionDetailsComponent implements OnInit {
  displayedColumns: string[] = ['dimension', 'factors', 'attributes', 'bandvalues'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  tableData = [
    { dimension: 'Corporation', factors: "Data Privacy and Compliance", attributes: 'Compliance with data protection regulations: True / False', bandvalues: '',updatedBandvalues:'' },
    { dimension: 'Corporation', factors: 'Data Privacy and Compliance', attributes: 'Number of Data Breaches in the Past Year', bandvalues: '',updatedBandvalues:'' },
    { dimension: 'Corporation', factors: 'Data Privacy and Compliance', attributes: 'Percentage of Personally Identifiable Information (PII) Encrypted', bandvalues: '',updatedBandvalues:'' },
    { dimension: 'Corporation', factors: "Economic Downturns", attributes: '% strength of Mass Firing owing to cost cutting', bandvalues: '',updatedBandvalues:'' },
    { dimension: 'Corporation', factors: 'Economic Downturns', attributes: 'Days Sales Outstanding (DSO)', bandvalues: '',updatedBandvalues:'' },
    { dimension: 'Corporation', factors: 'Geopolitical Conflicts', attributes: 'Country Risk Index', bandvalues: '',updatedBandvalues:'' },
    { dimension: 'Corporation', factors: "Geopolitical Conflicts", attributes: 'GDP growth', bandvalues: '',updatedBandvalues:'' },
    { dimension: 'Corporation', factors: 'Geopolitical Conflicts', attributes: 'Political Risk Index', bandvalues: '',updatedBandvalues:'' },
    { dimension: 'Corporation', factors: "Intellectual Property Risks", attributes: 'IP Portfolio Value: market value of patents, trademarks, copyrights', bandvalues: '',updatedBandvalues:'' },
    { dimension: 'Corporation', factors: 'Intellectual Property Risks', attributes: 'IP Registered', bandvalues: '',updatedBandvalues:'' },
    { dimension: 'Corporation', factors: 'Intellectual Property Risks', attributes: 'Number of IP Violations', bandvalues: '',updatedBandvalues:'' },
    { dimension: 'Corporation', factors: "Political Instability", attributes: 'Corruption Perception Index (CPI)', bandvalues: '',updatedBandvalues:'' },
    { dimension: 'Corporation', factors: "Political Instability", attributes: '% strength of Mass Firing owing to cost cutting', bandvalues: '',updatedBandvalues:'' },
    { dimension: 'Corporation', factors: "Political Instability", attributes: 'Compliance with data protection regulations: True / False', bandvalues: '',updatedBandvalues:'' },
    { dimension: 'Corporation', factors: "Political Instability", attributes: 'Days Sales Outstanding (DSO)', bandvalues: '',updatedBandvalues:'' },
    { dimension: 'Corporation', factors: 'Political Instability', attributes: '% strength of Mass Firing owing to cost cutting', bandvalues: '',updatedBandvalues:'' },
    { dimension: 'Corporation', factors: 'Supply Chain Disruptions', attributes: '%age of deliveries made on time', bandvalues: '',updatedBandvalues:'' },
    { dimension: 'Corporation', factors: 'Supply Chain Disruptions', attributes: 'Quick Ratio', bandvalues: '',updatedBandvalues:'' },
    { dimension: 'Corporation', factors: 'Supply Chain Disruptions', attributes: 'Supplier Lead Time', bandvalues: '',updatedBandvalues:'' },
    { dimension: 'Corporation', factors: 'Supply Chain Disruptions', attributes: 'Supply Chain Resiliency Index', bandvalues: '',updatedBandvalues:'' },
    { dimension: 'Corporation', factors: 'Supply Chain Disruptions', attributes: 'Days Sales Outstanding (DSO)', bandvalues: '',updatedBandvalues:'' },
    { dimension: 'Corporation', factors: 'Supply Chain Disruptions', attributes: '% strength of Mass Firing owing to cost cutting', bandvalues: '',updatedBandvalues:'' },

    { dimension: 'Ethical', factors: 'Data Breaches', attributes: '% of Personally Identifiable Information (PII) Encrypted', bandvalues: '',updatedBandvalues:'' },
    { dimension: 'Ethical', factors: 'Data Breaches', attributes: 'Compliance with data protection regulations: True / False', bandvalues: '',updatedBandvalues:'' },
    { dimension: 'Ethical', factors: 'Data Breaches', attributes: 'No. of Data Breaches in the Past Year', bandvalues: '',updatedBandvalues:'' },
    { dimension: 'Ethical', factors: 'Ineffective Risk Management', attributes: '% of key risks monitored in real-time', bandvalues: '',updatedBandvalues:'' },
    { dimension: 'Ethical', factors: 'Ineffective Risk Management', attributes: '% of revenue or assets exposed to significant risks', bandvalues: '',updatedBandvalues:'' },
    { dimension: 'Ethical', factors: 'Ineffective Risk Management', attributes: 'No. of compliance violations or incidents', bandvalues: '',updatedBandvalues:'' },
    { dimension: 'Ethical', factors: 'Non-Compliance with Laws and Regulations', attributes: 'No. of fines, legal or regulatory violations', bandvalues: '',updatedBandvalues:'' },
    { dimension: 'Ethical', factors: 'Non-Compliance with Laws and Regulations', attributes: 'Value of fines imposed', bandvalues: '',updatedBandvalues:'' },

    { dimension: 'Financial', factors: 'Balance Sheet Strength', attributes: 'Asset Growth Ratio', bandvalues: '',updatedBandvalues:'' },
    { dimension: 'Financial', factors: 'Balance Sheet Strength', attributes: 'Liabilities Growth Ratio', bandvalues: '',updatedBandvalues:'' },
    { dimension: 'Financial', factors: 'Balance Sheet Strength', attributes: 'Liability to Assets Ratio (%)', bandvalues: '',updatedBandvalues:'' },
    { dimension: 'Financial', factors: 'Balance Sheet Strength', attributes: 'Return on Assets (%)', bandvalues: '',updatedBandvalues:'' },
  ];

  filterData = []
  factorsAll = Array.from(new Set(this.tableData.map((item) => item.factors)))
  attributesAll = Array.from(new Set(this.tableData.map((item) => item.attributes)))


  selected: any;
  formBuilder: any;
  userForm: any
  constructor(private fb: FormBuilder) {

    this.userForm = this.fb.group({
      company: new FormControl(),
      dimension: new FormControl(),
      factors: new FormControl(),
      attributes: new FormControl(),
      brand_values: this.fb.array([]),
    });

  }


  ngOnInit() {
    for (let i = 0; i < this.tableData.length; i++) {
      this.tableData[i].bandvalues=(Math.random()*100).toFixed(2)
      this.tableData[i].updatedBandvalues=""
    }
    this.filterData = this.tableData
    this.userForm.patchValue({ company: '' });
    this.userForm.patchValue({ dimension: '' });
    this.userForm.patchValue({ factors: '' });
    this.userForm.patchValue({ attributes: '' });

  }

  public onSelected(event,type) {
    const value = event.target.value;
    this.selected = value;
    if(type=="D"){
      this.userForm.patchValue({ factors: '' });
      this.userForm.patchValue({ attributes: '' });
     
    }else if(type=="F"){
      this.userForm.patchValue({ attributes: '' });
    }
    var dimension = this.userForm.value.dimension
    var factors = this.userForm.value.factors
    var attributes = this.userForm.value.attributes
    console.log("attributes",attributes)
   

    if (dimension != null && dimension != '') {
      this.filterData = this.tableData.filter(d => d.dimension == dimension);
      this.factorsAll = Array.from(new Set(this.filterData.map((item) => item.factors)))
      this.attributesAll = Array.from(new Set(this.filterData.map((item) => item.attributes)))
      
    }
    else {
      this.filterData = this.tableData
      this.factorsAll = Array.from(new Set(this.tableData.map((item) => item.factors)))
      this.attributesAll = Array.from(new Set(this.tableData.map((item) => item.attributes)))
    }


    if (factors != null && factors != '') {
      this.filterData = this.filterData.filter(d => d.factors == factors);
      this.attributesAll = Array.from(new Set(this.filterData.map((item) => item.attributes)))
      
    } else {
      let dimeTable = this.tableData
      if (dimension != null && dimension != '') {
        dimeTable = dimeTable.filter(d => d.dimension == dimension);
      }
      this.attributesAll = Array.from(new Set(dimeTable.map((item) => item.attributes)))
    }


    if (attributes != null && attributes != '') {
      this.filterData = this.filterData.filter(d => d.attributes == attributes);
    }
   
  }
  updateNextColumn(index: number,event) {
    // Assuming value1 is updated
    this.filterData[index].updatedBandvalues=this.filterData[index].bandvalues = event.target.value // Update next column
  }
}

export interface PeriodicElement {
  dimension: string;
  factors: string;
  attributes: string;
  bandvalues: string;
}

