/* eslint-disable no-unused-vars */
//wrap your applicaiton with browser router component
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Authentication, GameCatalog, GameDetails, Home, Profile } from './components/index';  //import the components as needed

function App() {
    //within BroserRouter, define the paths and the appropriate component it should render
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={ <Home/> } />
                <Route path="/catalogs" exact element={ <GameCatalog/> } />
                <Route path="/catalogs/$:gameId" exact element={ <GameDetails /> } />
                <Route path="/login" exact element={ <Authentication />} />
                <Route path="/login/:user" exact element={ <Profile/> } />
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default App;

/**
 * Keep in mind that when it comes to setting routes, if rendering issue is occuring, that's generally the fault of routing issues
 * Have a central tag <>, followed by BrowserRouter tag, followed by <Routes> <Route></Route> </Routes>
 * 
 */

/***
 * List of core pages needed
 * Home Page: Showcases featured games, new releases, and popular titles
 * Games Catalog: A browsable list of games, possibly with filters for genre, platform, release date, release date, etc.
 * Game Detail page: Information about specific game, including a description, release date, screenshots, trailers, developer/publisher details and user rating
 * User registration/login page: Allows users to create accounts, login, manage profiles and keep track of their game collections
 * User Profile Page: Displays user information, game collection, wish lists, and reviews
 * Search Results Page: Shows games that match the user's search queries
 * Reviews Page: User-submitted reviews for each games
 * contact/support page: information on how to contect the site admins or get help
 * About Page: information about the website
 * 
 */