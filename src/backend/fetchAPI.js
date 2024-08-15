export const registerSiswa = async(req)=>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/authentication/users/create`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(req)
        })
        if(response.ok){
            const data = await response.json()
            return data
        }
        if(response.status === 400){
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.log(error)
        return error
    }
}
export const loginSiswa = async(req)=>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/authentication/users/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(req)
        })
        if(response.ok){
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.log(error)
        return error
    }
}