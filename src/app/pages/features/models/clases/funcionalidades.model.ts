export class FuncionalidadModel {
    
    id:          number;

    nombre:      string;

    descripcion: string;

    idModulo:    number;

    progress: number;
    
    start: Date;

    end: Date;


    constructor() {

        this.id = 0;

        this.nombre = '';

        this.descripcion = '';

        this.idModulo = 0;

        this.progress = 0;
        
        this.start =  new Date();
        
        this.end =  new Date();

    }

}
