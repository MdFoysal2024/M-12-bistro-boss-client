import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Main from "../Main/Main";
import Home from "../pages/Home/Home/Home";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    //   errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
  ]);

  export default router;