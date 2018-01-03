import { Component, OnInit } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { TopSongsService } from '../shared/top-songs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TopSong } from '../objects/topSong';

@Component({
  selector: 'lsl-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [TopSongsService]
})
export class UserProfileComponent implements OnInit {

  public url: string;
  public isOwnerProfile: boolean = false;
  public topSongs: TopSong[];

  constructor(
    public usersService: UsersService,
    public route: ActivatedRoute,
    public router: Router,
    public topSongsService: TopSongsService,
  ) { }

  ngOnInit() {
    // need to extract uid from url instead
    this.route.params.subscribe(params => {
      var uid = params['name'];
      if (uid == this.usersService.currentUser.uid)
        this.isOwnerProfile = true;
      else
        this.isOwnerProfile = false;

      this.usersService.getPic(uid).then(p => {
        this.url = p;
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
        console.log(", len: " + songs.length);
        for (let i = 0; i < 3; i++) {
          console.log(songs[i]);
          if (songs[i] != undefined)
            this.topSongs.push(songs[i]);
        }
      });
    });
  }

  editProfile() {
    this.router.navigate(['profile-form', this.usersService.currentUser.uid]);
  }

}
