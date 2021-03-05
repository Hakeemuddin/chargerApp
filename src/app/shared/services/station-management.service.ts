import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StationModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class StationManagementService {
  constructor(private afs: AngularFirestore) {}

  getStationsByIds(stationIds: string[]) {
    const stations$ = this.afs
      .collection<StationModel>('stations', (ref) => {
        return ref.where('stationId', 'in', stationIds);
      })
      .valueChanges();
    return stations$;
  }
  getAllStations() {
    const stations$ = this.afs
      .collection<StationModel>('stations')
      .valueChanges();
    return stations$;
  }
}
