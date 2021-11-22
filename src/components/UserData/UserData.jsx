import React, { useEffect, useContext, useState } from 'react'
import { DataContext } from '../../Context/Context'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './UserData.css'

const UserData = ({history}) => {

    const [userData, setuserData] = useState([])

    const accessToken = localStorage.getItem('accessToken')

    
    useEffect(() => {

        if(!accessToken){
            history.push('/')
        }

    })

    const {  setdataLogin, dataLogin, setRepoNames, repoNames  } = useContext( DataContext )

    const LogOut = () => {
        localStorage.removeItem('accessToken')
        history.push('/')
    }


    const dataUser = (accessToken) => {
        axios.post('http://localhost:4000/user/', { accessToken })
        .then((result) => {
            setdataLogin(result.data.login)
            setuserData(result.data)
            localStorage.setItem('Username', result.data.login)
        })
        .catch((err) => {
            console.log(err)
        })
    }


    const getDataRepo = () => {

        let data = {
            accessToken,
            owner: dataLogin
        }
        
        axios.post('http://localhost:4000/data-repos', data )
        .then((result) => {

            setRepoNames(result.data)
        })
        .catch((err) => {
            console.log(err)
        })

    }

    useEffect(() => {
        dataUser(accessToken)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[accessToken])


    useEffect(() => {

        if(dataLogin.length > 0){
            getDataRepo()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dataLogin])




    return (
       <div className='user-data' >
           <div className='conteiner-data-user' >
              <h1 className='title-data-user' >Welcome { userData.login }</h1>
                <div className='div-logout' >
                <button onClick={LogOut} type="button" className="btn btn-light"><h5>Log out</h5></button>
                </div>
           </div>
           <div>
            <h1 className='title-data-user'>Repositories</h1>   
           </div>
           <div className='conteiner-data' >
           {
               repoNames.length >= 1 && repoNames.map((e, index) => {

                return (
                
                    <div className="row" key={index} >
                        <div className="col data-repository" >
                          <div className="card">
                            <div className="card-body">
                              <h1 className="card-title">{e.name}</h1>
                              <p className=" p-data">Default branch: {e.default_branch}</p>
                              <p className=" p-data">Language: {e.language}</p>
                              <Link to={`/commit/${e.name}`} className="btn btn-primary" style={{marginRight: "10px"}}>Go to commits</Link>
                              <Link to={`/repo/${e.name}`} className="btn btn-primary">Go to branchs and languages</Link>
                            </div>
                          </div>
                        </div>
                    </div>

                )
             })
           }  
           

           </div>

       </div>
    )

}

export default UserData