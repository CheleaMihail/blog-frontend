import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./App.module.scss";
import Header from "../components/Header";
import { Home, Registration, Login, FullPost, AddPost } from "../pages";
import { useEffect } from "react";
import { fetchAuthMe, selectIsAuth } from "../redux/slices/auth";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/posts/:id" element={<FullPost />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;