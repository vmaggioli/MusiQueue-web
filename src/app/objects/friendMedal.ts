import { MedalE } from '../enums/medalE';

export class FriendMedal {
  public id: number;
  public score: number;
  public name: string;
  public achieveDesc: string;
  public regDesc: string;


  constructor(type: MedalE.FriendType) {
    this.id = type;
    switch(type) {
      case MedalE.FriendType.One:
        this.score = 1;
        this.name = "Sociable I";
        this.achieveDesc = "You've aquired your first friend!";
        this.regDesc = "Earned after you've made 1 friend";
        break;
      case MedalE.FriendType.Ten:
        this.score = 5;
        this.name = "Sociable II";
        this.achieveDesc = "You've gained 10 friends!";
        this.regDesc = "Earned after you've made 10 friends";
        break;
      case MedalE.FriendType.TwentyFive:
        this.score = 10;
        this.name = "Friendly I";
        this.achieveDesc = "You've gained 25 friends!";
        this.regDesc = "Earned after you've made 25 friends";
        break;
      case MedalE.FriendType.Fifty:
        this.score = 25;
        this.name = "Friendly II";
        this.achieveDesc = "You've gained 50 friends!";
        this.regDesc = "Earned after you've made 50 friends";
        break;
      case MedalE.FriendType.OneHundred:
        this.score = 50;
        this.name = "Well-Known I";
        this.achieveDesc = "You've gained 100 friends!";
        this.regDesc = "Earned after you've made 100 friends";
        break;
      case MedalE.FriendType.TwoHundred:
        this.score = 75;
        this.name = "Well-Known II";
        this.achieveDesc = "You've gained 200 friends!";
        this.regDesc = "Earned after you've made 200 friends";
        break;
      case MedalE.FriendType.FiveHundred:
        this.score = 100;
        this.name = "Famous I";
        this.achieveDesc = "You've gained 500 friends!";
        this.regDesc = "Earned after you've made 500 friends";
        break;
      case MedalE.FriendType.OneThousand:
        this.score = 200;
        this.name = "Famous II";
        this.achieveDesc = "You've gained 1000 friends!";
        this.regDesc = "Earned after you've made 1000 friends";
        break;
      case MedalE.FriendType.TwoTHousand:
        this.score = 250;
        this.name = "Distinguished Prominence I";
        this.achieveDesc = "You've gained 2000 friends!";
        this.regDesc = "Earned after you've made 2000 friends";
        break;
      case MedalE.FriendType.FiveThousand:
        this.score = 500;
        this.name = "Distinguished Prominence II";
        this.achieveDesc = "You've gained 5000 friends!";
        this.regDesc = "Earned after you've made 5000 friends";
        break;
      case MedalE.FriendType.TenThousand:
        this.score = 1000;
        this.name = "Gloriously Notorious I";
        this.achieveDesc = "You've gained 10000 friends!";
        this.regDesc = "Earned after you've made 10000 friends";
        break;
      case MedalE.FriendType.FiftyThousand:
        this.score = 5000;
        this.name = "Gloriously Notorious II";
        this.achieveDesc = "You've gained 50000 friends!";
        this.regDesc = "Earned after you've made 50000 friends";
        break;
      case MedalE.FriendType.OneHundredThousand:
        this.score = 10000;
        this.name = "Every Day Is My Birthday";
        this.achieveDesc = "You've gained 100000 friends!";
        this.regDesc = "Earned after you've made 100000 friends";
        break;
    }
  }
}
