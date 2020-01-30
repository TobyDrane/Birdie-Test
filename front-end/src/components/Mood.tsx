import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ResponsiveWaffleHtml } from '@nivo/waffle';
import { RootState } from '@App/store/reducers';

interface MoodProps {
  state: {
    events: {
      /* tslint:disable:no-any */
      events: Array<any>,
    }
  };
}

interface MoodState {
  chartData: Array<{ id: string, value: number }>;
}

class Mood extends React.Component<MoodProps, MoodState> {
  public constructor(props: MoodProps) {
    super(props);
    this.state = {
      chartData: [],
    };
  }

  componentDidUpdate(prevProps: MoodProps) {
    const prevEvents = prevProps.state.events.events;
    const currentEvents = this.props.state.events.events;
    if (prevEvents !== currentEvents) {
      let chartData: Array<{ id: string, value: number, label: string }> = [];
      const filtered = currentEvents.filter((val) => val.event_type === 'mood_observation');
      const happy = filtered.reduce((p, c) => { return p + +(c.payload.mood === 'happy'); }, 0);
      const okay = filtered.reduce((p, c) => { return p + +(c.payload.mood === 'okay'); }, 0);
      const sad = filtered.reduce((p, c) => { return p + +(c.payload.mood === 'sad'); }, 0);
      chartData = [
        { id: 'happy', value: happy, label: 'happy' },
        { id: 'okay', value: okay, label: 'okay' },
        { id: 'sad', value: sad, label: 'sad' },
      ];
      this.setState({ chartData });
    }
  }

  public render() {
    return (
      <>
        <div style={{ height: '100%' }}>
          <ResponsiveWaffleHtml
            data={this.state.chartData}
            total={100}
            rows={6}
            columns={22}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.3 ] ] }}
            animate={true}
            motionStiffness={90}
            motionDamping={11}
          />
        </div>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Mood);
