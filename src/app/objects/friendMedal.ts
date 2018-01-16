import { MedalE } from '../enums/medalE';

export class FriendMedal {
  public id: number;
  public score: number;
  public name: string;

  constructor(type: MedalE.FriendType) {
    this.id = type;
    switch(type) {
      case MedalE.FriendType.One:
        this.score = 1;
        this.name = "Sociable I";
        break;
      case MedalE.FriendType.Ten:
        this.score = 5;
        this.name = "Sociable II";
        break;
      case MedalE.FriendType.TwentyFive:
        this.score = 10;
        this.name = "Friendly I";
        break;
      case MedalE.FriendType.Fifty:
        this.score = 25;
        this.name = "Friendly II";
        break;
      case MedalE.FriendType.OneHundred:
        this.score = 50;
        this.name = "Well-Known I";
        break;
      case MedalE.FriendType.TwoHundred:
        this.score = 75;
        this.name = "Well-Known II";
        break;
      case MedalE.FriendType.FiveHundred:
        this.score = 100;
        this.name = "Famous I";
        break;
      case MedalE.FriendType.OneThousand:
        this.score = 200;
        this.name = "Famous II";
        break;
      case MedalE.FriendType.TwoTHousand:
        this.score = 250;
        this.name = "Distinguished Prominence I";
        break;
      case MedalE.FriendType.FiveThousand:
        this.score = 500;
        this.name = "Distinguished Prominence II";
        break;
      case MedalE.FriendType.TenThousand:
        this.score = 1000;
        this.name = "Gloriously Notorious I";
        break;
      case MedalE.FriendType.FiftyThousand:
        this.score = 5000;
        this.name = "Gloriously Notorious II";
        break;
      case MedalE.FriendType.OneHundredThousand:
        this.score = 10000;
        this.name = "Every Day Is My Birthday";
        break;
    }
  }
}
