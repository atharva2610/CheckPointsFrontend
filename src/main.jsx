import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { Provider } from "react-redux"
import { store } from "./reduxStore/store.js"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CheckListPage, HomePage, ErrorPage, SignoutPage } from "./pages/index.jsx"
import { AccountForm, SigninForm, SignupForm, ChangePasswordForm } from "./forms/index.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
        <Routes>
          <Route element={<App />}>
            <Route path="" element={<HomePage/>} />
            <Route path="/checklist/:checkListId" element={<CheckListPage/>}/>,
            <Route path="/account" element={<AccountForm/>}/>,
            <Route path="/signin" element={<SigninForm/>} />,
            <Route path="/signup" element={<SignupForm/>} />,
            <Route path="/signout" element={<SignoutPage/>} />,
            <Route path="/change-password" element={<ChangePasswordForm/>} />,
            <Route path="*" element={<ErrorPage/>} />,
          </Route>
        </Routes>
    </Provider>
  </BrowserRouter>
)
