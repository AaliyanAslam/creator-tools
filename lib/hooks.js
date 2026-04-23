import useSWR from "swr";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

const fetcher = async () => {
  const snapshot = await getDocs(collection(db, "products"));
  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter((p) => p.isActive === true);
};

export function useProducts() {
  const { data, error, isLoading } = useSWR("products", fetcher, {
    revalidateOnFocus: true,
    dedupingInterval: 60000, // 1 minute cache
  });

  return {
    products: data || [],
    loading: isLoading,
    error,
  };
}
