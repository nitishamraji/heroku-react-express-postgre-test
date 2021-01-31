export const USER_DATA = {

  myAppUser: () => (
       localStorage.getItem("myAppUser") ? localStorage.getItem("myAppUser") : ''
  ),

  logOutMyAppUser: () => {
      localStorage.removeItem("myAppUser");
  },

  storeMyAppUser: (userId) => {
      localStorage.setItem("myAppUser", userId );
  }

 }
