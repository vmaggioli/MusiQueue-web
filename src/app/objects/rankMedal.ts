import { MedalE } from '../enums/medalE';

export class RankMedal {
  public id: number;
  public score: number;
  public name: string;

  constructor(type: MedalE.RankType) {
    this.id = type;
    switch(type) {
      case MedalE.RankType.UserOneHundred:
        this.score = 25;
        this.name = "Centurion";
        break;
      case MedalE.RankType.UserFifty:
        this.score = 50;
        this.name = "Golden";
        break;
      case MedalE.RankType.UserTwentyFive:
        this.score = 100;
        this.name = "Jubilee";
        break;
      case MedalE.RankType.UserTen:
        this.score = 250;
        this.name = "Tin Man";
        break;
      case MedalE.RankType.UserThree:
        this.score = 500;
        this.name = "Magic Man";
        break;
      case MedalE.RankType.UserOne:
        this.score = 1000;
        this.name = "Champion";
        break;

      case MedalE.RankType.HubMemberOneHundred:
        this.score = 10;
        this.name = "Centurion Hub Member";
        break;
      case MedalE.RankType.HubMemberFifty:
        this.score = 25;
        this.name = "Golden Hub Member";
        break;
      case MedalE.RankType.HubMemberTwentyFive:
        this.score = 50;
        this.name = "Jubilee Hub Member";
        break;
      case MedalE.RankType.HubMemberTen:
        this.score = 100;
        this.name = "Tin Hub Member";
        break;
      case MedalE.RankType.HubMemberThree:
        this.score = 250;
        this.name = "Magic Hub Member";
        break;
      case MedalE.RankType.HubMemberOne:
        this.score = 500;
        this.name = "Champion Hub Member";
        break;

      case MedalE.RankType.HubOwnerOneHundred:
        this.score = 50;
        this.name = "Centurion Leader";
        break;
      case MedalE.RankType.HubOwnerFifty:
        this.score = 100;
        this.name = "Golden Leader";
        break;
      case MedalE.RankType.HubOwnerTwentyFive:
        this.score = 250;
        this.name = "Jubilee Leader";
        break;
      case MedalE.RankType.HubOwnerTen:
        this.score = 500;
        this.name = "Tin Leader";
        break;
      case MedalE.RankType.HubOwnerThree:
        this.score = 1000;
        this.name = "Magic Leader";
        break;
      case MedalE.RankType.HubOwnerOne:
        this.score = 2500;
        this.name = "Champion Leader";
        break;

      case MedalE.RankType.HubOneHundred:
        this.score = 10;
        this.name = "Centurion Hub";
        break;
      case MedalE.RankType.HubFifty:
        this.score = 25;
        this.name = "Golden Hub";
        break;
      case MedalE.RankType.HubTwentyFive:
        this.score = 50;
        this.name = "Jubilee Hub";
        break;
      case MedalE.RankType.HubTen:
        this.score = 100;
        this.name = "Tin Hub";
        break;
      case MedalE.RankType.HubThree:
        this.score = 250;
        this.name = "Magic Hub";
        break;
      case MedalE.RankType.HubOne:
        this.score = 500;
        this.name = "Champion Hub";
        break;
    }
  }
}
