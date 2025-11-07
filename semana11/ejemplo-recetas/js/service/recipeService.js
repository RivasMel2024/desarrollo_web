import { db } from "./firebase.js";
import { addDoc , collection, serverTimestamp, query, getDocs, getDoc, updateDoc, deleteDoc, orderBy, doc } from 'https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js';

const COLECCTION_NAME = "recipes"

// Funcion para crear un receta
export async function createRecipe(recipeData) {
    try {
        const docId = await addDoc(collection(db, COLECCTION_NAME), {
            ...recipeData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        })
        
        return { success:true, id:docId.id }
    } catch (error) {
        console.log("Error creando la receta");        
        return { success: false, error:error.message }
    }
}

// Funcion para retornar todas las recetas

export async function getAllRecipes() {
    try {
        const q = query(collection(db, COLECCTION_NAME), orderBy('createdAt', 'desc'))
        const result = await getDocs(q)

        const recipes = []

        // Por cada resultado que tenga lo agrega al array
        result.forEach(doc => {
            recipes.push({
                id: doc.id,
                ...doc.data()
            })
        });

        return { succes: true, data: recipes }

    } catch (error) {        
        return { succes: false, error:error.message }
    }
}

export async function getRecipeBy(rId) {
    try {
        // Pasamos la referencia de la db, la coleccion y el id de lo que queremos buscar
        const docRef = doc(db, COLECCTION_NAME, rId)
        const result = await getDoc(docRef)

        if(result.exists()){
            return { succes: true, data: { id:result.id, ...result.data() } }
        }

        return { success: false, error: 'Receta no encontraada' }

    } catch (error) {
        return { success: false, error: error.message }
    }
}

export async function updateRecipe(rId, newRecipeData) {
    try {
        // Referencia del doc que quiero modificar
        const docRef = doc(db, COLECCTION_NAME, rId)
        await updateDoc(docRef, { ...newRecipeData, updatedAt: serverTimestamp() })

        return { succes: true, message: "Se actualizo exitosamente" }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

export async function deleteRecipe(rId) {
    try {
        const docRef = doc(db, COLECCTION_NAME, rId)
        await deleteDoc(docRef)

        return { succes: true, message: "Se elimino exitosamente" }
    } catch (err) {
        
    }
}