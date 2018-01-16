import { MedalE } from '../enums/medalE';

export class HubMedal {
  public id: number;
  public score: number;
  public name: string;

  constructor(type: MedalE.HubType) {
    this.id = type;
    switch(type) {
      case MedalE.HubType.OwnedOne:
        this.score = 1;
        this.name = "Yeoman";
        break;
      case MedalE.HubType.OwnedFive:
        this.score = 10;
        this.name = "Clan Leader"
        break;
      case MedalE.HubType.OwnedTen:
        this.score = 25;
        this.name = "City Mayor";
        break;
      case MedalE.HubType.OwnedTwentyFive:
        this.score = 50;
        this.name = "State Governor";
        break;
      case MedalE.HubType.OwnedFifty:
        this.score = 100;
        this.name = "President";
        break;
      case MedalE.HubType.OwnedOneHundred:
        this.score = 108;
        this.name = "Nuisance"
        break;

      case MedalE.HubType.JoinedOne:
        this.score = 1;
        this.name = "Member";
        break;
      case MedalE.HubType.JoinedFive:
        this.score = 5;
        this.name = "Backpacker";
        break;
      case MedalE.HubType.JoinedTen:
        this.score = 10;
        this.name = "Commuter";
        break;
      case MedalE.HubType.JoinedTwentyFive:
        this.score = 25;
        this.name = "Explorer";
        break;
      case MedalE.HubType.JoinedFifty:
        this.score = 50;
        this.name = "Globe Trotter";
        break;
      case MedalE.HubType.JoinedOneHundred:
        this.score = 100;
        this.name = "Couch Surfer";
        break;

      case MedalE.HubType.SizeTwo:
        this.score = 1;
        this.name = "Friendship";
        break;
      case MedalE.HubType.SizeTen:
        this.score = 5;
        this.name = "Family";
        break;
      case MedalE.HubType.SizeTwentyFive:
        this.score = 15;
        this.name = "Village";
        break;
      case MedalE.HubType.SizeFifty:
        this.score = 30
        this.name = "Town";
        break;
      case MedalE.HubType.SizeOneHundred:
        this.score = 75;
        this.name = "City";
        break;
      case MedalE.HubType.SizeTwoHundred:
        this.score = 150;
        this.name = "Metropolis";
        break;
      case MedalE.HubType.SizeFiveHundred:
        this.score = 300;
        this.name = "Megalopolis";
        break;
      case MedalE.HubType.SizeOneThousand:
        this.score = 750;
        this.name = "Country";
        break;
    }
  }
