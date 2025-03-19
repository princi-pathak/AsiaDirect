import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './component/homepage/Homepage';
import Login from './component/Login/Login';
import Registermain from './component/Register/Registermain';
import Addfreightmain from './component/Add freight/Addfreightmain';
import NotificationMAin from './component/notification/NotificationMAin';
import Changepasswordmain from './change password/Changepasswordmain';
import Universalpage from './component/universal page/Universalpage';
import Managefreight from './component/Add freight/Managefreight';
import MessageMAin from './component/Message/MessageMAin';
import FReightDetails from './component/Add freight/FReightDetails';
import OrderDetails from './component/order/OrderDetails';
import Customclearence from './component/Custom clearence/Customclearence';
import Addclearing from './component/Custom clearence/Addclearing';
import Tracking from './component/Traking page/Tracking';
import Trackingtimeline from './component/Traking page/Tracking-timeline';
import Profile from './component/profile/Profile';
import Animation from './component/animation/Animation';
import Downloadpdf from './component/pdf/Downloadpdf';
import Updateprofile from './component/Login/Updateprofile';
import Customdetails from './component/Custom clearence/Customdetails';
import OrderDetailsconform from './component/order/OrderDetailsconform';
import Testing from './component/Testing';
import Forgotpassword from './component/Login/Forgotpassword';
import Forgottenpaswwordnew from './component/Login/Forgottenpaswwordnew';
import Calculateclearence from './component/Custom clearence/Calculateclearence';
import Myclearence from './component/Custom clearence/Myclearence';
import Contactus from './component/Cms pages/Contactus';
import Aboutus from './component/Cms pages/Aboutus';
import Privacypolicy from './component/Cms pages/Privacypolicy';
import TermsandCondition from './component/Cms pages/TermsandCondition';
import Uiforms from './testing/Uiforms';
import Roadfreight from './component/homepage/allFreight/Roadfreight';
import AirFreight from './component/homepage/allFreight/AirFreight';
import SeaFreight from './component/homepage/allFreight/SeaFreight';
import Warehousing from './component/homepage/allFreight/Warehousing';
import CustomClearing from './component/homepage/allFreight/CustomClearing';
import ComplianceSupportServices from './component/homepage/allFreight/ComplianceSupportServices';
import Shipment from './component/homepage/Shipment';
import ShippingMode from './component/homepage/ShippingMode';
import Customfaq from './component/homepage/Customfaq';
import CargoConsolidation from './component/homepage/CargoConsolidation';
import Ecommercesupportfrom from './component/homepage/Ecommercesupportfrom';
import ClearenceOrder from './component/Custom clearence/ClearenceOrder';
function App() {
  return (
    <>
      <BrowserRouter basename='asiadirect/asiadirect_website'>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registermain />} />
          <Route path='/notification' element={<NotificationMAin />} />
          <Route path='/addfreight' element={<Addfreightmain />} />
          <Route path='/Changepassword' element={<Changepasswordmain />} />
          <Route path='/freight-details' element={<Managefreight />} />
          <Route path='/message' element={<MessageMAin />} />
          <Route path='/freight-full-details' element={<FReightDetails />} />
          <Route path='/order-details' element={<OrderDetails />} />
          <Route path='/Custom-clearence' element={<Customclearence />} />
          <Route path='/Add-Custom-clearence' element={<Addclearing />} />
          <Route path='/Tracking' element={<Tracking />} />
          <Route path='/Tracking-status' element={<Trackingtimeline />} />
          <Route path='/My-profile' element={<Profile />} />
          <Route path='/animation' element={<Animation />} />
          <Route path='/Download-pdf' element={<Downloadpdf />} />
          <Route path='/update-profile' element={<Updateprofile />} />
          <Route path='/clearence-details' element={<Customdetails />} />
          <Route path='/Roadfreight' element={<Roadfreight />} />
          <Route path='/Order-details-conform' element={<OrderDetailsconform />} />
          <Route path='/testing' element={<Testing />} />
          <Route path='/forgot-password' element={< Forgotpassword />} />
          <Route path='/ResetPassword' element={<Forgottenpaswwordnew />} />
          <Route path='/calculate-clearence' element={<Calculateclearence />} />
          <Route path='/my-clearence' element={<Myclearence />} />
          <Route path='/Contact-us' element={<Contactus />} />
          <Route path='/About-us' element={<Aboutus />} />
          <Route path='/Privacy-policy' element={<Privacypolicy />} />
          <Route path='/Terms-condition' element={<TermsandCondition />} />
          <Route path='/testing' element={<Uiforms />} />
          <Route path='*' element={<Universalpage />} />
          <Route path='/airFreight' element={<AirFreight />} />
          <Route path='/seaFreight' element={<SeaFreight/>} />
          <Route path='/warehouse' element={<Warehousing/>} />
          <Route path='/customClear' element={<CustomClearing />} />
          <Route path='/ComplianceSupportServices' element={<ComplianceSupportServices />} />
          <Route path='/Shipment' element={<Shipment />} />
          <Route path='/shippingmode' element={<ShippingMode />} />
          <Route path='/custom-Faq' element={<Customfaq />} />
          <Route path='/CargoConsolidration' element={<CargoConsolidation />} />
          <Route path='/Clearence-order' element={<ClearenceOrder />} />
          <Route path='/E-commerce' element={<Ecommercesupportfrom />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;