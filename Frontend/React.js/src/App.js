import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './component/theme/theme';
import { useEffect } from 'react';
import { getUser } from './component/State/Authentication/Action';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from './component/State/Cart/Action';
import { Routers } from './Routers/Routers';

function App() {
  const dispatch=useDispatch();
  const token=localStorage.getItem("token");
  const {auth, cart}=useSelector(store=>store);

  useEffect(()=>{
    if(token || auth.token)
      dispatch(getUser(auth.token || token));
  }, [token, dispatch, auth.token]);
  useEffect(()=>{
    if(auth.user || token){
      dispatch(getCart(token));
    }
  },[auth.user, token, dispatch, cart.cartItems]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Routers/>
    </ThemeProvider>
  );
}

export default App;
