import { MedalE } from '../enums/medalE';

export class CountMedal {
  public id: number;
  public score: number;
  public name: string;

  constructor(type: MedalE.CountType) {
    this.id = type;
    switch(type) {
      case MedalE.CountType.UserMedalCountTen:
        this.score = 20;
        this.name = "Student";
        break;
      case MedalE.CountType.UserMedalCountTwentyFive:
        this.score = 50;
        this.name = "Aprentice]";
        break;
      case MedalE.CountType.UserMedalCountFifty:
        this.score = 200;
        this.name = "Journeyman";
        break;
      case MedalE.CountType.UserMedalCountOneHundred:
        this.score = 1000;
        this.name = "Master";
        break;

      case MedalE.CountType.HubMedalCountTen:
        this.score = 1;
        this.name = "Apprentice";
        break;
      case MedalE.CountType.HubMedalCountTwentyFive:
        this.score = 5;
        this.name = "Initiated";
        break;
      case MedalE.CountType.HubMedalCountFifty:
        this.score = 10;
        this.name = "Trained";
        break;
      case MedalE.CountType.HubMedalCountOneHundred:
        this.score = 25;
        this.name = "Competent";
        break;
      case MedalE.CountType.HubMedalCountFiveHundred:
        this.score = 50;
        this.name = "Adept";
        break;
      case MedalE.CountType.HubMedalCountOneThousand:
        this.score = 100;
        this.name = "Experienced";
        break;
      case MedalE.CountType.HubMedalCountTwoThousand:
        this.score = 500;
        this.name = "Proficient";
        break;
      case MedalE.CountType.HubMedalCountFiveThousand:
        this.score = 1000;
        this.name = "Specialist";
        break;
      case MedalE.CountType.HubMedalCountTenThousand:
        this.score = 5000;
        this.name = "Inspiring";
        break;
    }
  }
}
