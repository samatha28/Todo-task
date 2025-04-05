import './App.css';
import { Layout } from 'antd';
import Nav from './components/Nav';
import Main from './components/Main';
import Foter from './components/Foter';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';

function App() {
  const data = useSelector((state) => state.count);
  console.log("data", data);

  return (
    <BrowserRouter>
      <Layout>
        <Nav />
        <Main />
      </Layout>
      <Foter />
    </BrowserRouter>
    // <h1>{data}</h1>
  );
}

export default App;
