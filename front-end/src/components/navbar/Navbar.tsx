import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import { Select } from '@rebass/forms';
import { setCurrentRecipientId } from '@App/store/actions/index';

import SubTitle from '@App/components/SubTitle';
import Logo from '@App/components/Logo';
import { RootState } from '@App/store/reducers';

const LogoUrl = require('../../assets/images/logo-birdie.svg');

interface NavbarProps {
  setRecipientId: (id: string |  undefined) => void;
  state: {
    events: { careRecipients: Array<{
      care_recipient_id: string
    }>,
    currentRecipientId: string | undefined,
    }
  };
}

interface NavbarState {

}

const NavContainer = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  padding-top: 1%
  padding-left: 5%;
  padding-right: 5%;
`;

class Navbar extends React.Component<NavbarProps, NavbarState> {
  public constructor(props: NavbarProps) {
    super(props);
  }

  onSelectChange(event: React.FormEvent<HTMLSelectElement>) {
    const typeVal: string = event.currentTarget.value;
    const { setRecipientId } = this.props;
    setRecipientId(typeVal);
  }

  public render() {
    const { state } = this.props;
    const { events } = state;
    return (
      <>
        <NavContainer>
          <Logo src={LogoUrl} />
          <div style={{ alignSelf: 'center' }}>
            <SubTitle>Recipient ID</SubTitle>
            <Select
              id="recipient_id"
              name="recipient_select"
              value={events.currentRecipientId}
              onChange={e => this.onSelectChange(e)}
            >
              <option disabled={true} selected={true} value={undefined}> -- select a recipient -- </option>
              {events.careRecipients.map((val) => (
                <option key={val.care_recipient_id}>
                  {val.care_recipient_id}
                </option>
              ))}
            </Select>
          </div>
        </NavContainer>
      </>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: object) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => ({
  setRecipientId: (id: string | undefined) => dispatch(setCurrentRecipientId(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
