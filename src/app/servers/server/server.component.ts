import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    // it still loads the server, like before but now not using the params here in the server component but instead using a resolver before this, again of course especially important when using asynchronous data.
    this.route.data.subscribe(
      (data: Data) => {
        this.server = data['server'];
      }
    );
    // const id = +this.route.snapshot.params['id'];
    // this.server = this.serversService.getServer(id);
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.server = this.serversService.getServer(+params['id']);
    //   }
    // );
  }

  onEdit() {
    this.router.navigate(['edit'], {
      relativeTo: this.route,
      // useful to know to make sure you don't lose the information you had before.
      queryParamsHandling: 'preserve'});
  }

}
