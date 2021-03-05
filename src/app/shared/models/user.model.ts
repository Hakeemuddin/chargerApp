import { StationModel } from ".";

export interface UserModel {
  userId?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  favoriteStations?: string[];
  activeStations?: StationModel[]
}
