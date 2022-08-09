export class ModuloModel {

    id:                  number;
    
    nombre:              string;
    
    descripcion:         string;
    
    idProyecto:          number;
    
    progress: number;
    
    prioridad: number;

    start: Date;
    
    end: Date;


    constructor() {
        
        this.id = 0;

        this.nombre = '';

        this.idProyecto = 0;

        this.descripcion = '';

        this.progress = 0;

        this.prioridad = 0;
        
        this.start =  new Date();
        
        this.end =  new Date();
        
    }
}