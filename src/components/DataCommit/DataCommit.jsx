import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './DataCommit.css'


const DataRepoCommit = ({history}) => {

    const [datosRepo, setdataRepo] = useState([])

    let urla = window.location.href;
    let code = urla.split('/')[4]
    const accessToken = localStorage.getItem('accessToken')
    const Username = localStorage.getItem('Username')

    useEffect(() => {

        if(!accessToken){
            history.push('/')
        }

    })


    const LogOut = () => {
        localStorage.removeItem('accessToken')
        history.push('/')
    }

    const getDataRepository = (data) => {
        
        axios.post('http://localhost:4000/data-repository', { data })
        .then((result) => {
            setdataRepo(result.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }


    useEffect(() => {
 
        let data = {
            accessToken,
            owner: Username,
            repo: code
        }

        getDataRepository(data)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[code])



    return (
       <div className='commit-data' >
            <h1 className='title' >{code}</h1>
                <div className='div-button-logout' >
                     <button onClick={LogOut} type="button" className="btn btn-light"><h5>Log out</h5></button>
                </div>
                <div>
                    <h3 className='title'>Commits</h3>
                </div> 
            <div className='contenedor-cards-commits' >
                {
                    datosRepo.length >= 1 && datosRepo.map((e, index) => {
  
                     return (
                      <div className="card body-card" key={index} >
                        <div className="card-body">
                            <h5 className="card-title ">Author: {e.commit.author.name}</h5>
                            <h6 className="card-title data-text"><strong>Date:</strong> {e.commit.committer.date.slice(0,10) } </h6>
                            <p className="card-text data-text"><strong>Message:</strong> {e.commit.message}.</p>
                            <a className="btn btn-primary" href={e.html_url.length > 0 ? e.html_url :  console.log('No contiene url')} target="_blank" rel="noreferrer"> <h6> 
                            see commit on github  </h6> </a>
                        </div>
                      </div>    
                        )
                    })
                }
                
            
            </div>
       </div>
    )

}

export default DataRepoCommit