export class Partido {
    Nombre:string;
    Descripcion:string;
    Propuestas:string;
    Imagen: string;
    CodigoCandidato:string;

    public constructor(Nombre:string,Descripcion:string,Propuestas:string, Imagen: string,CodigoCandidato:string){
        this.Nombre = Nombre;
        this.Descripcion = Descripcion;
        this.Propuestas = Propuestas;
        this.Imagen = Imagen;
        this.CodigoCandidato = CodigoCandidato;
    }
}
