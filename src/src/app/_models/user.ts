export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
    avatar: string;
    data: [];
}


export interface Location {
  type: string;
  coordinates: number[];
}

export interface SetRegularUnitRate {
  regularChargePerUnit: number;
  regularChargeTwoUnit: number;
  regularChargeThreeUnit: number;
  regularChargeFourUnit: number;
  regularChargeFivthUnit: number;
}

export interface SetOverUnitRate {
  overChargePerUnit: number;
  overChargeTwoUnit: number;
  overChargeThreeUnit: number;
  overChargeFourUnit: number;
  overChargeFivthUnit: number;
}

export interface ItemType {
  itemName: string;
  deletedAt: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface ItemWeight {
  itemWeight: string;
  deletedAt: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export class Data {
  location: Location;
  SetRegularUnitRate: SetRegularUnitRate;
  SetOverUnitRate: SetOverUnitRate;
  companyName: string;
  companyEmail: string;
  password: string;
  companyPhone: string;
  image: string;
  streetAdress: string;
  addess2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  firstContactPerson: string;
  secondContactPerson: string;
  firstContactEmail: string;
  secondContactEmail: string;
  firstContactPhone: string;
  secondContactPhone: string;
  firstRole: string;
  secondaryRole: string;
  userType: string;
  creditLimit: number;
  remainingCreditLimit: number;
  daysLimit: number;
  ratePerKm: number;
  startDateOfCreditLimit?: any;
  endDateOfCreditLimit?: any;
  servicefee: number;
  openingFare: number;
  cancelCharge: number;
  otherField1: number;
  otherField2: number;
  otherField3: number;
  otherField4: number;
  stripeCustomerID: string;
  deviceToken: string;
  setUnitRateFlag: boolean;
  itemType: ItemType[];
  itemWeight: ItemWeight[];
  accountStatus: boolean;
  resetPasswordToken: string;
  deletedAt: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface RootObject {
  status: string;
  data: Data;
  message: string;
}




