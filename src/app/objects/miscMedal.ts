import { MedalE } from '../enums/medalE';

export class MiscMedal {
  public id: number;
  public score: number;
  public name: string;
  public achieveDesc: string;
  public regDesc: string;

  constructor(type: MedalE.MiscellaneousType) {
    this.id = type;
    switch(type) {
        case MedalE.MiscellaneousType.AdminIsFriend:
          this.score = 1000;
          this.name = "VIP";
          this.achieveDesc = "You've become a friend of the Administrator!";
          this.regDesc = "Earned after becoming friends with the Administrator";
          break;
        case MedalE.MiscellaneousType.AdminIsMember:
          this.score = 1000;
          this.name = "Exclusive Hub";
          this.achieveDesc = "The Administrator has joined your hub!";
          this.regDesc = "Earned when the Administrator joins one of your hubs";
          break;
        case MedalE.MiscellaneousType.AdminIsOwner:
          this.score = 1000;
          this.name = "Exclusive Pass"
          this.achieveDesc = "The Administrator has added you to one of his hubs!";
          this.regDesc = "Earned when the Administrator adds you to one of his hubs";
          break;
    }
  }
}
