import Root from "./components/Root";
import Exercises from "./components/Exercises/index";
import Home from "./components/Home/index";
import NotFound from './components/404'
// import ONE from './components/exerciseDetails/ONE'
import Omar from './components/Omar.tsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
       <Route path="exercises" element={<Exercises />} />
       <Route path="/" element={<Home />} >
            <Route path="/:Id" element= {<Omar/>}/>
       </Route>
       <Route path="*"  element={<NotFound />} />
    </Route>
  )
);



function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;