import React from "react";
import { Link, Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
// import Home from "./pages/Home";
import { renderRoutes, RouteConfig } from "react-router-config";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const Root = ({ route }: any) => (
  <div>
    <h1 style={{ color: "orange" }}>Root</h1>
    {/* child routes won't render without this */}
    {renderRoutes(route.routes)}
  </div>
);

const Home = ({ route }: any) => (
  <div>
    <h2 style={{ color: "orange" }}>Home</h2>
    <div>
      <Link to="/">Home</Link>
    </div>
    <div>
      <Link to="/child/1">Child 1</Link>
    </div>
    <div>
      <Link to="/child/2">Child 2</Link>
    </div>
    <div>
      <Link to="/child/3">Child 3</Link>
    </div>
  </div>
);

const Child = (props: any) => {
  console.log(props);
  const { route, location, match } = props;
  const { params } = match;
  return (
    <div>
      <h2 style={{ color: "orange" }}>Child</h2>
      {/* child routes won't render without this */}
      <div>
        <Link to="/">Home</Link>
      </div>
      {!(location.pathname as string).includes("grand-child") ? (
        <div>
          <Link to={`${location.pathname}/grand-child`}>Go to GrandChild</Link>
        </div>
      ) : null}
      {renderRoutes(route.routes, {
        someProp: `${params.id}`,
      })}
    </div>
  );
};

const GrandChild = ({ someProp }: any) => (
  <div>
    <h3 style={{ color: "orange" }}>Soy el grand-child de {someProp}</h3>
  </div>
);

const routes = [
  {
    component: Root,
    routes: [
      {
        path: "/",
        exact: true,
        component: Home,
      },
      {
        path: "/child/:id",
        component: Child,
        routes: [
          {
            path: "/child/:id/grand-child",
            component: GrandChild,
          },
        ],
      },
    ],
  },
];

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* <Route path="/home" component={Home} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/home" />} /> */}
        {renderRoutes(routes)}
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
