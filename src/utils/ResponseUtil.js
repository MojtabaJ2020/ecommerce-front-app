
import {ERROR_RESPONSE} from './../constants/ApiConstant'

export const extractError = (data) =>{
    
    if( data == null 
        || data.status !== ERROR_RESPONSE 
        || data.errors == null
        || !Array.isArray(data.errors)
        || data.errors.length === 0 )
    {
        return null;
    }
    return  data.errors[0];  
} 