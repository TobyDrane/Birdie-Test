import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { RootState } from '@App/store/reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchAllCareRecipients } from '@App/store/actions/index';

import Navbar from '@App/components/navbar/Navbar';
import Layout from '@App/components/layout/Layout';

interface AppProps {
  fetchCareRecipients: () => void;
  state: {
    events: { loading: boolean };
  };
}

interface AppState {
}

const GlobalStyle = createGlobalStyle`
  body {
    height: 100vh;
    background-color: #F9F9F9;
    > div {
      height: 100%;
    }
  }
`;

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

class App extends React.Component<AppProps, AppState> {
  public constructor(props: AppProps) {
    super(props);
    /* tslint:disable:no-console */
    console.log(props);
  }

  componentDidMount() {
    const { fetchCareRecipients } = this.props;
    fetchCareRecipients();
  }

  public render() {
    const { state } = this.props;
    const { events } = state;
    if (!events.loading) {
      return (
        <>
          <GlobalStyle />
          <AppContainer>
            <Navbar />
            <Layout />
          </AppContainer>
        </>
      );
    }
    return (<p>loading...</p>);
  }
}

const mapStateToProps = (state: RootState, ownProps: object) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => ({
  fetchCareRecipients: () => dispatch(fetchAllCareRecipients())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);