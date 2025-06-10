 //  add selected Image Context 

import { ResourceApiResponse } from "cloudinary";
import React, { createContext } from "react";


type UserSelectedImageContextType = { 
    image : ResourceApiResponse["resources"][0] 
    setImage : React.Dispatch<React.SetStateAction<ResourceApiResponse["resources"][0] >>
 }

export const ImageContext = createContext<UserSelectedImageContextType>({
    image : {} as ResourceApiResponse["resources"][0],
    setImage : () => {}})


