import React, {createContext} from "react";

const Auth = createContext({
    user: null,
    setUser: () => {},
    handleLogout: () => {}
});

export default Auth;