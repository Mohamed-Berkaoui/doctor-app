import React, { createContext, useContext, useState, useEffect } from 'react';

const DoctorContext = createContext();

export const useDoctor = () => useContext(DoctorContext);

export const DoctorProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('doctorToken') || '');
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('doctorUser');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        if (token) {
            localStorage.setItem('doctorToken', token);
        } else {
            localStorage.removeItem('doctorToken');
        }
    }, [token]);

    const login = (newToken,newUser) => {
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem('doctorToken', newToken);
        localStorage.setItem('doctorUser', JSON.stringify(newUser));
        

    };

    const logout = () => {
        setToken('');
        localStorage.removeItem('doctorToken');
        localStorage.removeItem('doctorUser');
        setUser(null);
    };

    return (
        <DoctorContext.Provider value={{ token, login, logout,user }}>
            {children}
        </DoctorContext.Provider>
    );
};