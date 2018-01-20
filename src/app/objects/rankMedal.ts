import { MedalE } from '../enums/medalE';

export class RankMedal {
  public id: number;
  public score: number;
  public name: string;
  public achieveDesc: string;
  public regDesc: string;

  constructor(type: MedalE.RankType) {
    this.id = type;
    switch(type) {
      case MedalE.RankType.UserOneHundred:
        this.score = 25;
        this.name = "Centurion";
        this.achieveDesc = "You've made it in the top 100 Users!";
        this.regDesc = "Earned after making the top 100 Users list";
        break;
      case MedalE.RankType.UserFifty:
        this.score = 50;
        this.name = "Golden";
        this.achieveDesc = "You've made it in the top 50 Users!";
        this.regDesc = "Earned after making the top 50 Users list";
        break;
      case MedalE.RankType.UserTwentyFive:
        this.score = 100;
        this.name = "Jubilee";
        this.achieveDesc = "You've made it in the top 25 Users!";
        this.regDesc = "Earned after making the top 25 Users list";
        break;
      case MedalE.RankType.UserTen:
        this.score = 250;
        this.name = "Tin Man";
        this.achieveDesc = "You've made it in the top 10 Users!";
        this.regDesc = "Earned after making the top 10 Users list";
        break;
      case MedalE.RankType.UserThree:
        this.score = 500;
        this.name = "Magic Man";
        this.achieveDesc = "You've made it in the top 3 Users!";
        this.regDesc = "Earned after making the top 3 Users list";
        break;
      case MedalE.RankType.UserOne:
        this.score = 1000;
        this.name = "Champion";
        this.achieveDesc = "You've made it in the top 1 Users!";
        this.regDesc = "Earned after making the top 1 Users list";
        break;

      case MedalE.RankType.HubMemberOneHundred:
        this.score = 10;
        this.name = "Centurion Hub Member";
        this.achieveDesc = "You're apart of a hub that just made it to the top 100!";
        this.regDesc = "Earned when a hub you are apart of makes it to the top 100";
        break;
      case MedalE.RankType.HubMemberFifty:
        this.score = 25;
        this.name = "Golden Hub Member";
        this.achieveDesc = "You're apart of a hub that just made it to the top 50!";
        this.regDesc = "Earned when a hub you are apart of makes it to the top 50";
        break;
      case MedalE.RankType.HubMemberTwentyFive:
        this.score = 50;
        this.name = "Jubilee Hub Member";
        this.achieveDesc = "You're apart of a hub that just made it to the top 25!";
        this.regDesc = "Earned when a hub you are apart of makes it to the top 25";
        break;
      case MedalE.RankType.HubMemberTen:
        this.score = 100;
        this.name = "Tin Hub Member";
        this.achieveDesc = "You're apart of a hub that just made it to the top 10!";
        this.regDesc = "Earned when a hub you are apart of makes it to the top 10";
        break;
      case MedalE.RankType.HubMemberThree:
        this.score = 250;
        this.name = "Magic Hub Member";
        this.achieveDesc = "You're apart of a hub that just made it to the top 3!";
        this.regDesc = "Earned when a hub you are apart of makes it to the top 3";
        break;
      case MedalE.RankType.HubMemberOne:
        this.score = 500;
        this.name = "Champion Hub Member";
        this.achieveDesc = "You're apart of a hub that just made it to the top 1!"
        this.regDesc = "Earned when a hub you are apart of makes it to the top 1";;
        break;

      case MedalE.RankType.HubOwnerOneHundred:
        this.score = 50;
        this.name = "Centurion Leader";
        this.achieveDesc = "You created a hub that just made it to the top 100!";
        this.regDesc = "Earned when a hub you own makes it to the top 100";
        break;
      case MedalE.RankType.HubOwnerFifty:
        this.score = 100;
        this.name = "Golden Leader";
        this.achieveDesc = "You created a hub that just made it to the top 50!";
        this.regDesc = "Earned when a hub you own makes it to the top 50";
        break;
      case MedalE.RankType.HubOwnerTwentyFive:
        this.score = 250;
        this.name = "Jubilee Leader";
        this.achieveDesc = "You created a hub that just made it to the top 25!";
        this.regDesc = "Earned when a hub you own makes it to the top 25";
        break;
      case MedalE.RankType.HubOwnerTen:
        this.score = 500;
        this.name = "Tin Leader";
        this.achieveDesc = "You created a hub that just made it to the top 10!";
        this.regDesc = "Earned when a hub you own makes it to the top 10";
        break;
      case MedalE.RankType.HubOwnerThree:
        this.score = 1000;
        this.name = "Magic Leader";
        this.achieveDesc = "You created a hub that just made it to the top 3!";
        this.regDesc = "Earned when a hub you own makes it to the top 3";
        break;
      case MedalE.RankType.HubOwnerOne:
        this.score = 2500;
        this.name = "Champion Leader";
        this.achieveDesc = "You created a hub that just made it to the top 1!";
        this.regDesc = "Earned when a hub you own makes it to the top 1";
        break;

      case MedalE.RankType.HubOneHundred:
        this.score = 10;
        this.name = "Centurion Hub";
        this.achieveDesc = "Your Hub made it to the top 100!";
        this.regDesc = "Eaned when your Hub makes it to the top 100";
        break;
      case MedalE.RankType.HubFifty:
        this.score = 25;
        this.name = "Golden Hub";
        this.achieveDesc = "Your Hub made it to the top 50!";
        this.regDesc = "Eaned when your Hub makes it to the top 50";
        break;
      case MedalE.RankType.HubTwentyFive:
        this.score = 50;
        this.name = "Jubilee Hub";
        this.achieveDesc = "Your Hub made it to the top 25!";
        this.regDesc = "Eaned when your Hub makes it to the top 25";
        break;
      case MedalE.RankType.HubTen:
        this.score = 100;
        this.name = "Tin Hub";
        this.achieveDesc = "Your Hub made it to the top 10!";
        this.regDesc = "Eaned when your Hub makes it to the top 10";
        break;
      case MedalE.RankType.HubThree:
        this.score = 250;
        this.name = "Magic Hub";
        this.achieveDesc = "Your Hub made it to the top 3!";
        this.regDesc = "Eaned when your Hub makes it to the top 3";
        break;
      case MedalE.RankType.HubOne:
        this.score = 500;
        this.name = "Champion Hub";
        this.achieveDesc = "Your Hub made it to the top 1!";
        this.regDesc = "Eaned when your Hub makes it to the top 1";
        break;
    }
  }
}
