import React, { Fragment } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { routes } from './routes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import RecipeDetailPage from './pages/RecipeDetailPage/RecipeDetailPage'
import InfoUserPage from './pages/InfoUserPage/InfoUserPage'

export function App() {
  
  return (
    <div>
      <Router>
        <Routes>
          {
            routes.map((route) =>{
              const Page = route.page
              const Layout = route.isShowHeader ? DefaultComponent : Fragment
              return(
                <Route key={route.path} path={route.path} element={
                  <Layout>
                    <Page />
                  </Layout>
                 } />
              )
            })
          }
          <Route path="/recipe/detail/:recipeId" element={<RecipeDetailPage />} />
          <Route path="/user/info/:userId" element={<InfoUserPage />} />
          {/* <Route path="/payment/:ticketId" element={<PaymentPage />} /> */}
        </Routes>
      </Router>
      
    </div>
  )
}


export default App;
