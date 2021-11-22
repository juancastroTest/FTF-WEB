import React, { useEffect } from 'react'
import GithubImage from '../../assets/github.svg'
import './Login.css' 

const Login = ({history}) => {

    const accessToken = localStorage.getItem('accessToken')

    useEffect(() => {
        
        if(accessToken){
            history.push('/data')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken])


    return (
       <div className='background' >
           <h1 className='titles' >Github Project <img alt="img-github" src={GithubImage} className='icon-github' /> </h1>

           <h4 className='intro' >To log in, click on the following button.</h4>

           <a href='https://github.com/login/oauth/authorize?client_id=8ca756267932570e699a' >  
           <button type="button" className="btn btn-light button-github">
           Login <img alt="img-github" src={GithubImage} className='icon' />     
           </button> </a>
       </div>
    )

}

export default Login