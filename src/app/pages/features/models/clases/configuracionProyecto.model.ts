export class ConfiguracionProyectoModel {
    
    id: number;

    nombre: string;

    jornadaHoras: number;

    duracionSprint: number;

    recursosAnalisis: number;

    recursosDesarrollo: number;
    
    recursosGestion: number

    recursosCalidad: number;

    duracionSprintPlanning: number;

    duracionSprintReview: number;

    duracionRetrospectiva: number;

    duracionDaily: number;

    duracionSeguimientoSemanal: number;

    duracionComiteOperativo: number;

    constructor() {

        this.id = 0;

        this.nombre = '';
        
        this.jornadaHoras = 0;

        this.duracionSprint = 0;

        this.recursosAnalisis = 0

        this.recursosDesarrollo = 0

        this.recursosGestion = 0

        this.recursosCalidad = 0

        this.duracionSprintPlanning = 0

        this.duracionSprintReview = 0

        this.duracionRetrospectiva = 0

        this.duracionDaily = 0

        this.duracionSeguimientoSemanal = 0 

        this.duracionComiteOperativo = 0 

    }

}
