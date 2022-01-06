import {link} from './linkApi'

export const getAPI = async(url)=>{
    const res = await fetch(link+url)
    .then((response)=>response.json())
    .then((responseJson)=>{
        return responseJson;
    })
    .catch((err)=>{
        console.log(err)
    })
    return res;
}

export const postDataAPI = async(url,data)=>{
    const res = await fetch(link+url,{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type' :'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((response)=>response.json())
    .then((responseJson)=>{
        return responseJson;
    }
    )
    .catch((err)=>{
      console.log(err)
    })
    return res;
}