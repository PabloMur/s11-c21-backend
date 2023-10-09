import { firestoreDB } from "@/lib/firebaseConnection";
export class UserModel {
  constructor(email, name) {
    this.email = email;
    this.name = name;
  }
  //Metodo que nos va a permitir en el futuro crear un auth en la base de datoss
  static async createUser(email, name) {
    const newUser = new UserModel(email, name);

    try {
      // la referencia a la coleccion que queremos modificar
      const docRef = await firestoreDB.collection("users").add({
        email: newUser.email,
        name: newUser.name,
      });

      const userId = docRef.id;
      return new UserModel(newUser.email, newUser.name, userId);
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
}
