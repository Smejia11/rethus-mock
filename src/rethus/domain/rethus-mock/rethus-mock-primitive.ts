export interface IAcademicInformation {
  programType: string;
  obtainmentOrigin: string;
  profession: string;
  startPracticeDate: string; // ISO date string (YYYY-MM-DD)
  administrativeAct: string;
  reportingEntity: string;
}

export interface IRethusPersonPrimitive {
  identificationType: string;
  identificationNumber: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  secondLastName?: string;
  identificationStatus: string;
  details?: string;
  academicInformation: IAcademicInformation[]; // now an array
}

export class RethusMock {
  constructor(private attributes: IRethusPersonPrimitive) {}
  static create(data: {
    identificationType: string;
    identificationNumber: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    secondLastName?: string;
    identificationStatus: string;
    details?: string;
    academicInformation: {
      programType: string;
      obtainmentOrigin: string;
      title: string;
      professionOrOccupation: string;
      startPracticeDate: string;
      administrativeAct: string;
      reportingEntity: string;
    }[];
  }) {
    const instance = new RethusMock({
      identificationType: data.identificationType,
      identificationNumber: data.identificationNumber,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      secondLastName: data.secondLastName,
      identificationStatus: data.identificationStatus,
      details: data.details,
      academicInformation: data.academicInformation.map((ai) => ({
        programType: ai.programType,
        obtainmentOrigin: ai.obtainmentOrigin,
        title: ai.title,
        profession: ai.professionOrOccupation,
        startPracticeDate: ai.startPracticeDate,
        administrativeAct: ai.administrativeAct,
        reportingEntity: ai.reportingEntity,
      })),
    });
    return instance;
  }

  toValue(): IRethusPersonPrimitive {
    return {
      identificationType: this.attributes.identificationType,
      identificationNumber: this.attributes.identificationNumber,
      firstName: this.attributes.firstName,
      middleName: this.attributes.middleName,
      lastName: this.attributes.lastName,
      secondLastName: this.attributes.secondLastName,
      identificationStatus: this.attributes.identificationStatus,
      details: this.attributes.details,
      academicInformation: this.attributes.academicInformation.map((ai) => ({
        programType: ai.programType,
        obtainmentOrigin: ai.obtainmentOrigin,
        profession: ai.profession,
        startPracticeDate: ai.startPracticeDate,
        administrativeAct: ai.administrativeAct,
        reportingEntity: ai.reportingEntity,
      })),
    };
  }
}
