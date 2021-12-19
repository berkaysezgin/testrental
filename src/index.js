import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import becomeHost from './pages/becomeHost';
import Auth from './pages/Auth'
import Home from './pages/Home'
import SuccessfulPosting from './pages/SuccessfulPosting'
import MyProfile from './pages/MyProfile'
import MyProfileEdit from './pages/MyProfileEdit'
import CreateProfile from './pages/CreateProfile'
import SingleProperty from './pages/SinglePropertyPage'
import PersonalRooms from './pages/PersonalRooms';
import FamilyApartments from './pages/FamilyApartments';
import VacationVillas from './pages/VacationVillas';
import ScrollToTop from './Components/ScrollToTop';
import MyListingsPage from './pages/MyListingsPage';
import ViewPublicProfile from './pages/ViewPublicProfile';


const routing = (
  
  <Router>
  <ScrollToTop/>
    <Route exact path="/" component={Home}/>
    <Route exact path="/create-listing" component={becomeHost}/>
    <Route exact path="/auth" component={Auth}/>
    <Route exact path="/home" component={Home}/>
    <Route exact path="/done-posting-listing" component={SuccessfulPosting}/>
    <Route exact path="/my-profile" component={MyProfile}/>
    <Route exact path="/my-profile-edit" component={MyProfileEdit}/>
    <Route exact path="/my-listings" component={MyListingsPage}/>
    <Route exact path="/create-profile" component={CreateProfile}/>
    <Route exact path="/property" component={SingleProperty}/>
    <Route exact path="/personal-rooms" component={PersonalRooms}/>
    <Route exact path="/family-apartments" component={FamilyApartments}/>
    <Route exact path="/vacation-villas" component={VacationVillas}/>
    <Route exact path="/view-profile" component={ViewPublicProfile}/>
  </Router>
)

ReactDOM.render(routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
