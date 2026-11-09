import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocFromServer,
} from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

/* CRITICAL: Must pass firebaseConfig.firestoreDatabaseId as required by Firebase skill */
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null,
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error("Firestore Error: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Validación de conectividad con Firestore
if (typeof window !== "undefined") {
  (async function testConnection() {
    try {
      await getDocFromServer(doc(db, "test", "connection"));
    } catch (error) {
      if (error instanceof Error && error.message.includes("the client is offline")) {
        console.error("Please check your Firebase configuration.");
      }
    }
  })();
}

export interface InvitacionPersistente {
  id: string;
  token: string;
  claveAcceso: string;
  nombre: string;
  email: string;
  nota?: string;
  creadoEn: string;
  ultimoAcceso?: string;
  accesosTotales: number;
  estado: "activo" | "revocado";
  enviadoPorCorreo: boolean;
}

const INVITACIONES_COLLECTION = "invitaciones";

/**
 * Obtiene todas las invitaciones de la base de datos Firestore
 */
export async function getInvitacionesFirestore(): Promise<InvitacionPersistente[]> {
  try {
    const snap = await getDocs(collection(db, INVITACIONES_COLLECTION));
    const items: InvitacionPersistente[] = [];
    snap.forEach((d) => {
      items.push(d.data() as InvitacionPersistente);
    });
    // Ordenar de más reciente a más antigua
    items.sort((a, b) => new Date(b.creadoEn).getTime() - new Date(a.creadoEn).getTime());
    return items;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, INVITACIONES_COLLECTION);
  }
}

/**
 * Guarda o actualiza una invitación en Firestore
 */
export async function setInvitacionFirestore(inv: InvitacionPersistente): Promise<void> {
  const docPath = `${INVITACIONES_COLLECTION}/${inv.id}`;
  try {
    // Sanitizar payload eliminando undefined
    const payload: Record<string, unknown> = {
      id: inv.id,
      token: inv.token,
      claveAcceso: inv.claveAcceso,
      nombre: inv.nombre,
      email: inv.email,
      creadoEn: inv.creadoEn,
      accesosTotales: inv.accesosTotales,
      estado: inv.estado,
      enviadoPorCorreo: inv.enviadoPorCorreo,
    };
    if (inv.nota) payload["nota"] = inv.nota;
    if (inv.ultimoAcceso) payload["ultimoAcceso"] = inv.ultimoAcceso;

    await setDoc(doc(db, INVITACIONES_COLLECTION, inv.id), payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

/**
 * Cambia el estado de una invitación en Firestore
 */
export async function updateEstadoInvitacionFirestore(
  id: string,
  nuevoEstado: "activo" | "revocado",
): Promise<void> {
  const docPath = `${INVITACIONES_COLLECTION}/${id}`;
  try {
    await updateDoc(doc(db, INVITACIONES_COLLECTION, id), {
      estado: nuevoEstado,
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, docPath);
  }
}

/**
 * Registra acceso de un invitado en Firestore
 */
export async function registrarAccesoInvitadoFirestore(
  id: string,
  nuevoAccesosTotales: number,
  ultimoAcceso: string,
): Promise<void> {
  const docPath = `${INVITACIONES_COLLECTION}/${id}`;
  try {
    await updateDoc(doc(db, INVITACIONES_COLLECTION, id), {
      accesosTotales: nuevoAccesosTotales,
      ultimoAcceso,
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, docPath);
  }
}

/**
 * Busca una invitación por token en Firestore
 */
export async function buscarInvitacionPorTokenFirestore(
  token: string,
): Promise<InvitacionPersistente | null> {
  try {
    const q = query(collection(db, INVITACIONES_COLLECTION), where("token", "==", token));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const docSnap = snap.docs[0];
    return (docSnap?.data() as InvitacionPersistente) || null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, INVITACIONES_COLLECTION);
  }
}

/**
 * Busca una invitación por Email y Clave en Firestore
 */
export async function buscarInvitacionPorEmailYClaveFirestore(
  email: string,
  clave: string,
): Promise<InvitacionPersistente | null> {
  try {
    const q = query(
      collection(db, INVITACIONES_COLLECTION),
      where("email", "==", email.trim().toLowerCase()),
      where("claveAcceso", "==", clave.trim().toUpperCase()),
    );
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const docSnap = snap.docs[0];
    return (docSnap?.data() as InvitacionPersistente) || null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, INVITACIONES_COLLECTION);
  }
}
