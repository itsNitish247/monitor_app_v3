import {create}  from 'zustand'
import {persist} from 'zustand/middleware'

let appStore = (set) => ({
    dopen: true,
    userType: null,
    updateOpen:(dopen) => set((state)=>({dopen:dopen})),
    updateUserType: (userType) => set((state) => ({ userType: userType }))

});

appStore =persist(appStore,{name:"my_app_store"});
export const useAppStore = create(appStore);

