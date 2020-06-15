import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from 'src/app/_services/orders.service';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CancelorderComponent } from 'src/app/_modal/cancelorder/cancelorder.component';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Color, Label, BaseChartDirective } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { NotificationModelComponent } from 'src/app/_modal/notification-model/notification-model.component';
declare function dashboardGraph();
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective,{static:true})
  public chart: BaseChartDirective;
  filteredArray: any[] = []


  newOrderNotificationRes = []
  dataType = 'Current Orders';
  invoicsData = []

  constructor(private order:OrdersService, private user: UserService , private router : Router,private matDialog: MatDialog, private auth : AuthenticationService) {

   }

  ngOnInit() {
    this.showNotification();
    this.invoics();
    this.graphData('week')

  }

  readNotification(id){
    this.user.readNotification(id).subscribe()
  }

  invoics(){
    this.order.completedOders().subscribe(res=>{
      let response : any = res;
      this.invoicsData = response.data.reverse().slice(0, 4);
    })
  }

  showAllNotification(){
    this.matDialog.open(NotificationModelComponent,{
      data : {notification : this.newOrderNotificationRes}
    })
  }
  onclick(data){
    this.dataType = data;
  }

  graphData(filter){
    this.user.getGraph(filter).subscribe(res=>{
      let response : any= res;
      this.chart.chart.data.datasets[0].data = response.count;
      this.chart.chart.data.labels = response.date;
      this.chart.chart.update();

    })
  }

  showNotification() {

    this.user.Notification.subscribe(result => {this.newOrderNotificationRes = result
      this.filteredArray = this.newOrderNotificationRes.slice(0, 5);
    })

  }

  data = []
  labels =[]

  insiate(){
    // this.lineChartData = ;
    this.lineChartLabels = this.labels;
  }


  public lineChartData: ChartDataSets[] = [
    { data:[], label: 'Orders' },
  ]
  public lineChartLabels: Label[] =[]
  public lineChartColors: Color[] = [
    {
      borderColor: '#2A41E8',
      backgroundColor: 'rgba(42, 65, 232, .1)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

}
