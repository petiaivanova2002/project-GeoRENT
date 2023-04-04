// import logo from './logo.svg';s
// import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
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

function App() {

  const [tools, setTools] = useState([]);
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
  });

  useEffect(() => {
    toolsService.getAll()
      .then(data => {
        // console.log(data)
        setTools(data);
      })
  }, []);


  const onDetailsTool = async (toolId) => {
    const tool = await toolsService.getOne(toolId);
    console.log(tool)

    setSelectedTool(tool);

    // console.log(selectedTool);  // asinhronno e i zatowa e null (rezultata idwa predi da se e izpylnilo)
  };

  const onToolAdd = async (data, token) => {
    // e.preventDefault();

    // const formData = new FormData(e.currentTarget);
    // console.log(formData)
    // const data = Object.fromEntries(formData);

    const createdTool = await toolsService.create(data, auth.accessToken);
    // createdTool.rented = '';

    setTools(state => [...state, createdTool]);
    navigate('/catalog');

  };

  const onToolEdit = async (data, toolId) => {
    // e.preventDefault();

    // const formData = new FormData(e.currentTarget);
    // const data = Object.fromEntries(formData);

    const updatedTool = await toolsService.update(data, data._id, auth.accessToken);
    setTools(state => state.map(x => x._id === data._id ? updatedTool : x));
    navigate(`/details/${data._id}`);
  }

  const onToolDelete = async (toolId) => {
    await toolsService.remove(toolId, auth.accessToken)
    setTools(state => state.filter(tool => tool._id !== toolId));
    setMyRents(state => state.filter(tool => tool._id !== toolId));
    console.log(tools);
    // navigate('/catalog');
  };

  const formValidate = (e) => {
    const value = e.target.value;
    const categoryArray = ['GPS receivers', 'Laser scanning systems', 'Total stations', 'Drones', 'Levels', 'Accessories'];
    const errors = {};
    if (e.target.name === 'brand' && value.length < 2 && value !== '') {
      // setFormErrors(state => ({...state, brand: 'Brand should be at least two characters'}))
      errors.brand = 'Brand should be at least two characters'
    }
    if (e.target.name === 'category' && !categoryArray.includes(value) && value !== '') {
      // setFormErrors(state => ({ ...state, category: 'Category do not match' }))
      errors.category = 'Category do not match'
    }
    if (e.target.name === 'description' && (value.length < 5 || value.length > 100) && value !== '') {
      // setFormErrors(state => ({ ...state, description: 'Description should be between 5 and 100 characters' }))
      errors.description = 'Description should be between 5 and 100 characters'
    }
    if (e.target.name === 'imageUrl' && !value.startsWith('https://') && value !== '') {
      // setFormErrors(state => ({ ...state, imageUrl: 'Image should starts with https://' }))
      errors.imageUrl = 'Image should starts with https://';
    }
    if (e.target.name === 'price' && Number(value) < 0 && value !== '') {
      // setFormErrors(state => ({ ...state, price: 'Price should be positive number' }))
      errors.price = 'Price should be positive number'
    }
    if (e.target.name === 'weeklyPrice' && Number(value) < 0 && value !== '') {
      // setFormErrors(state => ({ ...state, weeklyPrice: 'Price should be positive number' }))
      errors.weeklyPrice = 'Price should be positive number'
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
      console.log('Error!!!')

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
    }
  };

  const onLogout = async (token) => {
    await authService.logout(auth.accessToken);
    setAuth({});
  };

  const onToolRent = async (toolId) => {
    let myNewRent = await toolsService.getOne(toolId);
    myNewRent.rented = auth._id
    setMyRents(state => [...state, myNewRent]);
    setTools(state => state.filter(x => x._id !== toolId));
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
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/catalog' element={<ToolsCatalog tools={tools} onDetailsTool={onDetailsTool} />} />
          <Route path='/add' element={<AddTool onToolAdd={onToolAdd} formErrors={formErrors} formValidate={formValidate} />} />
          <Route path='/details/:toolId' element={<Details {...selectedTool} />} />
          <Route path='/details/:toolId/edit' element={<EditTool {...selectedTool} onDetailsTool={onDetailsTool} onToolEdit={onToolEdit} formErrors={formErrors} formValidate={formValidate} />} />
          <Route path='/details/:toolId/delete' element={<Delete {...selectedTool} onDetailsTool={onDetailsTool} onToolDelete={onToolDelete} />} />
          <Route path='/catalog/:categoryItems' element={<CategoryItems tools={tools} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/myTools' element={<MyTools tools={tools} />} />
          <Route path='/details/:userId/rent' element={<MyRents />} />
          {/* <Route path='/details/:toolId/rent' element={<Delete {...selectedTool} onToolDelete={onToolDelete} />} /> */}
          <Route path='/404' element={<NotFound />} />

        </Routes>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
