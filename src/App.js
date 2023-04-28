import {Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import Layout from "./Layout/Layout";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Friends from "./pages/Friends/Friends";
import MyProfile from "./pages/MyProfile/MyProfile";
import '../src/styles/style.scss'
import "./utils/i18n"
import NotFound from "./pages/NotFound/NotFound";
import {useSelector} from "react-redux";
import FindFriends from "./pages/FindFriends/FindFriends";
import Notifications from "./pages/Notifications/Notifications";
import Requests from "./pages/Requests/Requests";
import {userSelector} from "./redux/reselect";
import Photos from "./pages/Photos/Photos";


function App() {

    const {user} = useSelector(userSelector)

    return (
      <Suspense fallback={"...loading"}>
            {
                user.login.length === 0 ?
                <Routes>
                    <Route path="register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
                :
                    <Routes>
                        <Route path="/" element={<Layout/>}>
                            <Route path="" element={<Home/>}/>
                            <Route path="friends" element={<Friends/>}/>
                            <Route path="myProfile" element={<MyProfile/>}/>
                            <Route path="findFriends" element={<FindFriends/>}/>
                            <Route path="notifications" element={<Notifications/>}/>
                            <Route path="requests" element={<Requests/>}/>
                            <Route path="photos" element={<Photos/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Route>
                   </Routes>
            }
      </Suspense>
  );
}

export default App;
