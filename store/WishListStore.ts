import { create } from "zustand";
import { Course } from "@/app/(tabs)";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

interface WishListState {
    wishList: Course[];
    addToWishList: (course: Course) => void;
    removeWishList: (courseId: number) => void;
    InWishList: (courseId: number) => boolean;

}

export const useWishListStore = create<WishListState>
    (
        (set, get) => ({
            wishList: [],
            addToWishList: (course) =>
                set((state) => ({ wishList: [...state.wishList, course] })),
            removeWishList: (courseId) =>
                set((state) => ({ wishList: state.wishList.filter((c) => c.id !== courseId) })),
            InWishList: (courseId) => get().wishList.some((c) => c.id === courseId)
        })
    )