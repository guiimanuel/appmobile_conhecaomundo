import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

async function addFavorite(country) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("Usuário não autenticado");
    }

    const db = getFirestore();
    const favoritoRef = doc(
      db,
      `users/${user.uid}/favorites`,
      country.id
    );

    await setDoc(favoritoRef, {
      ...country,
      addIn: new Date().toISOString(),
    });

    return {
      success: true,
      message: "País adicionado aos favoritos!",
    };
  } catch (error) {
    console.log("Erro ao adicionar favorito:", error);
    return {
      success: false,
      message: error.message,
    };
  }
}

async function removeFavorite(countryId) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("Usuário não autenticado");
    }

    const db = getFirestore();
    const favoritoRef = doc(
      db,
      `users/${user.uid}/favorites`,
      countryId
    );

    await deleteDoc(favoritoRef);

    return {
      success: true,
      message: "País removido dos favoritos!",
    };
  } catch (error) {
    console.log("Erro ao remover favorito:", error);
    return {
      success: false,
      message: error.message,
    };
  }
}

async function getFavorite() {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("Usuário não autenticado");
    }

    const db = getFirestore();
    const favoriteRef = collection(db, `users/${user.uid}/favorites`);
    const q = query(favoriteRef);
    const querySnapshot = await getDocs(q);

    const favorite = [];
    querySnapshot.forEach((doc) => {
      favorite.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return {
      success: true,
      data: favorite,
    };
  } catch (error) {
    console.log("Erro ao obter favoritos:", error);
    return {
      success: false,
      data: [],
      message: error.message,
    };
  }
}

async function checkIfFavorite(countryId) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      return false;
    }

    const db = getFirestore();
    const favoriteRef = doc(
      db,
      `users/${user.uid}/favorites`,
      countryId
    );
    const snapshot = await getDoc(favoriteRef);

    return snapshot.exists();
  } catch (error) {
    console.log("Erro ao verificar favorito:", error);
    return false;
  }
}

function onFavoritesChange(callback) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      return () => {};
    }

    const db = getFirestore();
    const favoriteRef = collection(db, `users/${user.uid}/favorites`);
    const q = query(favoriteRef);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const favorite = [];
      querySnapshot.forEach((doc) => {
        favorite.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      callback(favorite);
    });

    return unsubscribe;
  } catch (error) {
    console.log("Erro ao ouvir favoritos:", error);
    return () => {};
  }
}

export default {
  addFavorite,
  removeFavorite,
  getFavorite,
  checkIfFavorite,
  onFavoritesChange,
};
