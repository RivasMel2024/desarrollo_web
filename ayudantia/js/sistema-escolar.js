import { db } from "./firebase-config.js";
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const alumnosCollection = collection(db, 'alumnos')
const materiasCollection = collection(db, 'materias')
const notasCollection = collection(db, 'notas')

async function obtenerAlumnos() {
    const q = query(alumnosCollection, orderBy('nombre'))
    const snapshot = await getDocs(q)
    
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) 
}

async function obtenerMaterias() {
    const q = query(materiasCollection, orderBy('nombre'))
    const snapshot = await getDocs(q)
    
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) 
}

async function obtenerNotas() {
    const snapshot = await getDocs(notasCollection)
    
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) 
}


// ============================================
// 🎨 FUNCIÓN AUXILIAR PARA ESTILOS
// ============================================
// Retorna una clase CSS según la nota (solo para colores)
function obtenerClaseNota(nota) {
  if (nota >= 90) return "excelente"; // Verde
  if (nota >= 80) return "bueno"; // Azul
  if (nota >= 70) return "regular"; // Amarillo
  return "bajo"; // Rojo
}

// ============================================
// 🖥️ MOSTRAR ALUMNOS EN EL HTML
// ============================================
async function mostrarAlumnos() {
  try {
    // 1️⃣ Obtener datos de Firebase
    const alumnos = await obtenerAlumnos();

    // 2️⃣ Encontrar el contenedor en el HTML
    const container = document.getElementById("alumnosList");

    // 3️⃣ Si no hay datos, mostrar mensaje
    if (alumnos.length === 0) {
      container.innerHTML =
        '<div class="empty-state"><div class="icon">👨‍🎓</div><p>No hay alumnos registrados</p></div>';
      return;
    }

    container.innerHTML = alumnos
      .map(
        (alumno) => `
        <div class="data-item">
            <strong>${alumno.nombre}</strong>
            <div class="detail">
                <span class="badge badge-grado">${alumno.grado}</span>
            </div>
        </div>
    `
      )
      .join("");

    // 5️⃣ Actualizar contador
    document.getElementById("totalAlumnos").textContent = alumnos.length;
  } catch (error) {
    console.error("Error al mostrar alumnos:", error);
  }
}

// ============================================
// 🖥️ MOSTRAR MATERIAS EN EL HTML
// ============================================
async function mostrarMaterias() {
  try {
    const materias = await obtenerMaterias();

    const container = document.getElementById("materiasList");

    if (materias.length === 0) {
      container.innerHTML =
        '<div class="empty-state"><div class="icon">📖</div><p>No hay materias registradas</p></div>';
      return;
    }

    container.innerHTML = materias
      .map(
        (materia) => `
        <div class="data-item">
            <strong>${materia.nombre}</strong>
            <div class="detail">👨‍🏫 ${materia.profesor}</div>
        </div>
    `
      )
      .join("");

    // 5️⃣ Actualizar contador
    document.getElementById("totalMaterias").textContent = materias.length;
  } catch (error) {
    console.error("Error al mostrar materias:", error);
  }
}

// ============================================
// 🖥️ MOSTRAR NOTAS CON RELACIONES
// ============================================
// Esta es la parte MÁS IMPORTANTE: relacionar 3 colecciones
async function mostrarNotas() {
  try {
    const notas = await obtenerNotas();
    const alumnos = await obtenerAlumnos();
    const materias = await obtenerMaterias();
    const container = document.getElementById("notasContainer");

    if (notas.length === 0) {
      container.innerHTML =
        '<div class="empty-state"><div class="icon">📊</div><p>No hay notas registradas</p></div>';
      return;
    }

    const alumnosMap = new Map(alumnos.map((a) => [a.id, a]));
    const materiasMap = new Map(materias.map((m) => [m.id, m]));

    const notasConRelaciones = notas.map((nota) => {
      const alumno = alumnosMap.get(nota.alumnoId);
      const materia = materiasMap.get(nota.materiaId);
      return {
        ...nota,
        alumnoNombre: alumno ? alumno.nombre : "Desconocido",
        alumnoGrado: alumno ? alumno.grado : "",
        materiaNombre: materia ? materia.nombre : "Desconocida",
        materiaProfesor: materia ? materia.profesor : "",
      };
    });

    notasConRelaciones.sort((a, b) =>
      a.alumnoNombre.localeCompare(b.alumnoNombre)
    );

    container.innerHTML = `
        <table class="notas-table">
            <thead>
                <tr>
                    <th>Alumno</th>
                    <th>Grado</th>
                    <th>Materia</th>
                    <th>Profesor</th>
                    <th>Nota</th>
                </tr>
            </thead>
            <tbody>
                ${notasConRelaciones
                  .map(
                    (nota) => `
                    <tr>
                        <td><strong>${nota.alumnoNombre}</strong></td>
                        <td>${nota.alumnoGrado}</td>
                        <td>${nota.materiaNombre}</td>
                        <td>${nota.materiaProfesor}</td>
                        <td>
                            <span class="badge badge-nota ${obtenerClaseNota(
                              nota.nota
                            )}">
                                ${nota.nota}
                            </span>
                        </td>
                    </tr>
                `
                  )
                  .join("")}
            </tbody>
        </table>
    `;

    document.getElementById("totalNotas").textContent = notas.length;

    const promedio =
      notas.reduce((sum, nota) => sum + nota.nota, 0) / notas.length;
    document.getElementById("promedioGeneral").textContent =
      promedio.toFixed(1);
  } catch (error) {
    console.error("Error al mostrar notas:", error);
  }
}

// ============================================
// 🚀 INICIALIZACIÓN DE LA APLICACIÓN
// ============================================

async function cargarDatos() {
  try {
    await mostrarAlumnos();
    await mostrarMaterias();
    await mostrarNotas();
  } catch (error) {
    console.error("Error al cargar datos:", error);
  }
}

async function init() {
  try {
    await cargarDatos();
  } catch (error) {
    console.error("Error al inicializar:", error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}