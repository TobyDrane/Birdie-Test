import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ResponsiveCalendar } from '@nivo/calendar';
import { RootState } from '@App/store/reducers';

function formatDate(date: string) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) { month = '0' + month; }
  if (day.length < 2) { day = '0' + day; }
  return [year, month, day].join('-');
}

interface CalendarProps {
  state: {
    events: {
      /* tslint:disable:no-any */
      events: Array<any>,
    }
  };
}

interface CalendarState {
  chartData: Array<{ day: string, value: number }>;
}

class Calendar extends React.Component<CalendarProps, CalendarState> {
  public constructor(props: CalendarProps) {
    super(props);
    this.state = {
      chartData: [],
    };
  }

  componentDidUpdate(prevProps: CalendarProps) {
    const prevEvents = prevProps.state.events.events;
    const currentEvents = this.props.state.events.events;
    if (prevEvents !== currentEvents) {
      let chartData: Array<{ day: string, value: number }> = [];
      prevEvents.forEach((val) => {
        const date = formatDate(val.timestamp);
        chartData.push({ day: date, value: 1 });
      });
      this.setState({ chartData });
    }
  }

  public render() {
    return (
      <>
        <div style={{ height: '100% '}}>
          <ResponsiveCalendar
            data={this.state.chartData}
            from="2019-01-01"
            to="2019-12-30"
            emptyColor="#eeeeee"
            colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            monthBorderColor="#ffffff"
            dayBorderWidth={2}
            dayBorderColor="#ffffff"
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

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
