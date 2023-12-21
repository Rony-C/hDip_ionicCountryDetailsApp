import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) { 
    this.init();
  }

  async init(){
    await this.storage.create();
    this._storage = this.storage;
  }

  public async set(key: string, value: string){
    await this._storage?.set(key, value);
  }

  public async get(key: string){
    return await this._storage?.get(key);
  }
}
