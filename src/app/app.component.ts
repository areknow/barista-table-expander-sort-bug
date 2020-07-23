import { Component } from '@angular/core';
import { isObject } from '@dynatrace/barista-components/core';
import {
  DtQuickFilterDefaultDataSource,
  DtQuickFilterDefaultDataSourceConfig,
} from '@dynatrace/barista-components/experimental/quick-filter';

export const FILTER_FIELD_CONFIG = {
  autocomplete: [
    {
      name: 'Account type',
      distinct: true,
      autocomplete: [{ name: 'a'},{ name: 'b'},{ name: 'c'}]
    },
    {
      name: 'Support type',
      distinct: true,
      autocomplete: [{ name: 'x'},{ name: 'y'},{ name: 'z'}]
    }
  ]
};

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

  /** configuration for the quick filter */
  private config: DtQuickFilterDefaultDataSourceConfig = {
    // Method to decide if a node should be displayed in the quick filter
    showInSidebar: (node) =>
      isObject(node) && node.name && node.name !== 'Not in Quickfilter',
  };

  filterSource = new DtQuickFilterDefaultDataSource(
    FILTER_FIELD_CONFIG,
    this.config,
  );

  fakeFilters = [
    [
      { name: 'Group 1', distinct: true, autocomplete: [{ name: 'a' }, { name: 'b' }, { name: 'c' }] },
      { name: 'b' }
    ],
    [
      { name: 'Group 2', distinct: true, autocomplete: [{ name: 'x' }, { name: 'y' }, { name: 'z' }] },
      { name: 'y' }
    ]
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
