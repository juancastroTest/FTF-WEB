import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios'
import './DataLanguage.css'


const DataRepoCommit = ({history}) => {

    const [dataBranch, setdataBranch] = useState([])
    const [language, setLanguage] = useState([])
    const [chartData, setchartData] = useState({})
    const [loading, setloading] = useState(false)

    
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

    const chart = () => {
        setchartData({
            labels: [ 'Javascript', 'CSS', 'HTML'],
            datasets: [{
                label: "Languages",
                data: [language.JavaScript, language.CSS, language.HTML],
                backgroundColor: [
                    'rgba( 75, 192, 192, 0.6)', 'red'
                ]

            }]
        })

        setTimeout(() => {
            setloading(false)
        },800)
        
    }


    const getDataOfBranch = (data) => {
        
        axios.post('http://localhost:4000/branchs', { data })
        .then((result) => {
            setdataBranch(result.data)
        })
        .catch((err) => {
            console.log(err)
        })

    }


    const getDataOfLanguaje = (data) => {
        

        axios.post('http://localhost:4000/languages', { data })
        .then((result) => {
            setLanguage(result.data)

        })
        .catch((err) => {
            console.log(err)
        })


    }


    useEffect(() => {
        setloading(true)
 
        let data = {
            accessToken,
            owner: Username,
            repo: code
        }


        getDataOfBranch(data)
        getDataOfLanguaje(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps    
    },[code])

    useEffect(() => {
        chart()
    // eslint-disable-next-line react-hooks/exhaustive-deps    
    },[language])


    return (
       <div className='commit-data' >
            <h1 className='title' >{code}</h1>
        <div className='div-button-logout' >
            <button onClick={LogOut} type="button" className="btn btn-light"><h5>Log out</h5></button>
        </div>
        <div>
            <h3 className='title'>Branchs</h3>
        </div>
        
        <div className='contenedor-cards-branchs' >
            {
                dataBranch.length >= 1 && dataBranch.map((e, index) => {
                 return (
                  <div className="card body-card-language" key={index} >
                    <div className="card-body">
                        <h5 className="card-title ">Name: {e.name}</h5>
                    </div>
                  </div>    
                    )
                })
            }
            
        </div>
      
       {
           loading ? <div className="spinner-border loading-language"  role="status"></div>
           :<div className='chart'  >
           <h3 className='title' style={{marginBottom: "20px"}} >Languages</h3>
           <Doughnut data={chartData} options={{ responsive: true}}   width={100}
           height={30} />
          
        </div>
       } 
       </div>
    )

}

export default DataRepoCommit