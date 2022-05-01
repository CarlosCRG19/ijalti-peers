import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Content, Header } from "components";
import { CreateCompany, CreateOffer, EditOffer, OfferList } from "views";

const App = () => (
  <Router>
    <Header />
    <Content>
      <Routes>
        <Route path="/" element={<OfferList />} />
        <Route path="/create" element={<CreateOffer />} />
        <Route path="/edit/:offerId" element={<EditOffer />} />
        <Route path="/companies/create" element={<CreateCompany />} />
      </Routes>
    </Content>
  </Router>
);

export default App;
