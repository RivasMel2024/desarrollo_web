const jsonData = ` 
{
    "nombre":"Melisa Rivas",
    "edad": 20,
    "materias": [ 
        { "codigo": "DEW11", "nombre": "Web", "nota": 9.5 },
        { "codigo": "PR222", "nombre": "Pruebas", "nota": 8.6 }, 
        { "codigo": "REQ203", "nombre": "Req", "nota": 9 }
    ]
}
`

const alumno = JSON.parse(jsonData)
console.log(alumno);
console.log(alumno.materias.length);

const extededAlumno = {...alumno, carnet: "20245324", carrera:"ISND"}
// Pasar un objeto a json
console.log(JSON.stringify(extededAlumno));
console.log(JSON.stringify(extededAlumno, ["nombre", "carrera"], 5));


