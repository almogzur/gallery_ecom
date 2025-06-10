import {createContext} from "react";

export interface WidthContextType{  
    xxl:boolean
    xl:boolean
    lg:boolean
    md:boolean
    sm:boolean
    xs:boolean
    xxs:boolean
  mediaQueryKay: () => 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  }

export default  createContext<WidthContextType>({
  xs: false,
  sm: false,
  md: false,
  lg: false,
  xl:false,
  xxl: false,
  xxs:false,
  mediaQueryKay : () => 'xxs'
  
})

