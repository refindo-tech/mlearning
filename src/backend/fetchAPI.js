export const registerSiswa = async (req) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/authentication/users/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
        if (response.ok) {
            const data = await response.json()
            return data
        }
        if (response.status === 400) {
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.log(error)
        return error
    }
}
export const loginSiswa = async (req) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/authentication/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
        if (response.ok) {
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.log(error)
        return error
    }
}
export const registerGuru = async (req) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/authentication/guru/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
        if (response.ok) {
            const data = await response.json()
            return data
        }
        if (response.status === 400) {
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.log(error)
        return error
    }
}
export const loginGuru = async (req) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/authentication/guru/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
        if (response.ok) {
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.log(error)
        return error
    }
}
export const listClass = async (req) => {
    try {
        const { kelas, name } = req
        const token = sessionStorage.getItem('tokensiswa')
        let url = `${process.env.NEXT_PUBLIC_BASE_API}/api/listclass`
        const createUrl = () => {
            if (kelas) {
                return url + `?kelas=` + `${encodeURIComponent(kelas)}`
            }
            else if (name) {
                return url + `?name=${encodeURIComponent(name)}`
            }
            else if (name && kelas) {
                return url + `?kelas=${encodeURIComponent(kelas)}&name=${encodeURIComponent(name)}`
            } else {
                return url
            }
        }
        const response = await fetch(createUrl(),
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        if (response.ok) {
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.log(error)
        return error
    }
}
export const listStasiun = async(req)=>{
    try {
        const { idmatapelajaran } = req
        const token = sessionStorage.getItem('tokensiswa')
        let url = `${process.env.NEXT_PUBLIC_BASE_API}/api/materi/list`
        const createUrl = () => {
            if (idmatapelajaran) {
                return url + `?idmatapelajaran=`+idmatapelajaran
            } else {
                return url
            }
        }
        const response = await fetch(createUrl(),
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        if (response) {
            // console.log(response)
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.log(error)
        return error
    }
}
export const detailMateri = async(req)=>{
    try {
        const {idmapel, stasiun} = req
        const token = sessionStorage.getItem('tokensiswa')
        let url = `${process.env.NEXT_PUBLIC_BASE_API}/api/materi/detail`
        const createUrl = () => {
            if (idmapel && stasiun) {
                return url + `?idmapel=`+idmapel+'&stasiun='+`${decodeURIComponent(stasiun)}`
            } else {
                return url
            }
        }
        const response = await fetch(createUrl(),
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        if (response) {
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.log(error)
        return error
    }
}