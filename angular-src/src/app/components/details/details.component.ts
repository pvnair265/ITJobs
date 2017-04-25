import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
id: string;
sub: any;
singleJob: Object;
  constructor(private route: ActivatedRoute, private authservice: AuthService, private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];
       this.getjobDetail(this.id)
    })
  }

   getjobDetail(id) {
      this.authservice.getjobDetail(id).subscribe(data => {
        this.singleJob = data;
      })
    }

    goBack() {
      this.router.navigate(['home']);
    }

}
