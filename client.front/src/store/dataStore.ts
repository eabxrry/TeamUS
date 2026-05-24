import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
const apiUrl = import.meta.env.VITE_API_URL;
axios.defaults.baseURL = apiUrl;
axios.defaults.withCredentials = true;



export interface Student {
  _id: string;
  name: string;
  color: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Group {
  _id: string;
  name: string;
  membres: Student[];
  createdAt: string;
  updatedAt: string;
}



interface DataStore {
  students: Student[];
  groups: Group[];
  loading: boolean;
    change: boolean;
  error: string | null;

  fetchData: () => Promise<void>;
  generateGroups: (maxMembers: number) => Promise<void>;
  addStudent: (student: Omit<Student, "_id" | "createdAt" | "updatedAt">) => Promise<void>;
  handleDelete: (url: string) => Promise<void>;
}



const useDataStore = create<DataStore>((set) => ({
  students: [],
  groups: [],
  loading: false,
  change: false,
  error: null,

  fetchData: async () => {
    try {
      set({ loading: true, error: null });

      const res = await axios.get("/api/data");
      set({
        students: res.data.students,
        groups: res.data.groupes,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err?.message || "Erreur lors du chargement",
        loading: false,
      });
    }
  },

  generateGroups: async (maxMembers: number) => {
    try {
      set({ loading: true, error: null });

      const res = await axios.post("/api/groupes/generate", { maxMembers });

      set({ groups: res.data.groupes, loading: false, change: !res.data.change });
    } catch (err: any) {
      set({
        error: err?.message || "Erreur lors de la génération des groupes",
        loading: false,
      });
    }
  },

  addStudent: async (student) => {
    try {
      set({ loading: true, error: null });

      const res = await axios.post("/api/students", student);
    toast.success(res.data.notif);
      set((state) => ({
        change: !state.change,
        loading: false,
      }));
    } catch (err: any) {
      set({
        error: err?.message || "Erreur lors de l'ajout de l'étudiant",
        loading: false,
      });
    }
  },

  handleDelete: async (url: string) => {
    try {
      await axios.delete(url);

      set((state) => ({
        students: state.students.filter((s) => !url.includes(s._id)),
        change: !state.change,
      }));
    } catch (err) {
    }
  },
}));

export default useDataStore;
