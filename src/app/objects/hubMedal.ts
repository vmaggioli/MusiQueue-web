import { MedalE } from '../enums/medalE';

export class HubMedal {
  public id: number;
  public score: number;
  public name: string;
  public achieveDesc: string;
  public regDesc: string;

  constructor(type: MedalE.HubType) {
    this.id = type;
    switch(type) {
      case MedalE.HubType.OwnedOne:
        this.score = 1;
        this.name = "Yeoman";
        this.achieveDesc = "You've created your first Hub!";
        this.regDesc = "Earned after creating 1 Hub";
        break;
      case MedalE.HubType.OwnedFive:
        this.score = 10;
        this.name = "Clan Leader"
        this.achieveDesc = "You've created 5 Hubs!";
        this.regDesc = "Earned after creating 5 Hubs";
        break;
      case MedalE.HubType.OwnedTen:
        this.score = 25;
        this.name = "City Mayor";
        this.achieveDesc = "You've created 10 Hubs!";
        this.regDesc = "Earned after creating 10 Hubs";
        break;
      case MedalE.HubType.OwnedTwentyFive:
        this.score = 50;
        this.name = "State Governor";
        this.achieveDesc = "You've created 25 Hubs!";
        this.regDesc = "Earned after creating 25 Hubs";
        break;
      case MedalE.HubType.OwnedFifty:
        this.score = 100;
        this.name = "President";
        this.achieveDesc = "You've created 50 Hubs!";
        this.regDesc = "Earned after creating 50 Hubs";
        break;
      case MedalE.HubType.OwnedOneHundred:
        this.score = 108;
        this.name = "Nuisance"
        this.achieveDesc = "You've created 100 Hubs!";
        this.regDesc = "Earned after creating 100 Hubs";
        break;

      case MedalE.HubType.JoinedOne:
        this.score = 1;
        this.name = "Member";
        this.achieveDesc = "You've joined your first Hub!";
        this.regDesc = "Earned after joining your first Hub";
        break;
      case MedalE.HubType.JoinedFive:
        this.score = 5;
        this.name = "Backpacker";
        this.achieveDesc = "You've joined 5 Hubs!";
        this.regDesc = "Earned after joining 5 Hubs";
        break;
      case MedalE.HubType.JoinedTen:
        this.score = 10;
        this.name = "Commuter";
        this.achieveDesc = "You've joined 10 Hubs!";
        this.regDesc = "Earned after joining 10 Hubs";
        break;
      case MedalE.HubType.JoinedTwentyFive:
        this.score = 25;
        this.name = "Explorer";
        this.achieveDesc = "You've joined 25 Hubs!";
        this.regDesc = "Earned after joining 25 Hubs";
        break;
      case MedalE.HubType.JoinedFifty:
        this.score = 50;
        this.name = "Globe Trotter";
        this.achieveDesc = "You've joined 50 Hubs!";
        this.regDesc = "Earned after joining 50 Hubs";
        break;
      case MedalE.HubType.JoinedOneHundred:
        this.score = 100;
        this.name = "Couch Surfer";
        this.achieveDesc = "You've joined 100 Hubs!";
        this.regDesc = "Earned after joining 100 Hubs";
        break;

      case MedalE.HubType.SizeTwo:
        this.score = 1;
        this.name = "Friendship";
        this.achieveDesc = "You're hub gained 2 Members!";
        this.regDesc = "Earned when your hub has 2 Members";
        break;
      case MedalE.HubType.SizeTen:
        this.score = 5;
        this.name = "Family";
        this.achieveDesc = "You're hub gained 10 Members!";
        this.regDesc = "Earned when your hub has 10 Members";
        break;
      case MedalE.HubType.SizeTwentyFive:
        this.score = 15;
        this.name = "Village";
        this.achieveDesc = "You're hub gained 25 Members!";
        this.regDesc = "Earned when your hub has 25 Members";
        break;
      case MedalE.HubType.SizeFifty:
        this.score = 30
        this.name = "Town";
        this.achieveDesc = "You're hub gained 50 Members!";
        this.regDesc = "Earned when your hub has 50 Members";
        break;
      case MedalE.HubType.SizeOneHundred:
        this.score = 75;
        this.name = "City";
        this.achieveDesc = "You're hub gained 100 Members!";
        this.regDesc = "Earned when your hub has 100 Members";
        break;
      case MedalE.HubType.SizeTwoHundred:
        this.score = 150;
        this.name = "Metropolis";
        this.achieveDesc = "You're hub gained 200 Members!";
        this.regDesc = "Earned when your hub has 200 Members";
        break;
      case MedalE.HubType.SizeFiveHundred:
        this.score = 300;
        this.name = "Megalopolis";
        this.achieveDesc = "You're hub gained 500 Members!";
        this.regDesc = "Earned when your hub has 500 Members";
        break;
      case MedalE.HubType.SizeOneThousand:
        this.score = 750;
        this.name = "Country";
        this.achieveDesc = "You're hub gained 1000 Members!";
        this.regDesc = "Earned when your hub has 1000 Members";
        break;
    }
  }
