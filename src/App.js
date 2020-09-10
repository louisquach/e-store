import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import CurrentUserContext from './context/currentUser/currentUserContext'
import ErrorBoundary from './components/error/error.boundery'

const Homepage = lazy( () => import('./pages/homepage/homepage.component'))
const Shoppage = lazy( () => import('./pages/shop/shop.component'))
const CheckOutPage = lazy( () => import('./pages/checkout/checkout.component'))
const SigninAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'))

class App extends React.Component {
  constructor() {
    super();
    this.state = {currentUser: null}
  }
  unsubscribeFromAuth = null;

  componentDidMount() {

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser : {
            id: snapShot.id,
            ...snapShot.data()
            }}); });  }

      this.setState({currentUser: userAuth});
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <CurrentUserContext.Provider value={this.state.currentUser}>
        <Header />
        </CurrentUserContext.Provider>
        <Switch>
          <ErrorBoundary>
          <Suspense fallback={<div>...loading</div>}>
            <Route exact path='/' component={Homepage} />
          <Route path='/shop' component={Shoppage} />
          <Route exact path='/checkout' component={CheckOutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.state.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SigninAndSignUpPage />
              )
            }
          />
          </Suspense>
          </ErrorBoundary>
        </Switch>
      </div>
    );
  }
}

export default App;
