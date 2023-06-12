import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/context/login';
import Resigter from './pages/context/resigter';
import Forgotpassword from './pages/context/forgotpassword';
import DienThoai from './pages/page/dienthoai';
import Iphone from './pages/page/iphone';
import SamSung from './pages/page/samsung';
import Oppo from './pages/page/oppo';
import Redmi from './pages/page/redmi';
import Giohang from './pages/page/giohang';
import Realme from './pages/page/realme';
import DetailProduct from './components/sanpham/chitietsanpham';
import KiemTraDonHang from './pages/page/kiemtradonhang';
import Trangchu from './pages/page/trangchu';
import Search from './pages/page/search';
import Test from './pages/Test';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Trangchu />} />
        <Route path='/login' element={<Login />} />
        <Route path='/resigter' element={<Resigter />} />
        <Route path='/forgotpassword' element={<Forgotpassword />} />
        <Route path='/dien-thoai' element={<DienThoai />} />
        <Route path='/iphone' element={<Iphone />} />
        <Route path='/sam-sung' element={<SamSung />} />
        <Route path='/oppo' element={<Oppo />} />
        <Route path='/realme' element={<Realme />} />
        <Route path='/redmi' element={<Redmi />} />
        <Route path='/kiem-tra-don-hang' element={<KiemTraDonHang />} />
        <Route path='/gio-hang' element={<Giohang />} />
        {/* <Route path='/reno8T' element={<Reno8T />} /> */}
        <Route path='/prod/:id' exact element={<DetailProduct />} />
        <Route path='/search/:searchKey' exact element={<Search />} />
        <Route path='/test' element={<Test/>}/>
        {/* <Route path='/ip14-pm-128gb' element={<Iphone14Promax128GB />} /> */}
        {/* <Route path='/sam-sung-s23' element={<SamSungs23 />} />
        <Route path='/real-me-c55' element={<RealmeC55 />} />
        <Route path='/sam-sung-Z' element={<SamSungZ />} /> */}
      </Routes>
    </div>
  );
}

export default App;
