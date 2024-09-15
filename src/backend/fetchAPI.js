//SISWA API
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
export const listClass = async (req) => {
    try {
        const { kelas, name, limit } = req
        const token = sessionStorage.getItem('tokensiswa')
        let url = `${process.env.NEXT_PUBLIC_BASE_API}/api/listclass`
        const createUrl = () => {
            if (kelas) {
                return url + `?kelas=` + `${encodeURIComponent(kelas)}`
            }
            else if (name) {
                return url + `?name=${encodeURIComponent(name)}`
            }
            else if(limit){
                return url + `?limit=${limit}`
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
export const listStasiun = async (req) => {
    try {
        const { idmatapelajaran } = req
        const token = sessionStorage.getItem('tokensiswa')
        let url = `${process.env.NEXT_PUBLIC_BASE_API}/api/materi/list`
        const createUrl = () => {
            if (idmatapelajaran) {
                return url + `?idmatapelajaran=` + idmatapelajaran
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
export const detailMateri = async (req) => {
    try {
        const { idmapel, stasiun } = req
        const token = sessionStorage.getItem('tokensiswa')
        let url = `${process.env.NEXT_PUBLIC_BASE_API}/api/materi/detail`
        const createUrl = () => {
            if (idmapel) {
                if (idmapel && stasiun) {
                    return url + `?idmapel=` + idmapel + '&stasiun=' + `${decodeURIComponent(stasiun)}`
                }
                return url + `?idmapel=` + idmapel
            }
            else {
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
export const detailDiskusi = async (req) => {
    try {
        const { idmapel, stasiun } = req
        const token = sessionStorage.getItem('tokensiswa')
        let url = `${process.env.NEXT_PUBLIC_BASE_API}/api/discussion`
        const createUrl = () => {
            if (idmapel && stasiun) {
                return url + `?idmapel=` + idmapel + '&stasiun=' + `${decodeURIComponent(stasiun)}`
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
export const listQuestion = async (req) => {
    try {
        const { idmapel, stasiun } = req
        const token = sessionStorage.getItem('tokensiswa')
        let url = `${process.env.NEXT_PUBLIC_BASE_API}/api/exam`
        const createUrl = () => {
            if (idmapel && stasiun) {
                return url + `?idmapel=` + idmapel + '&stasiun=' + `${decodeURIComponent(stasiun)}`
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
export const postAnswerQuestion = async (req) => {
    try {
        const token = sessionStorage.getItem('tokensiswa')
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/exam/answer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
export const listExamAnswer = async (req) => {
    try {
        // const { idexam, idmapel, stasiun } = req
        const token = sessionStorage.getItem('tokensiswa')
        const queryString = new URLSearchParams(req).toString();
        let url = `${process.env.NEXT_PUBLIC_BASE_API}/api/exam/answer/list?${queryString}`
        const response = await fetch(url,
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
export const getAbsensiByIdSiswa = async (req) => {
    try {
        // const { idexam, idmapel, stasiun } = req
        const token = sessionStorage.getItem('tokensiswa')
        const queryString = new URLSearchParams(req).toString();
        let url = `${process.env.NEXT_PUBLIC_BASE_API}/api/absensi/list?${queryString}`
        const response = await fetch(url,
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
export const addAbsen = async (req) => {
    try {
        const token = sessionStorage.getItem('tokensiswa')
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/absensi/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
export const getDetailProfile = async () => {
    try {
        const token = sessionStorage.getItem('tokensiswa')
        let url = `${process.env.NEXT_PUBLIC_BASE_API}/api/profile/siswa`
        const response = await fetch(url,
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
export const forgotPassword = async (req) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/forgotpassword`, {
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
export const verifyTokenReset = async (req) => {
    try {
        // const { idexam, idmapel, stasiun } = req
        const queryString = new URLSearchParams(req).toString()
        let url = `${process.env.NEXT_PUBLIC_BASE_API}/api/reset?${queryString}`
        const response = await fetch(url,{method: 'GET'})
        if (response) {
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.log(error)
        return error
    }
}
export const resetPassword = async (req) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/reset/update`, {
            method: 'PUT',
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
export const getResultSiswa = async (req) => {
    try {
        const token = sessionStorage.getItem('tokensiswa')
        const queryString = new URLSearchParams(req).toString();
        let url = `${process.env.NEXT_PUBLIC_BASE_API}/api/result?${queryString}`
        const response = await fetch(url,
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



//TEACHER API
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
export const listQuestionTeacher = async (req) => {
    try {
        const { idmapel, stasiun } = req
        const token = sessionStorage.getItem('tokenguru')
        let url = `${process.env.NEXT_PUBLIC_BASE_API}/api/exam/teacher/question/list`
        const createUrl = () => {
            if (idmapel && stasiun) {
                return url + `?idmapel=` + idmapel + '&stasiun=' + `${stasiun}`
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
export const getDetailProfileByTeacher = async (req) => {
    try {
        const queryString = new URLSearchParams(req).toString()
        let url = `${process.env.NEXT_PUBLIC_BASE_API}/api/profile/siswa/authTeacher?${queryString}`
        const response = await fetch(url,
            {method: 'GET'}
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
export const listExamAnswerKoreksi = async (req) => {
    try {
        // const { idexam, idmapel, stasiun } = req
        const token = sessionStorage.getItem('tokenguru')
        const queryString = new URLSearchParams(req).toString();
        let url = `${process.env.NEXT_PUBLIC_BASE_API}/api/exam/answer/koreksi?${queryString}`
        const response = await fetch(url,
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
export const postCorrectionExam = async (req) => {
    try {
        const token = sessionStorage.getItem('tokenguru')
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/exam/teacher/answer/correction`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
export const getAbsensiForTeacher = async (req) => {
    try {
        // const {idmapel, stasiun } = req
        const token = sessionStorage.getItem('tokenguru')
        const queryString = new URLSearchParams(req).toString();
        let url = `${process.env.NEXT_PUBLIC_BASE_API}/api/absensi/list/teacher?${queryString}`
        const response = await fetch(url,
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