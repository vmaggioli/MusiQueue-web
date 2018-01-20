import { MedalE } from '../enums/medalE';

export class CountMedal {
  public id: number;
  public score: number;
  public name: string;
  public achieveDesc: string;
  public regDesc: string;

  constructor(type: MedalE.CountType) {
    this.id = type;
    switch(type) {
      case MedalE.CountType.UserMedalCountTen:
        this.score = 20;
        this.name = "Student";
        this.achieveDesc = "You've earned 10 Medals!";
        this.regDesc = "Earned after gaining 10 Medals";
        break;
      case MedalE.CountType.UserMedalCountTwentyFive:
        this.score = 50;
        this.name = "Aprentice";
        this.achieveDesc = "You've earned 25 Medals!";
        this.regDesc = "Earned after gaining 25 Medals";
        break;
      case MedalE.CountType.UserMedalCountFifty:
        this.score = 200;
        this.name = "Journeyman";
        this.achieveDesc = "You've earned 50 Medals!";
        this.regDesc = "Earned after gaining 50 Medals";
        break;
      case MedalE.CountType.UserMedalCountOneHundred:
        this.score = 1000;
        this.name = "Master";
        this.achieveDesc = "You've earned 100 Medals!";
        this.regDesc = "Earned after gaining 100 Medals";
        break;

      case MedalE.CountType.HubMedalCountTen:
        this.score = 1;
        this.name = "Apprentice";
        this.achieveDesc = "A hub you are a part of has earned 10 Medals!"
        this.regDesc = "Earned after a hub you are a part of gains 10 Medals";
        this.subDesc = "Hub: ";
        break;
      case MedalE.CountType.HubMedalCountTwentyFive:
        this.score = 5;
        this.name = "Initiated";
        this.achieveDesc = "A hub you are a part of has earned 25 Medals!"
        this.regDesc = "Earned after a hub you are a part of gains 25 Medals";
        this.subDesc = "Hub: ";
        break;
      case MedalE.CountType.HubMedalCountFifty:
        this.score = 10;
        this.name = "Trained";
        this.achieveDesc = "A hub you are a part of has earned 50 Medals!"
        this.regDesc = "Earned after a hub you are a part of gains 50 Medals";
        this.subDesc = "Hub: ";
        break;
      case MedalE.CountType.HubMedalCountOneHundred:
        this.score = 25;
        this.name = "Competent";
        this.achieveDesc = "A hub you are a part of has earned 100 Medals!"
        this.regDesc = "Earned after a hub you are a part of gains 100 Medals";
        this.subDesc = "Hub: ";
        break;
      case MedalE.CountType.HubMedalCountFiveHundred:
        this.score = 50;
        this.name = "Adept";
        this.achieveDesc = "A hub you are a part of has earned 500 Medals!"
        this.regDesc = "Earned after a hub you are a part of gains 500 Medals";
        this.subDesc = "Hub: ";
        break;
      case MedalE.CountType.HubMedalCountOneThousand:
        this.score = 100;
        this.name = "Experienced";
        this.achieveDesc = "A hub you are a part of has earned 1000 Medals!"
        this.regDesc = "Earned after a hub you are a part of gains 1000 Medals";
        this.subDesc = "Hub: ";
        break;
      case MedalE.CountType.HubMedalCountTwoThousand:
        this.score = 500;
        this.name = "Proficient";
        this.achieveDesc = "A hub you are a part of has earned 2000 Medals!"
        this.regDesc = "Earned after a hub you are a part of gains 2000 Medals";
        this.subDesc = "Hub: ";
        break;
      case MedalE.CountType.HubMedalCountFiveThousand:
        this.score = 1000;
        this.name = "Specialist";
        this.achieveDesc = "A hub you are a part of has earned 5000 Medals!"
        this.regDesc = "Earned after a hub you are a part of gains 5000 Medals";
        this.subDesc = "Hub: ";
        break;
      case MedalE.CountType.HubMedalCountTenThousand:
        this.score = 5000;
        this.name = "Inspiring";
        this.achieveDesc = "A hub you are a part of has earned 10000 Medals!"
        this.regDesc = "Earned after a hub you are a part of gains 10000 Medals";
        this.subDesc = "Hub: ";
        break;
    }
  }
}
