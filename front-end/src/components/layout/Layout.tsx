import * as React from 'react';
import styled from 'styled-components';

import LayoutChild from '@App/components/layout/LayoutChild';
import EventType from '@App/components/EventType';
import Mood from '@App/components/Mood';
import Calendar from '@App/components/Calendar';
import Title from '@App/components/Title';
import SubTitle from '@App/components/SubTitle';

interface LayoutProps {

}

interface LayoutState {

}

const LayoutContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  padding: 2%;
`;

class Layout extends React.Component<LayoutProps, LayoutState> {
  public constructor(props: LayoutProps) {
    super(props);
  }

  public render() {
    return (
      <>
        <LayoutContainer>
          <div className="w-6/12 flex flex-col mr-4">
            <LayoutChild>
              <Title>Mood</Title>
              <SubTitle>Cumulative score of mood.</SubTitle>
              <Mood />
            </LayoutChild>
            <LayoutChild marginTop={true}>
              <Title>Visit Calendar</Title>
              <Calendar />
            </LayoutChild>
          </div>
          <LayoutChild halfWidth={true}>
            <Title>Event Types</Title>
            <SubTitle>How many of each event were carried on visits.</SubTitle>
            <EventType />
          </LayoutChild>
        </LayoutContainer>
      </>
    );
  }
}

export default Layout;