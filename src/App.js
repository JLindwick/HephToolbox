import React from "react";
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';
import './App.css';
import { Responsive, WidthProvider } from "react-grid-layout";
//import ChatComponent from './components/ChatComponent.js';
//import QuickCommands from './components/QuickCommands.js';
//import QuickCommandsList from './components/QuickCommandsList.js';
import ChatSettings from './components/chatSettings.js';
//import SpeechCommands from './components/SpeechCommands.js';
import Threedeespace from './components/threedeespace.js';
//import io from 'socket.io-client';
//const socket = io('https://fusionpaloalto.elliotsyoung.com');
const ResponsiveReactGridLayout = WidthProvider(Responsive);
var layout = [
  {i: "first", x: 0, y: 0, w: 1, h: 2, },
  {i: "second", x: 1, y: 2, w: 1, h: 2, }
];
class ToolBoxItem extends React.Component {
  render() {
    return (
      <div
        className="toolbox__items__item"
        onClick={this.props.onTakeItem.bind(undefined, this.props.item)}
      >
        {this.props.item.i}
      </div>
    );
  }
}
class ToolBox extends React.Component {
  render() {
    return (
      <div className="toolbox">
        <span className="toolbox__title"><center>Toolbox</center></span>
        <div className="toolbox__items">
          {this.props.items.map(item => (
            <ToolBoxItem
              key={item.i}
              item={item}
              onTakeItem={this.props.onTakeItem}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default class ToolboxLayout extends React.Component {
  static defaultProps = {
    className: "layout",
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    initialLayout: layout
  };

  state = {
    currentBreakpoint: "lg",
    compactType: "vertical",
    mounted: false,
    layouts: { lg: this.props.initialLayout },
    toolbox: { lg: [] }
  };

  componentDidMount() {
    this.setState({ mounted: true });
  }

  onBreakpointChange = breakpoint => {
    this.setState(prevState => ({
      currentBreakpoint: breakpoint,
      toolbox: {
        ...prevState.toolbox,
        [breakpoint]:
          prevState.toolbox[breakpoint] ||
          prevState.toolbox[prevState.currentBreakpoint] ||
          []
      }
    }));
  };

  onTakeItem = item => {
    this.setState(prevState => ({
      toolbox: {
        ...prevState.toolbox,
        [prevState.currentBreakpoint]: prevState.toolbox[
          prevState.currentBreakpoint
        ].filter(({ i }) => i !== item.i)
      },
      layouts: {
        ...prevState.layouts,
        [prevState.currentBreakpoint]: [
          ...prevState.layouts[prevState.currentBreakpoint],
          item
        ]
      }
    }));
  };

  onPutItem = item => {
    this.setState(prevState => {
      return {
        toolbox: {
          ...prevState.toolbox,
          [prevState.currentBreakpoint]: [
            ...(prevState.toolbox[prevState.currentBreakpoint] || []),
            item
          ]
        },
        layouts: {
          ...prevState.layouts,
          [prevState.currentBreakpoint]: prevState.layouts[
            prevState.currentBreakpoint
          ].filter(({ i }) => i !== item.i)
        }
      };
    });
  };

  render() {
    return (
      <div>
        <ToolBox
          items={this.state.toolbox[this.state.currentBreakpoint] || []}
          onTakeItem={this.onTakeItem}
        />

        <ResponsiveReactGridLayout
          {...this.props}
          layouts={this.state.layouts}
          measureBeforeMount={false}
          useCSSTransforms={this.state.mounted}
          compactType={this.state.compactType}
          preventCollision={!this.state.compactType}
        >
          {
            <div key={"first"}>
            <div className="hide-button" onClick={this.onPutItem.bind(this, "first")}>
              &times;
            </div>
            {
              <span className="text"><ChatSettings handleVoiceChange={this.handleVoiceChange}/></span>
            }
            </div>
          }
          {
            <div key={"second"}>
            <div className="hide-button" onClick={this.onPutItem.bind(this, "second")}>
              &times;
            </div>
            {
              <span className="text"><Threedeespace/></span>
            }
            </div>
          }
        </ResponsiveReactGridLayout>
      </div>
      );
  }
}
