import React, { useState } from 'react';

export const UserContext = React.createContext();

const UserState = ({children}) =>{
    
    const [user,setUser] = useState({
        username:"",
        id:"",
        token:""
    });

    return(
        <UserContext.Provider value={[user,setUser]}>
            {children}
        </UserContext.Provider>
    );
}

export default UserState;

