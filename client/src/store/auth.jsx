import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [isLoadding,setIsLoadding] = useState(true);
    const authorizationToken =`Bearer ${token}`;
    const[oil, setOil] = useState("");
    const [fruit, setFruit] = useState("");
    const [grain, setGrain] = useState("");

    const storeTokenInLS = (serverToken) => {
        localStorage.setItem("token", serverToken);
        setToken(serverToken);
    };

    const LogoutUser = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    const isLoggedIn = !!token;


    const userAuthentication = async () => {
        if (!token) {
            setIsLoadding(false);
            return;
        }
        try {
          setIsLoadding(true);
          const response = await fetch("http://localhost:3000/api/auth/user", {
            method: "GET",
            headers: {
              Authorization: authorizationToken,
            },
          });
      
          if (response.ok) {
            const data = await response.json();
            setUser(data.userData);
          } else {
            console.log("Error fetching user data");
            setUser(null);  
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null);  
        } finally {
          setIsLoadding(false);
        }
      };
      useEffect(() => {
        userAuthentication();
    }, [token]);
      
    const getOilDatas = async()=>{
        try{

            const response = await fetch("http://localhost:3000/api/data/oil",{method:"GET",});

            if (!response.ok) {
                throw new Error("Failed to fetch oil data");
            }
    
            const data = await response.json();
    
            if (!Array.isArray(data.msg)) {
                console.error("Oil data is not in the expected format:", data.msg);
              
            } else {
                setOil(data.msg);
            }

        }catch(error){
            console.log(`oilData frontend error:${error}`)

        }

    }
    const getFruitDatas = async()=>{
        try{

            const response = await fetch("http://localhost:3000/api/data/fruit",{method:"GET",});

            if (!response.ok) {
                throw new Error("Failed to fetch fruit data");
            }
    
            const data = await response.json();
    
            if (!Array.isArray(data.msg)) {
                console.error("fruit data is not in the expected format:", data.msg);
              
            } else {
                setFruit(data.msg);
            }

        }catch(error){
            console.log(`oilData frontend error:${error}`)

        }

    }

    const getGrainDatas =async()=>{
        try{
            const response = await fetch("http://localhost:3000/api/data/grain",{method:"GET",});

            if(!response.ok){
                throw new Error("Failed to fetch grain data");
            }

            const data = await response.json();

            if(!Array.isArray(data.msg)){
                console.error("grain data is not in the expected format:",data.msg);
            }else{
                setGrain(data.msg);
            }

        }catch(error){
            console.log(`grainDatas frontend error: ${error}`)

        }
    }

    useEffect(()=>{
        getOilDatas();
        getFruitDatas();
        getGrainDatas();
    },[])
    return (
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser,user,isLoadding, oil, fruit, grain, }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UseAuth = () => useContext(AuthContext);

