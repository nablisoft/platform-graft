
export class Bilan {
    constructor(
        public id?: number,
        public patientId?: number,
        public nom?: String,
        public soduim?: String,
        public potassuim?: String,
        public chlore?: String,
        public uree?: String,
        public creatinine?: String,
        public calcuim?: String,
        public calcuimCorrige?: String,
        public phosphore?: String,
        public magnesuim?: String,
        public glucose?: String,
        public albumine?: String,
        public bilirubineT?: String,
        public bilirubineD?: String,
        public phosphataseAlcaline?: String,
        public sgot?: String,
        public sgpt?: String,
        public ggt?: String,
        public ldh?: String,
        public triglyceride?: String,
        public cholesterole?: String,
        public ammonemie?: String,
        public lactate?: String,
        public amylase?: String,
        public lipase?: String,
        public crp?: String,
        public date?: Date,
    ) {}
}
