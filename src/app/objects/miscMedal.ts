import { MedalE } from '../enums/medalE';

export class MiscMedal {
  public id: number;
  public score: number;
  public name: string;

  constructor(type: MedalE.MiscellaneousType) {
    console.log("type");
    console.log(type);
    this.id = type;
    switch(type) {
        case MedalE.MiscellaneousType.AdminIsFriend:
          this.score = 1000;
          this.name = "VIP";
          break;
        case MedalE.MiscellaneousType.AdminIsMember:
          this.score = 1000;
          this.name = "Exclusive Hub";
          break;
        case MedalE.MiscellaneousType.AdminIsOwner:
          this.score = 1000;
          this.name = "Exclusive Pass"
          break;
    }
  }
}
