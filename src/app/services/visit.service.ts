import { Injectable } from "@angular/core";

export enum EVisitStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
}

export interface IVisit {
  id: number;
  name: string;
  gotra: string;
  phone: string;
  local: boolean;
  status: EVisitStatus;
  visitDate: string;
  createdDate: string;
  completeDate?: string;
}

@Injectable({
  providedIn: "root",
})
export class VisitService {
  constructor() {}
}
