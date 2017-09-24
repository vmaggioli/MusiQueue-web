import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { QueueService } from '../shared/queue.service';
import { YoutubeService } from '../shared/youtube.service';
import { Song } from '../objects/song';

@Component({
  selector: 'lsl-user-hub-view',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './user-hub-view.component.html',
  styleUrls: ['./user-hub-view.component.css'],
  providers: [QueueService, YoutubeService]
})
export class UserHubViewComponent {

  public itemList: FirebaseListObservable<any[]>;
  public songs: Song[];
  public isQueue: boolean = true;
  public isSongs: boolean = false;
  public name: string = "UniqueHub";

  constructor(
    public queueService: QueueService,
    public youtubeService: YoutubeService) {

   }

  ngOnInit() {
    this.queueService.getQueue("UniqueHub").subscribe(items => {
      this.songs = items;
      this.songs.sort((a, b) => {
        let ar: number = a.rank;
        let br: number = b.rank;
        if (ar < br) return 1;
        else if (ar > br) return -1;
        else return 0;
      });
      this.itemList = this.songs;
      if (this.songs.length > 0)
        this.id = this.songs[0].video_id;
    })
  }

  onItemClicked(youtubeItem) {
    console.log("hello1");
    if (!this.isSongs) return;
    console.log("hello2");
    var title = youtubeItem.snippet.title;
    var thumbnail = youtubeItem.snippet.thumbnails.default.url; //there are other sizes
    var videoId = youtubeItem.id.videoId;
    this.queueService.addSong(title, thumbnail, videoId, this.name);
    this.onSelected("queue");
  }

  onSelected(tab: string) {
    if (tab == "songs") {
      this.isQueue = false;
      this.isUsers = false;
      this.isSongs = true;
      this.itemList = [];
    }
    else if (tab == "queue") {
      this.isUsers = false;
      this.isSongs = false;
      this.isQueue = true;
      this.queueService.getQueue(this.name).subscribe(items => {
        this.songs = items;
        this.songs.sort((a, b) => {
          let ar: number = a.rank;
          let br: number = b.rank;
          if (ar < br) return 1;
          else if (ar > br) return -1;
          else return 0;
        });
        this.itemList = this.songs;
        console.log("len: " this.songs.length);
      })

    }
  }

  onSearch(input: string) {
    this.songs = this.youtubeService.search(input);
    this.songs.forEach(song => {
      this.itemList = [];
      song.items.forEach(item => {
        console.log(item);
        this.itemList.push(item);
      });
    });
  }

  upvote(song) {
    this.queueService.upvote(song);
  }

  downvote(song) {
    this.queueService.downvote(song);
  }

}
