import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Loading.css'
 
const Loading = ({history}) => {

    let urla = window.location.href;
    let code = urla.split('/')[5].split('=')[1]

    const [datos, setdatos] = useState(false)

    useEffect(() => {

        if(datos){
            history.push('/data')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[datos])


    const getToken = (code) => {

        axios.post('http://localhost:4000/user/login/callback', { code })
        .then((result) => {
            setdatos(true)
            localStorage.setItem('accessToken', result.data.access_token)
        })
        .catch((err) => {
            console.log(err)
        }) 

    }

    useEffect(() => {

        getToken(code)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[code])



    return (
       <div className='background' >
           <div className="text-center">
                <div className="spinner-border loading"  role="status"></div>
           </div>
           <div className='conteiner-div-loading' >
                <h3 className='loading-p' >Loading...</h3>
           </div>
       </div>
    )

}

export default Loading