export const getWordsApi=async()=>
{
    console.log("here",process.env)
    try{
    let url = process.env.REACT_APP_BACKEND_LINK+"/words";
    const response = await fetch(url,{method:'GET',})
    let responseText = await response.text();
    let responseJson=JSON.parse(responseText);
    return responseJson
}
catch(err)
{
    console.log(err)

}
}
export const getRankApi=async(result)=>
{
    try{
    let url = process.env.REACT_APP_BACKEND_LINK+"/ranks";
    const response = await fetch(url,
        {
            method:'POST',  
            headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            body:JSON.stringify({finalScore:result})})
    let responseText = await response.text();
    let responseJson=JSON.parse(responseText);
    return responseJson
}
catch(err)
{
    console.log(err)

}
}