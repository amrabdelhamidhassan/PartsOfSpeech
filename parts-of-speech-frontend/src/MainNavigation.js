import {
    Routes,
    Route,
    Navigate
  } from "react-router-dom";
import PracticeScreen from "./screens/PracticeScreen";
import RankScreen from "./screens/RankScreen";
const MainNavigation=()=>
{
    return(
        <Routes>
            {/* <Route path="/" element={<HomeScreen />}/> */}
          <Route path="/practice" element={<PracticeScreen />}/>
          <Route path="/rank" element={<RankScreen />}/>
          <Route path="*" element={<Navigate to={'/practice'} replace/>}/>
      </Routes>
    )
}
export default MainNavigation