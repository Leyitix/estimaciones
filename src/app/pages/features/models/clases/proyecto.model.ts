export class ProyectoModel {

    id: number;

    codigo: string;

    nombre: string;

    descripcion: string;

    progress: number;
    
    start: Date ;

    end: Date;

    configuracionId: number;

    constructor() {
        
        this.id = 0;

        this.codigo = '';

        this.nombre = '';

        this.descripcion = '';
        
        this.progress = 0;

        this.start = new Date();

        this.end = new Date();
        
        this.configuracionId = 0;
        
    }

}