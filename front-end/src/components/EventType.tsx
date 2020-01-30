import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ResponsivePie } from '@nivo/pie';
import { RootState } from '@App/store/reducers';

interface EventTypeProps {
  state: {
    events: {
      /* tslint:disable:no-any */
      events: Array<any>,
    }
  };
}

interface EventTypeState {
  chartData: Array<{ id: string, value: number }>;
}

class EventType extends React.Component<EventTypeProps, EventTypeState> {
  public constructor(props: EventTypeProps) {
    super(props);
    this.state = {
      chartData: [],
    };
  }

  componentDidUpdate(prevProps: EventTypeProps) {
    const prevEvents = prevProps.state.events.events;
    const currentEvents = this.props.state.events.events;
    if (prevEvents !== currentEvents) {
      // Convert events data into something the chart can understand
      let chartData: Array<{ id: string, value: number }> = [];
      const uniq = currentEvents.map(item => item.event_type).filter((val, index, self) => self.indexOf(val) === index);
      uniq.map((val) => {
        const occurances = currentEvents.reduce((prev, current) => {
          return prev + +(current.event_type === val);
        },                                      0);
        chartData.push({
          id: val,
          value: occurances,
        });
      });
      this.setState({ chartData });
    } 
  }

  public render() {
    return (
      <>
        <div style={{ height: '100%' }}>
          <ResponsivePie
            data={this.state.chartData}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={{ scheme: 'nivo' }}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={6}
            radialLabelsTextColor="#333333"
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={16}
            radialLabelsLinkHorizontalLength={24}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor={{ from: 'color' }}
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="#333333"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
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

export default connect(mapStateToProps, mapDispatchToProps)(EventType);