import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { HubService } from '../shared/hub.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../objects/user';

@Component({
  selector: 'lsl-hub-profile',
  templateUrl: './hub-profile.component.html',
  styleUrls: ['./hub-profile.component.css']
})

// interface HubUserItem {
//   user: User;
//   pic: string;
// }

export class HubProfileComponent implements OnInit {
  url: string;
  isCreator: any = null;
  hubId: string;
  curHub: any;
  members: any;
  tabIdx: number = 0;

  constructor(
    public usersService: UsersService,
    public hubService: HubService,
    public route: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.hubId = params['name'];

      this.hubService.getHubByNameOnce(this.hubId).then(hub => {
        this.curHub = hub.val();
        // TODO: IMPLEMENT MEDALS AND REMOVE HARD-CODED VALUES
        this.curHub.medal_count = 0;
        this.curHub.medal_score = 0;

        if (this.usersService.currentUser.uid == this.curHub.creator)
          this.isCreator = true;
        else
          this.isCreator = false;

        this.hubService.getPic(this.hubId).then(found => {
          this.url = found;
        }, notFound => {
          this.usersService.getPic("__stock__").then(p => {
            this.url = p;
          });
        });
      });
      this.handleMembers();
      this.tabIdx = 0;
    });
  }

  editProfile() {
    this.router.navigate(['hub-profile-form', this.hubId]);
  }

  joinHub() {
    this.hubService.getHubUsersOnce(this.hubId).then(users => {
      let hasUser = false;
      users.forEach(user => {
        if (user.key == this.usersService.currentUser.uid)
          hasUser = true;
      });
      if (hasUser)
        confirm("You are already a member of this hub.");
      else {
        this.router.navigate(["hub-login", this.hubId]);
      }
    });
  }

  handleMembers() {
    this.members = [];
    this.hubService.getHubUsersOnce(this.hubId).then(snap => {
      snap.forEach(s => {
        this.usersService.getUserByIdOnce(s.key).then(user => {
          this.curHub.total_upvotes += user.val().upvotes == null ? 0 : user.val().upvotes;
          this.curHub.total_downvotes += user.val().downvotes == null ? 0: user.val().upvotes;
          this.curHub.score += this.curHub.total_upvotes - this.curHub.total_downvotes;
          // TODO: IMPLEMENT MEDALS INTO SCORE VALUES

          var userUrl: string;
          var member: any;
          this.usersService.getPic(user.val().uid).then(pic => {
            member = {user: user.val(), pic: pic};
            this.members.push(member);
          }, notFound => {
            this.usersService.getPic("__stock__").then(p => {
              member = {user: user.val(), pic: p};
              this.members.push(member);
            });
          });
        });
      });
    });
  }

  onSelected(event) {
    if (this.tabIdx == 0) {
      this.handleMembers();
    }
  }

  onMemberSelected(member) {
    this.router.navigate(['user-profile', member.uid]);
  }








}
