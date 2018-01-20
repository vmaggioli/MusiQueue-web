import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { RankingService } from '../shared/ranking.service';
import { TopSongsService } from '../shared/top-songs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TopSong } from '../objects/topSong';
import { User } from '../objects/user';

@Component({
  selector: 'lsl-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [TopSongsService, RankingService],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileComponent implements OnInit {

  public url: string;
  public isOwnerProfile: boolean = false;
  public topSongs: TopSong[];
  public curUser: User;
  public friends: any;
  public tabIdx: number = 0;

  constructor(
    public usersService: UsersService,
    public route: ActivatedRoute,
    public router: Router,
    public topSongsService: TopSongsService,
    public rankingService: RankingService,
  ) {

   }

  ngOnInit() {
    // need to extract uid from url instead
    this.route.params.subscribe(params => {
      var uid = params['name'];
      if (uid == this.usersService.currentUser.uid)
        this.isOwnerProfile = true;
      else
        this.isOwnerProfile = false;

      this.usersService.getPic(uid).then(found => {
        this.url = found;
      }, notFound => {
        this.usersService.getPic("__stock__").then(p => {
          this.url= p;
        });
      });

      this.usersService.getUserById(uid).subscribe(u => {
        this.curUser = u;
        this.handleFriends();
      });

      this.rankingService.getUserScores(uid).then(scores => {
        this.curUser.upvotes = scores.val().upvotes;
        this.curUser.downvotes = scores.val().downvotes;
        // TODO: IMPLEMENT MEDALS AND REMOVE HARD-CODED VALUES
        this.curUser.medal_count = scores.val().medal_count;
        this.curUser.medal_score = scores.val().medal_score;

        this.getUserRank();
      });

      this.topSongsService.getTopSongs(uid).then(snap => {
        let songs: TopSong[] = new Array(30);
        let i: number = 0;

        // CREATE LIST OF SONGS
        snap.forEach(song => {
          if (song.key != "num_songs") {
            songs[i] = new TopSong(song.key, song.child("time_added").val(), song.child("count").val(),
              song.child("title").val(), song.child("thumbnail").val());
            i = i + 1;
          }
        });

        if (songs.length == 0) return;

        // SORT LIST BY COUNT FIRST, THEN TIME ADDED
        // LARGEST COUNT FIRST AND NEWEST TIME FIRST
        songs.sort((a, b) => {
          let ac: number = a.num_played;
          let bc: number = b.num_played;
          let at: number = a.time_added;
          let bt: number = b.time_added;
          if (ac < bc) return 1;
          else if (bc < ac) return -1;
          else if (at < bt) return 1;
          else if (bt < at) return -1;
          return 0;
        });

        this.topSongs = [];
        for (let i = 0; i < 3; i++) {
          if (songs[i] != undefined)
            this.topSongs.push(songs[i]);
        }
      });
      this.tabIdx = 0;
    });
  }

  getUserRank() {
    this.rankingService.getUserRanksOnce().then(ranks => {
      var ranksArray = [];
      let i = 0;

      ranks.forEach(rankItem => {
        ranksArray.push(rankItem.val());
        ranksArray[i].user = rankItem.key;
        i++;
      });

      ranksArray.sort((a, b) => {
        let aRank = a.upvotes - a.downvotes + a.medal_score;
        let bRank = b.upvotes - b.downvotes + b.medal_score;
        if (aRank < bRank) return 1;
        else if (aRank > bRank) return -1;
        else return 0;
      });

      i = 0;
      while (i < ranksArray.length) {
        if (ranksArray[i].user == this.usersService.currentUser.uid)
        {
          this.curUser.rank = i + 1;
          break;
        }
        i++;
      };
    });
  }

  editProfile() {
    this.router.navigate(['profile-form', this.usersService.currentUser.uid]);
  }

  addFriend() {
    this.usersService.addFriend(this.usersService.currentUser.uid, this.curUser.uid);
  }

  handleFriends() {
    this.friends = [];
    this.usersService.getFriends(this.curUser.uid).then(snap => {
      snap.forEach(s => {
        this.usersService.getUserByIdOnce(s.key).then(user => {
          this.rankingService.getUserScores(user.val().uid).then(scores => {
            var userUrl: string;
            var friend: any;
            this.usersService.getPic(user.val().uid).then(pic => {
              friend = {
                user: user.val(),
                pic: pic,
                upvotes: scores.val().upvotes,
                downvotes: scores.val().downvotes,
                medal_score: scores.val().medal_score,
              };
              this.friends.push(friend);
            }, notFound => {
              this.usersService.getPic("__stock__").then(p => {
                friend = {
                  user: user.val(),
                  pic: pic,
                  upvotes: scores.val().upvotes,
                  downvotes: scores.val().downvotes,
                  medal_score: scores.val().medal_score,
                };
                this.friends.push(friend);
              });
            });
          });
        });
      });
    });
  }

  onSelected(event) {
    if (this.tabIdx == 1) {
      this.handleFriends();
    }
  }

  onFriendSelected(friend) {
    this.router.navigate(['user-profile', friend.user.uid]);
  }
}
