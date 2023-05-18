

export class EleccionGraphicResponse {
    "IdEleccion":number
    "Nombre": string
    "FechaInicio": string
    "FechaFin": string
    "Descripcion": string
    "Estado":string
    "Partidos": PartidoGraphicResponse[]

}

export class PartidoGraphicResponse {
    "name": string
    "value": string
}
