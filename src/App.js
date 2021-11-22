import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/Login/Login'
import Loading from './components/Loading/Loading'
import UserData from './components/UserData/UserData'
import DataRepoCommit from './components/DataCommit/DataCommit'
import DataLanguage from './components/DataLanguage/DataLanguage'
import { DataProvider } from './Context/Context'
import './App.css';


function App() {
  return (
    <DataProvider>
    <BrowserRouter>
    <div className="App">
    
    <Route
     exact path='/'
     component={Login}
    /> 
    
    <Route 
     path='/user/login/callback'
     component={Loading}
    />
    
    <Route 
     path='/data'
     component={UserData}
    />

    <Route 
     path='/commit'
     component={DataRepoCommit}
    />

    <Route 
     path='/repo'
     component={DataLanguage}
    />

    </div>
    </BrowserRouter>
    </DataProvider>
  );
}

export default App;
