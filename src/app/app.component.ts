import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dataSource: any[] = [
    {
      host: 'et-demo-2-win4',
      cpu: '30 %',
      memory: '38 % of 5.83 GB',
      traffic: '98.7 Mbit/s'
    },
    {
      host: 'et-demo-2-win3',
      cpu: '26 %',
      memory: '46 % of 6 GB',
      traffic: '625 Mbit/s',
      expanded: true
    },
    {
      host: 'docker-host2',
      cpu: '25.4 %',
      memory: '38 % of 5.83 GB',
      traffic: '419 Mbit/s'
    },
    {
      host: 'et-demo-2-win1',
      cpu: '23 %',
      memory: '7.86 % of 5.83 GB',
      traffic: '98.7 Mbit/s'
    }
  ];

  sortData(event): void {
    const data = this.dataSource.slice();
    data.sort((a, b) => {
      const isAsc = event.direction === 'asc';
      switch (event.active) {
        case 'host':
          return this.compare(a.host, b.host, isAsc);
        case 'cpu':
          return this.compare(a.cpu, b.cpu, isAsc);
        case 'memory':
          return this.compare(a.memoryPerc, b.memoryPerc, isAsc);
        case 'traffic':
          return this.compare(a.traffic, b.traffic, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource = data;
  }
  compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
