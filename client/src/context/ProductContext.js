import { createContext ,useContext, useEffect, useState  } from "react";
import { fetchProductData } from "../Components/user/userUtil/api";
import toast from "react-hot-toast";
const ProductContext= createContext()



export const ProductProvider = ({childrens})=>{
    const [constextProducts,setConstextProducts]=useState([])

    
const data =async()=>{
    try {
            
        const response = await fetchProductData()

        if (response.data.success) {
            setConstextProducts(response.data.data)



          } else {
            throw new Error(response.data.message);
          }
        } catch (error) {
          throw error;
        }
}
    useEffect(()=>{
        data()

    },[])

    return(
        <ProductContext.Provider value={{constextProducts}}>
            {childrens}
        </ProductContext.Provider>
    )
}

export const ProductproviderContext = ()=>useContext(ProductContext)