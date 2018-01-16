import { MedalE } from '../enums/medalE';

export class VoteMedal {
  public id: number;
  public score: number;
  public name: string;

  constructor(type: MedalE.VoteType) {
    this.id = type;

    switch(type) {
      case MedalE.VoteType.UpVoterTen:
        this.score = 1;
        this.name = "Novice I";
        break;
      case MedalE.VoteType.UpVoterFifty:
        this.score = 5;
        this.name = "Novice II";
        break;
      case MedalE.VoteType.UpVoterTwoHundred:
        this.score = 20;
        this.name = "Journeyman I";
        break;
      case MedalE.VoteType.UpVoterFiveHundred:
        this.score = 50;
        this.name = "Journeyman II";
        break;
      case MedalE.VoteType.UpVoterOneThousand:
        this.score = 100;
        this.name = "Instrumental Proficiency I";
        break;
      case MedalE.VoteType.UpVoterTwoThousand:
        this.score = 150;
        this.name = "Instrumental Proficiency II";
        break;
      case MedalE.VoteType.UpVoterFiveThousand:
        this.score = 250;
        this.name = "Musical Reverer I";
        break;
      case MedalE.VoteType.UpVoterTenThousand:
        this.score = 500;
        this.name = "Musical Reverer II";
        break;
      case MedalE.VoteType.UpVoterTwentyFiveThousand:
        this.score = 1000;
        this.name = "Optimist I";
        break;
      case MedalE.VoteType.UpVoterFiftyThousand:
        this.score = 1500;
        this.name = "Optimist II";
        break;
      case MedalE.VoteType.UpVoterOneHundredThousand:
        this.score = 2500;
        this.name = "Musical Samaritan";
        break;

      case MedalE.VoteType.DownVoterTen:
        this.score = 1;
        this.name = "Objectively Insightful I";
        break;
      case MedalE.VoteType.DownVoterFifty:
        this.score = 5;
        this.name = "Objectively Insightful II";
        break;
      case MedalE.VoteType.DownVoterTwoHundred:
        this.score = 10;
        this.name = "Tough Love I";
        break;
      case MedalE.VoteType.DownVoterFiveHundred:
        this.score = 20;
        this.name = "Tough Love II";
        break;
      case MedalE.VoteType.DownVoterOneThousand:
        this.score = 50;
        this.name = "Brazenly Candid I";
        break;
      case MedalE.VoteType.DownVoterTwoThousand:
        this.score = 100;
        this.name = "Brazenly Candid II";
        break;
      case MedalE.VoteType.DownVoterFiveThousand:
        this.score = 200;
        this.name = "Cocksure I";
        break;
      case MedalE.VoteType.DownVoterTenThousand:
        this.score = 250;
        this.name = "Cocksure II";
        break;
      case MedalE.VoteType.DownVoterTwentyFiveThousand:
        this.score = 300;
        this.name = "Pesimist I";
        break;
      case MedalE.VoteType.DownVoterFiftyThousand:
        this.score = 400;
        this.name = "Pesimist II";
        break;
      case MedalE.VoteType.DownVoterOneHundredThousand:
        this.score = 500;
        this.name = "Musical Satanist";
        break;

      case MedalE.VoteType.UpVotedTen:
        this.score = 1;
        this.name = "Beginner I";
        break;
      case MedalE.VoteType.UpVotedFifty:
        this.score = 5;
        this.name = "Beginner II";
        break;
      case MedalE.VoteType.UpVotedTwoHundred:
        this.score = 20;
        this.name = "Journeyman I";
        break;
      case MedalE.VoteType.UpVotedFiveHundred:
        this.score = 50;
        this.name = "Journeyman II";
        break;
      case MedalE.VoteType.UpVotedOneThousand:
        this.score = 100;
        this.name = "Commendable I";
        break;
      case MedalE.VoteType.UpVotedTwoThousand:
        this.name = "Commendable II";
        this.score = 150;
        break;
      case MedalE.VoteType.UpVotedFiveThousand:
        this.score = 250;
        this.name = "Revered Judgment I";
        break;
      case MedalE.VoteType.UpVotedTenThousand:
        this.score = 500;
        this.name = "Revered Judgment II";
        break;
      case MedalE.VoteType.UpVotedTwentyFiveThousand:
        this.score = 1000;
        this.name = "Critically Acclaimed I";
        break;
      case MedalE.VoteType.UpVotedFiftyThousand:
        this.score = 1500;
        this.name = "Critically Acclaimed II";
        break;
      case MedalE.VoteType.UpVotedOneHundredThousand:
        this.score = 2500;
        this.name = "Legendary Brilliance"
        break;

      case MedalE.VoteType.DownVotedTen:
        this.score = 1;
        this.name = "Nobody Is Perfect I";
        break;
      case MedalE.VoteType.DownVotedFifty:
        this.score = 5;
        this.name = "Nobody Is Perfect II";
        break;
      case MedalE.VoteType.DownVotedTwoHundred:
        this.score = 10;
        this.name = "Miscalculation I";
        break;
      case MedalE.VoteType.DownVotedFiveHundred:
        this.score = 15;
        this.name = "Miscalculation II";
        break;
      case MedalE.VoteType.DownVotedOneThousand:
        this.score = 20;
        this.name = "Don't Know My Audience I";
        break;
      case MedalE.VoteType.DownVotedTwoThousand:
        this.score = -5;
        this.name = "Don't Know My Audience II";
        break;
      case MedalE.VoteType.DownVotedFiveThousand:
        this.score = -20;
        this.name = "Poor Taste In Music I";
        break;
      case MedalE.VoteType.DownVotedTenThousand:
        this.score = -50;
        this.name = "Poor Taste In Music II";
        break;
      case MedalE.VoteType.DownVotedTwentyFiveThousand:
        this.score = -100;
        this.name = "Someone Doesn't Like Me I";
        break;
      case MedalE.VoteType.DownVotedFiftyThousand:
        this.score = -500;
        this.name = "Someone Doesn't Like Me II";
        break;
      case MedalE.VoteType.DownVotedOneHundredThousand:
        this.score = -2500;
        this.name = "Game Over";
        break;

      case MedalE.VoteType.HubUpVoteTen:
        this.score = 1;
        this.name = "Gotta Start Somewhere I";
        break;
      case MedalE.VoteType.HubUpVoteFifty:
        this.score = 5;
        this.name = "Gotta Start Somewhere II";
        break;
      case MedalE.VoteType.HubUpVoteTwoHundred:
        this.score = 10;
        this.name = "Good Chemistry I";
        break;
      case MedalE.VoteType.HubUpVoteFiveHundred:
        this.score = 25;
        this.name = "Good Chemistry II";
        break;
      case MedalE.VoteType.HubUpVoteOneThousand:
        this.score = 50;
        this.name = "You Complete Me I";
        break;
      case MedalE.VoteType.HubUpVoteTwoThousand:
        this.score = 100;
        this.name = "You Complete Me II";
        break;
      case MedalE.VoteType.HubUpVoteFiveThousand:
        this.score = 250;
        this.name = "Match Made In Heaven I";
        break;
      case MedalE.VoteType.HubUpVoteTenThousand:
        this.score = 500;
        this.name = "Match Made In Heaven II";
        break;
      case MedalE.VoteType.HubUpVoteTwentyFiveThousand:
        this.score = 1000;
        this.name = "Ancestral Agreement I";
        break;
      case MedalE.VoteType.HubUpVoteFiftyThousand:
        this.score = 2000;
        this.name = "Ancestral Agreement II";
        break;
      case MedalE.VoteType.HubUpVoteOneHundredThousand:
        this.score = 5000;
        this.name = "King Of The Hill";
        break;

      case MedalE.VoteType.HubDownVoteTen:
        this.score = 1;
        this.name = "Debatable I";
        break;
      case MedalE.VoteType.HubDownVoteFifty:
        this.score = 5;
        this.name = "Debatable II";
        break;
      case MedalE.VoteType.HubDownVoteTwoHundred:
        this.score = 10;
        this.name = "Dispute I";
        break;
      case MedalE.VoteType.HubDownVoteFiveHundred:
        this.score = 20;
        this.name = "Dispute II";
        break;
      case MedalE.VoteType.HubDownVoteOneThousand:
        this.score = 50;
        this.name = "Why Can't We Just Get Along I";
        break;
      case MedalE.VoteType.HubDownVoteTwoThousand:
        this.score = 100;
        this.name = "Why Can't We Just Get Along II";
        break;
      case MedalE.VoteType.HubDownVoteFiveThousand:
        this.score = 150;
        this.name = "Are We Even Friends I";
        break;
      case MedalE.VoteType.HubDownVoteTenThousand:
        this.score = 200;
        this.name = "Are We Even Friends II";
        break;
      case MedalE.VoteType.HubDownVoteTwentyFiveThousand:
        this.score = 250;
        this.name = "Pieces Of Different Puzzles I";
        break;
      case MedalE.VoteType.HubDownVoteFiftyThousand:
        this.score = 500;
        this.name = "Pieces Of Different Puzzles II";
        break;
      case MedalE.VoteType.HubDownVoteOneHundredThousand:
        this.score = 1000;
        this.name = "Fire and Gasoline";
        break;
    }
  }
}
