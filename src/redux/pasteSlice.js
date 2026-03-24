import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes") ? JSON.parse(localStorage.getItem("pastes")) : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      const check = JSON.parse(localStorage.getItem("pastes")) || "[]";
      // if paste already exists
      let flag = false;
      for(let i=0; i<check.length; i++){
        const obj = check[i];
        if(paste.title === obj.title){
          flag = true;
          break;
        }
      }
      if(paste.title !== '' && paste.content !== '' && !flag) {
        state.pastes.push(paste); // append at the last
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("paste created successfully");
      }
      else if(flag) {
        toast("paste with the given title already exists!");
      }
      else {
        // paste cannot be empty
        toast("title or content cannot be empty!");
      }
    },
    updateToPastes: (state, action) => {
      const paste = action.payload; 

      const index = state.pastes.findIndex((item) => item._id === paste._id);
      
      if(index >=0){
        state.pastes[index] = paste;
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("paste updated successfully");
      }else{ 
        toast("no paste found to update!");
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes"); 
    },
    removeFromPastes: (state, action) => {
      const paste = action.payload;

      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if(index >= 0){
         state.pastes.splice(index,1);
         localStorage.setItem("pastes",JSON.stringify(state.pastes));
         toast.success("the pastes has been removed successfully");
      }else{
        toast("can't able to find the required paste!");
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer