import React, { useState } from 'react';

export const UserContext = React.createContext(null);

// const UserState = ({children}) =>{
    
//     const [user,setUser] = useState({
//         username:"",
//         id:null,
//         token:""
//     });

//     return(
//         <UserContext.Provider value={[user,setUser]}>
//             {children}
//         </UserContext.Provider>
//     );
// }

//export default UserState;

