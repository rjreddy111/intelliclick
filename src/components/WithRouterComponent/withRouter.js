import { useNavigate, useParams, useLocation } from "react-router-dom";
import React from "react";


function withRouter(Component) {
  return function ComponentWithRouterProp(props) {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();

    return <Component {...props} navigate={navigate} params={params} location={location} />;
  }

 
}

export default withRouter;
