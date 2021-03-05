export interface StationModel {
  stationId: string;
  name: string;
  location: string;
  //fav station
  type?: string;
  availability?: string;
  // active station
  chargingTime?: number;
  powerCosumption?: number;
  cost?: number;
  // real time status
  status?: 'online' | 'offline' | 'in-use';
}
