import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';

import * as toolsService from './services/toolsService';
import * as authService from './services/authService';

import Home from './components/Home/Home';
import Navigation from './components/Navigation/Navigation';
import ToolsCatalog from './components/ToolsCatalog/ToolsCatalog'
import Details from './components/Details/Details';
import EditTool from './components/Details/EditTool/EditTool';
import Delete from './components/Details/Delete/Delete';
import AddTool from './components/AddTool/AddTool';
import Footer from './components/Footer/Footer';
import CategoryItems from './components/ToolsCatalog/CategoryItems/CategoryItems';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import MyTools from './components/Profile/MyTools/MyTools';
import MyRents from './components/Profile/MyRents/MyRents';
import NotFound from './components/NotFound/NotFound'
import Loading from './components/Loading/Loading';
import RouteGuard from './components/common/RouteGuard';

function App() {

  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true)
  const [selectedTool, setSelectedTool] = useState(null);
  const [myRents, setMyRents] = useState([])
  const [auth, setAuth] = useState({});
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({
    brand: '',
    category: '',
    description: '',
    imageUrl: '',
    price: '',
    weeklyPrice: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  useEffect(() => {
    toolsService.getAll()
      .then(data => {
        // console.log(data)
        setTools(data);
        setLoading(false)
      })
  }, []);

  const onDetailsTool = async (toolId) => {
    try {
      const tool = await toolsService.getOne(toolId);
      console.log(tool)

      setSelectedTool(tool);
    } catch (error) {
      console.log('Error!!!');
      navigate('/404');
    }
    // console.log(selectedTool);  // asinhronno e i zatowa e null (rezultata idwa predi da se e izpylnilo)
  };



  const onToolAdd = async (data, token) => {

    try {
      const createdTool = await toolsService.create(data, auth.accessToken);
      // createdTool.rented = '';

      setTools(state => [...state, ({ ...createdTool, author: { email: auth.email } })]);
      navigate('/catalog');
    } catch (error) {
      console.log('Error!!!');
      navigate('/404');
    }
  };

  const onToolEdit = async (data, toolId) => {

    try {
      const updatedTool = await toolsService.update(data, data._id, auth.accessToken);
      setTools(state => state.map(x => x._id === data._id ? ({ ...updatedTool, author: { email: auth.email } }) : x));
      navigate(`/details/${data._id}`);
    } catch (error) {
      console.log('Error!!!');
      navigate('/404');
    }

  }

  const onToolDelete = async (toolId) => {
    try {
      await toolsService.remove(toolId, auth.accessToken)
      setTools(state => state.filter(tool => tool._id !== toolId));
      setMyRents(state => state.filter(tool => tool._id !== toolId));
      console.log(tools);
      // navigate('/catalog');
    } catch (error) {
      console.log('Error!!!');
      navigate('/404');
    }
  };

  const formValidate = (e) => {
    const value = e.target.value;
    const categoryArray = ['GPS receivers', 'Laser scanning systems', 'Total stations', 'Drones', 'Levels', 'Accessories'];
    const errors = {};
    if (e.target.name === 'brand' && value.length < 2 && value === '') {
      // setFormErrors(state => ({...state, brand: 'Brand should be at least two characters'}))
      errors.brand = 'Brand should be at least two characters'
    }
    if (e.target.name === 'category' && !categoryArray.includes(value) && value === '') {
      // setFormErrors(state => ({ ...state, category: 'Category do not match' }))
      errors.category = 'Category do not match'
    }
    if (e.target.name === 'description' && (value.length < 5 || value.length > 100) && value === '') {
      // setFormErrors(state => ({ ...state, description: 'Description should be between 5 and 100 characters' }))
      errors.description = 'Description should be between 5 and 100 characters'
    }
    if (e.target.name === 'imageUrl' && !value.startsWith('https://') && value === '') {
      // setFormErrors(state => ({ ...state, imageUrl: 'Image should starts with https://' }))
      errors.imageUrl = 'Image should starts with https://';
    }
    if (e.target.name === 'price' && Number(value) < 0 && value === '') {
      // setFormErrors(state => ({ ...state, price: 'Price should be positive number' }))
      errors.price = 'Price should be positive number'
    }
    if (e.target.name === 'weeklyPrice' && Number(value) < 0 && value === '') {
      // setFormErrors(state => ({ ...state, weeklyPrice: 'Price should be positive number' }))
      errors.weeklyPrice = 'Price should be positive number'
    }
    if (e.target.name === 'email' && (value.length < 8 || value === '')) {
      errors.email = 'Email should be at least 8 characters'
    }
    if (e.target.name === 'password' && (value.length < 5 || value === '')) {
      errors.password = 'Password should be at least 5 characters'
    }
    if (e.target.name === 'repeatPassword') {
      errors.repeatPassword = 'Repeat password do not match'
    }
    setFormErrors(errors);
  };

  const onLoginSubmit = async (data) => {

    try {
      const result = await authService.login(data);
      console.log(result)
      setAuth(result);
      navigate('/')
    }
    catch (error) {
      console.log('Error!!!');
      navigate('/404');

    }
  };

  const onRegisterSubmit = async (values) => {
    const { repeatPassword, ...registerData } = values;
    if (repeatPassword !== registerData.password) {
      return;
    }

    try {
      const result = await authService.register(registerData);
      setAuth(result);
      navigate('/')
    }
    catch (error) {
      console.log('Error!!!')
      navigate('/404');
    }
  };

  const onLogout = async (token) => {
    try {
      await authService.logout(auth.accessToken);
      setAuth({});
    }
    catch (error) {
      console.log('Error!!!')
      navigate('/404');
    }
  };

  const onToolRent = async (toolId) => {
    let myNewRent = await toolsService.getOne(toolId);
    // myNewRent.rented = auth._id
    setMyRents(state => [...state, { ...myNewRent, rented: auth._id }]);
    setTools(state => state.filter(tool => tool._id !== toolId));
    // setTools(state => state.filter(x => x._id !== toolId));
    console.log(myRents)

  }

  const contextValues = {
    tools,
    onLoginSubmit,
    userId: auth._id,
    token: auth.accessToken,
    email: auth.email,
    isAuthenticated: !!auth.accessToken,
    onRegisterSubmit,
    onLogout,
    selectedTool,
    onToolRent,
    myRents,
  }

  return (
    <AuthContext.Provider value={contextValues}>
      <div>
        <Navigation />
        {/* {loading && <Loading />} */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/catalog' element={<ToolsCatalog tools={tools} onDetailsTool={onDetailsTool} />} />
          <Route path='/catalog/:categoryItems' element={<CategoryItems tools={tools} />} />
          <Route path='/details/:toolId' element={<Details {...selectedTool} />} />

          <Route element={<RouteGuard />}>
            <Route path='/add' element={<AddTool onToolAdd={onToolAdd} formErrors={formErrors} formValidate={formValidate} />} />
            <Route path='/details/:toolId/edit' element={<EditTool onToolEdit={onToolEdit} formErrors={formErrors} formValidate={formValidate} />} />
            <Route path='/details/:toolId/delete' element={<Delete onToolDelete={onToolDelete} />} />
            <Route path='/myTools' element={<MyTools tools={tools} />} />
            <Route path='/details/:userId/rent' element={<MyRents />} />
            <Route path='/logout' element={<Logout />} />
          </Route>

          <Route path='/register' element={<Register formErrors={formErrors} formValidate={formValidate} />} />
          <Route path='/login' element={<Login formErrors={formErrors} formValidate={formValidate} />} />
          <Route path='/404' element={<NotFound />} />
          <Route path='*' element={<NotFound />} />


        </Routes>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
