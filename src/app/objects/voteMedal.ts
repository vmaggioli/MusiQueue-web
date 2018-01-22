import { MedalE } from '../enums/medalE';

export class VoteMedal {
  public id: number;
  public score: number;
  public name: string;
  public achieveDesc: string;
  public regDesc: string;

  constructor(type: MedalE.VoteType) {
    this.id = type;

    switch(type) {
      case MedalE.VoteType.UpVoterTen:
        this.score = 1;
        this.name = "Novice I";
        this.achieveDesc = "You've upvoted 10 songs!";
        this.regDesc = "Earned after upvoting 10 songs";
        break;
      case MedalE.VoteType.UpVoterFifty:
        this.score = 5;
        this.name = "Novice II";
        this.achieveDesc = "You've upvoted 50 songs!";
        this.regDesc = "Earned after upvoting 50 songs";
        break;
      case MedalE.VoteType.UpVoterTwoHundred:
        this.score = 20;
        this.name = "Journeyman I";
        this.achieveDesc = "You've upvoted 200 songs!";
        this.regDesc = "Earned after upvoting 200 songs";
        break;
      case MedalE.VoteType.UpVoterFiveHundred:
        this.score = 50;
        this.name = "Journeyman II";
        this.achieveDesc = "You've upvoted 500 songs!";
        this.regDesc = "Earned after upvoting 500 songs";
        break;
      case MedalE.VoteType.UpVoterOneThousand:
        this.score = 100;
        this.name = "Instrumental Proficiency I";
        this.achieveDesc = "You've upvoted 1000 songs!";
        this.regDesc = "Earned after upvoting 1000 songs";
        break;
      case MedalE.VoteType.UpVoterTwoThousand:
        this.score = 150;
        this.name = "Instrumental Proficiency II";
        this.achieveDesc = "You've upvoted 2000 songs!";
        this.regDesc = "Earned after upvoting 2000 songs";
        break;
      case MedalE.VoteType.UpVoterFiveThousand:
        this.score = 250;
        this.name = "Musical Reverer I";
        this.achieveDesc = "You've upvoted 5000 songs!";
        this.regDesc = "Earned after upvoting 5000 songs";
        break;
      case MedalE.VoteType.UpVoterTenThousand:
        this.score = 500;
        this.name = "Musical Reverer II";
        this.achieveDesc = "You've upvoted 10000 songs!";
        this.regDesc = "Earned after upvoting 10000 songs";
        break;
      case MedalE.VoteType.UpVoterTwentyFiveThousand:
        this.score = 1000;
        this.name = "Optimist I";
        this.achieveDesc = "You've upvoted 25000 songs!";
        this.regDesc = "Earned after upvoting 25000 songs";
        break;
      case MedalE.VoteType.UpVoterFiftyThousand:
        this.score = 1500;
        this.name = "Optimist II";
        this.achieveDesc = "You've upvoted 50000 songs!";
        this.regDesc = "Earned after upvoting 50000 songs";
        break;
      case MedalE.VoteType.UpVoterOneHundredThousand:
        this.score = 2500;
        this.name = "Musical Samaritan";
        this.achieveDesc = "You've upvoted 100000 songs!";
        this.regDesc = "Earned after upvoting 100000 songs";
        break;

      case MedalE.VoteType.DownVoterTen:
        this.score = 1;
        this.name = "Objectively Insightful I";
        this.achieveDesc = "You've downvoted 10 songs!";
        this.regDesc = "Earned after downvoting 10 songs";
        break;
      case MedalE.VoteType.DownVoterFifty:
        this.score = 5;
        this.name = "Objectively Insightful II";
        this.achieveDesc = "You've downvoted 50 songs!";
        this.regDesc = "Earned after downvoting 50 songs";
        break;
      case MedalE.VoteType.DownVoterTwoHundred:
        this.score = 10;
        this.name = "Tough Love I";
        this.achieveDesc = "You've downvoted 200 songs!";
        this.regDesc = "Earned after downvoting 200 songs";
        break;
      case MedalE.VoteType.DownVoterFiveHundred:
        this.score = 20;
        this.name = "Tough Love II";
        this.achieveDesc = "You've downvoted 500 songs!";
        this.regDesc = "Earned after downvoting 500 songs";
        break;
      case MedalE.VoteType.DownVoterOneThousand:
        this.score = 50;
        this.name = "Brazenly Candid I";
        this.achieveDesc = "You've downvoted 1000 songs!";
        this.regDesc = "Earned after downvoting 1000 songs";
        break;
      case MedalE.VoteType.DownVoterTwoThousand:
        this.score = 100;
        this.name = "Brazenly Candid II";
        this.achieveDesc = "You've downvoted 2000 songs!";
        this.regDesc = "Earned after downvoting 2000 songs";
        break;
      case MedalE.VoteType.DownVoterFiveThousand:
        this.score = 200;
        this.name = "Cocksure I";
        this.achieveDesc = "You've downvoted 5000 songs!";
        this.regDesc = "Earned after downvoting 5000 songs";
        break;
      case MedalE.VoteType.DownVoterTenThousand:
        this.score = 250;
        this.name = "Cocksure II";
        this.achieveDesc = "You've downvoted 10000 songs!";
        this.regDesc = "Earned after downvoting 10000 songs";
        break;
      case MedalE.VoteType.DownVoterTwentyFiveThousand:
        this.score = 300;
        this.name = "Pesimist I";
        this.achieveDesc = "You've downvoted 25000 songs!";
        this.regDesc = "Earned after downvoting 25000 songs";
        break;
      case MedalE.VoteType.DownVoterFiftyThousand:
        this.score = 400;
        this.name = "Pesimist II";
        this.achieveDesc = "You've downvoted 50000 songs!";
        this.regDesc = "Earned after downvoting 50000 songs";
        break;
      case MedalE.VoteType.DownVoterOneHundredThousand:
        this.score = 500;
        this.name = "Musical Satanist";
        this.achieveDesc = "You've downvoted 100000 songs!";
        this.regDesc = "Earned after downvoting 100000 songs";
        break;

      case MedalE.VoteType.UpVotedTen:
        this.score = 1;
        this.name = "Beginner I";
        this.achieveDesc = "You've had your songs upvoted 10 times!";
        this.regDesc = "Earned after your songs have received 10 total upvotes";
        break;
      case MedalE.VoteType.UpVotedFifty:
        this.score = 5;
        this.name = "Beginner II";
        this.achieveDesc = "You've had your songs upvoted 50 times!";
        this.regDesc = "Earned after your songs have received 50 total upvotes";
        break;
      case MedalE.VoteType.UpVotedTwoHundred:
        this.score = 20;
        this.name = "Journeyman I";
        this.achieveDesc = "You've had your songs upvoted 200 times!";
        this.regDesc = "Earned after your songs have received 200 total upvotes";
        break;
      case MedalE.VoteType.UpVotedFiveHundred:
        this.score = 50;
        this.name = "Journeyman II";
        this.achieveDesc = "You've had your songs upvoted 500 times!";
        this.regDesc = "Earned after your songs have received 500 total upvotes";
        break;
      case MedalE.VoteType.UpVotedOneThousand:
        this.score = 100;
        this.name = "Commendable I";
        this.achieveDesc = "You've had your songs upvoted 1000 times!";
        this.regDesc = "Earned after your songs have received 1000 total upvotes";
        break;
      case MedalE.VoteType.UpVotedTwoThousand:
        this.name = "Commendable II";
        this.achieveDesc = "You've had your songs upvoted 2000 times!";
        this.regDesc = "Earned after your songs have received 2000 total upvotes";
        this.score = 150;
        break;
      case MedalE.VoteType.UpVotedFiveThousand:
        this.score = 250;
        this.name = "Revered Judgment I";
        this.achieveDesc = "You've had your songs upvoted 5000 times!";
        this.regDesc = "Earned after your songs have received 5000 total upvotes";
        break;
      case MedalE.VoteType.UpVotedTenThousand:
        this.score = 500;
        this.name = "Revered Judgment II";
        this.achieveDesc = "You've had your songs upvoted 10000 times!";
        this.regDesc = "Earned after your songs have received 10000 total upvotes";
        break;
      case MedalE.VoteType.UpVotedTwentyFiveThousand:
        this.score = 1000;
        this.name = "Critically Acclaimed I";
        this.achieveDesc = "You've had your songs upvoted 25000 times!";
        this.regDesc = "Earned after your songs have received 25000 total upvotes";
        break;
      case MedalE.VoteType.UpVotedFiftyThousand:
        this.score = 1500;
        this.name = "Critically Acclaimed II";
        this.achieveDesc = "You've had your songs upvoted 50000 times!";
        this.regDesc = "Earned after your songs have received 50000 total upvotes";
        break;
      case MedalE.VoteType.UpVotedOneHundredThousand:
        this.score = 2500;
        this.name = "Legendary Brilliance"
        this.achieveDesc = "You've had your songs upvoted 100000 times!";
        this.regDesc = "Earned after your songs have received 100000 total upvotes";
        break;

      case MedalE.VoteType.DownVotedTen:
        this.score = 1;
        this.name = "Nobody Is Perfect I";
        this.achieveDesc = "You've had your songs downvoted 10 times!...";
        this.regDesc = "Foreced upon after your songs have received 10 downvotes";
        break;
      case MedalE.VoteType.DownVotedFifty:
        this.score = 5;
        this.name = "Nobody Is Perfect II";
        this.achieveDesc = "You've had your songs downvoted 50 times!...";
        this.regDesc = "Foreced upon after your songs have received 50 downvotes";
        break;
      case MedalE.VoteType.DownVotedTwoHundred:
        this.score = 10;
        this.name = "Miscalculation I";
        this.achieveDesc = "You've had your songs downvoted 200 times!...";
        this.regDesc = "Foreced upon after your songs have received 200 downvotes";
        break;
      case MedalE.VoteType.DownVotedFiveHundred:
        this.score = 15;
        this.name = "Miscalculation II";
        this.achieveDesc = "You've had your songs downvoted 500 times!...";
        this.regDesc = "Foreced upon after your songs have received 50 downvotes";
        break;
      case MedalE.VoteType.DownVotedOneThousand:
        this.score = 20;
        this.name = "Don't Know My Audience I";
        this.achieveDesc = "You've had your songs downvoted 1000 times!...";
        this.regDesc = "Foreced upon after your songs have received 1000 downvotes";
        break;
      case MedalE.VoteType.DownVotedTwoThousand:
        this.score = -5;
        this.name = "Don't Know My Audience II";
        this.achieveDesc = "You've had your songs downvoted 2000 times!...";
        this.regDesc = "Foreced upon after your songs have received 2000 downvotes";
        break;
      case MedalE.VoteType.DownVotedFiveThousand:
        this.score = -20;
        this.name = "Poor Taste In Music I";
        this.achieveDesc = "You've had your songs downvoted 5000 times!...";
        this.regDesc = "Foreced upon after your songs have received 5000 downvotes";
        break;
      case MedalE.VoteType.DownVotedTenThousand:
        this.score = -50;
        this.name = "Poor Taste In Music II";
        this.achieveDesc = "You've had your songs downvoted 10000 times!...";
        this.regDesc = "Foreced upon after your songs have received 10000 downvotes";
        break;
      case MedalE.VoteType.DownVotedTwentyFiveThousand:
        this.score = -100;
        this.name = "Someone Doesn't Like Me I";
        this.achieveDesc = "You've had your songs downvoted 25000 times!...";
        this.regDesc = "Foreced upon after your songs have received 25000 downvotes";
        break;
      case MedalE.VoteType.DownVotedFiftyThousand:
        this.score = -500;
        this.name = "Someone Doesn't Like Me II";
        this.achieveDesc = "You've had your songs downvoted 50000 times!...";
        this.regDesc = "Foreced upon after your songs have received 50000 downvotes";
        break;
      case MedalE.VoteType.DownVotedOneHundredThousand:
        this.score = -2500;
        this.name = "Game Over";
        this.achieveDesc = "You've had your songs downvoted 100000 times!...";
        this.regDesc = "Foreced upon after your songs have received 100000 downvotes";
        break;

      case MedalE.VoteType.HubUpVoteTen:
        this.score = 1;
        this.name = "Gotta Start Somewhere I";
        this.achieveDesc = "This hubs' songs have received 10 upvotes!";
        this.regDesc = "Earned when hubs' songs have received 10 upvotes";
        break;
      case MedalE.VoteType.HubUpVoteFifty:
        this.score = 5;
        this.name = "Gotta Start Somewhere II";
        this.achieveDesc = "This hubs' songs have received 50 upvotes!";
        this.regDesc = "Earned when hubs' songs have received 50 upvotes";
        break;
      case MedalE.VoteType.HubUpVoteTwoHundred:
        this.score = 10;
        this.name = "Good Chemistry I";
        this.achieveDesc = "This hubs' songs have received 200 upvotes!";
        this.regDesc = "Earned when hubs' songs have received 200 upvotes";
        break;
      case MedalE.VoteType.HubUpVoteFiveHundred:
        this.score = 25;
        this.name = "Good Chemistry II";
        this.achieveDesc = "This hubs' songs have received 500 upvotes!";
        this.regDesc = "Earned when hubs' songs have received 500 upvotes";
        break;
      case MedalE.VoteType.HubUpVoteOneThousand:
        this.score = 50;
        this.name = "You Complete Me I";
        this.achieveDesc = "This hubs' songs have received 1000 upvotes!";
        this.regDesc = "Earned when hubs' songs have received 1000 upvotes";
        break;
      case MedalE.VoteType.HubUpVoteTwoThousand:
        this.score = 100;
        this.name = "You Complete Me II";
        this.achieveDesc = "This hubs' songs have received 2000 upvotes!";
        this.regDesc = "Earned when hubs' songs have received 2000 upvotes";
        break;
      case MedalE.VoteType.HubUpVoteFiveThousand:
        this.score = 250;
        this.name = "Match Made In Heaven I";
        this.achieveDesc = "This hubs' songs have received 5000 upvotes!";
        this.regDesc = "Earned when hubs' songs have received 5000 upvotes";
        break;
      case MedalE.VoteType.HubUpVoteTenThousand:
        this.score = 500;
        this.name = "Match Made In Heaven II";
        this.achieveDesc = "This hubs' songs have received 10000 upvotes!";
        this.regDesc = "Earned when hubs' songs have received 10000 upvotes";
        break;
      case MedalE.VoteType.HubUpVoteTwentyFiveThousand:
        this.score = 1000;
        this.name = "Ancestral Agreement I";
        this.achieveDesc = "This hubs' songs have received 25000 upvotes!";
        this.regDesc = "Earned when hubs' songs have received 25000 upvotes";
        break;
      case MedalE.VoteType.HubUpVoteFiftyThousand:
        this.score = 2000;
        this.name = "Ancestral Agreement II";
        this.achieveDesc = "This hubs' songs have received 50000 upvotes!";
        this.regDesc = "Earned when hubs' songs have received 50000 upvotes";
        break;
      case MedalE.VoteType.HubUpVoteOneHundredThousand:
        this.score = 5000;
        this.name = "King Of The Hill";
        this.achieveDesc = "This hubs' songs have received 100000 upvotes!";
        this.regDesc = "Earned when hubs' songs have received 100000 upvotes";
        break;

      case MedalE.VoteType.HubDownVoteTen:
        this.score = 1;
        this.name = "Debatable I";
        this.achieveDesc = "This hubs' songs have received 10 downvotes!";
        this.regDesc = "Forced up on after receiving 10 downvotes";
        break;
      case MedalE.VoteType.HubDownVoteFifty:
        this.score = 5;
        this.name = "Debatable II";
        this.achieveDesc = "This hubs' songs have received 50 downvotes!";
        this.regDesc = "Forced up on after receiving 50 downvotes";
        break;
      case MedalE.VoteType.HubDownVoteTwoHundred:
        this.score = 10;
        this.name = "Dispute I";
        this.achieveDesc = "This hubs' songs have received 200 downvotes!";
        this.regDesc = "Forced up on after receiving 200 downvotes";
        break;
      case MedalE.VoteType.HubDownVoteFiveHundred:
        this.score = 20;
        this.name = "Dispute II";
        this.achieveDesc = "This hubs' songs have received 500 downvotes!";
        this.regDesc = "Forced up on after receiving 500 downvotes";
        break;
      case MedalE.VoteType.HubDownVoteOneThousand:
        this.score = 50;
        this.name = "Why Can't We Just Get Along I";
        this.achieveDesc = "This hubs' songs have received 1000 downvotes!";
        this.regDesc = "Forced up on after receiving 1000 downvotes";
        break;
      case MedalE.VoteType.HubDownVoteTwoThousand:
        this.score = 100;
        this.name = "Why Can't We Just Get Along II";
        this.achieveDesc = "This hubs' songs have received 2000 downvotes!";
        this.regDesc = "Forced up on after receiving 2000 downvotes";
        break;
      case MedalE.VoteType.HubDownVoteFiveThousand:
        this.score = 150;
        this.name = "Are We Even Friends I";
        this.achieveDesc = "This hubs' songs have received 5000 downvotes!";
        this.regDesc = "Forced up on after receiving 5000 downvotes";
        break;
      case MedalE.VoteType.HubDownVoteTenThousand:
        this.score = 200;
        this.name = "Are We Even Friends II";
        this.achieveDesc = "This hubs' songs have received 10000 downvotes!";
        this.regDesc = "Forced up on after receiving 10000 downvotes";
        break;
      case MedalE.VoteType.HubDownVoteTwentyFiveThousand:
        this.score = 250;
        this.name = "Pieces Of Different Puzzles I";
        this.achieveDesc = "This hubs' songs have received 25000 downvotes!";
        this.regDesc = "Forced up on after receiving 25000 downvotes";
        break;
      case MedalE.VoteType.HubDownVoteFiftyThousand:
        this.score = 500;
        this.name = "Pieces Of Different Puzzles II";
        this.achieveDesc = "This hubs' songs have received 50000 downvotes!";
        this.regDesc = "Forced up on after receiving 50000 downvotes";
        break;
      case MedalE.VoteType.HubDownVoteOneHundredThousand:
        this.score = 1000;
        this.name = "Fire and Gasoline";
        this.achieveDesc = "This hubs' songs have received 100000 downvotes!";
        this.regDesc = "Forced up on after receiving 100000 downvotes";
        break;
    }
  }
}
