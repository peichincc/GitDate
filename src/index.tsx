import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { createStore } from "redux";
import allReducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";

import App from "./App";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Signin from "./pages/profile/Signin";
import Signup from "./pages/profile/Signup";
import Member from "./pages/profile/Member";
import Readme from "./pages/profile/Readme";
import CreateIssue from "./pages/issue/CreateIssue";
import Issue from "./pages/issue/Issue";
import IssueAll from "./pages/issue/IssuesAll";
import ChatList from "./components/user/ChatList";
import CreateBranch from "./pages/branch/CreateBranch";
import Branch from "./pages/branch/Branch";
import BranchAll from "./pages/branch/BranchesAll";
import MapHome from "./components/map/index";
import Repo from "./pages/chatroom/Repo";

const store = createStore(allReducers, composeWithDevTools());
export type RootState = ReturnType<typeof store.getState>;

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="member" element={<Member />} />
          <Route path="readme/:id" element={<Readme />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="createissue" element={<CreateIssue />} />
          <Route path="issue/:id" element={<Issue />} />
          <Route path="issues" element={<IssueAll />} />
          <Route path="repo" element={<Repo />} />
          <Route path="chatlist" element={<ChatList />} />
          <Route path="createbranch" element={<CreateBranch />} />
          <Route path="branch/:id" element={<Branch />} />
          <Route path="branches" element={<BranchAll />} />
          <Route path="map" element={<MapHome />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
