import React from 'react';
import './App.css';
import Osm from "../osm";
import Navigation from "../navigation";
import {toast} from 'react-toastify';
import Button from "@material-ui/core/Button";
import {Collapse} from 'react-collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import EvStationIcon from '@material-ui/icons/EvStation';

toast.configure();

const style = {
    backgroundColor: "#86dbad",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "0px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "20px",
    width: "100%",
}

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            from: {name: undefined, coordinates: undefined},
            to: {name: undefined, coordinates: undefined},
            path: [],
            time: '0h 0min',
            distance: 0,
            chargingMarkers: [],
            isOpened: false
        };

        document.oncontextmenu = () => {
            this.clearMap();
            return false;
        };
    }

    setFrom = (from) => {
        this.setState({
            from: from
        });
    };

    setTo = (to) => {
        this.setState({
            to: to
        });
    };

    setRoute = (path, time, distance, chargingMarkers) => {
        this.setState({
            path: path,
            time: time,
            distance: distance,
            chargingMarkers: chargingMarkers
        });
    };

    clearMap = () => {
        this.setState({
            from: {name: undefined, coordinates: undefined},
            to: {name: undefined, coordinates: undefined},
            path: [],
            time: '0h 0min',
            distance: 0,
            chargingMarkers: []
        });
    };

    changeOpen() {
        this.setState({
            isOpened: !this.state.isOpened
        });
    }

    render() {
        return (
            <div>
                <Osm state={this.state}
                     setFrom={this.setFrom}
                     setTo={this.setTo}/>
                <div className='rowC'>
                    {this.state.isOpened && (<Button color="primary" variant="contained"
                                                     onClick={() => this.changeOpen()}><ExpandLessIcon></ExpandLessIcon></Button>)}
                    {!this.state.isOpened && (<Button color="primary" variant="contained"
                                                      onClick={() => this.changeOpen()}><ExpandMoreIcon></ExpandMoreIcon></Button>)}
                    <div style={{minWidth: '300px'}}>
                        <Button color="secondary" onClick={() => window.open("https://github.com/mathonto/maps")}
                                variant="contained">e-Maps<EvStationIcon></EvStationIcon></Button>
                    </div>
                </div>
                <Collapse isOpened={this.state.isOpened}>
                    <Navigation state={this.state}
                                setRoute={this.setRoute}
                                setFrom={this.setFrom}
                                setTo={this.setTo}
                                clearMap={this.clearMap}/>
                </Collapse>
                <div>
                    <div style={style}>
                        Charging Station Icon made by <a
                        href="https://www.flaticon.com/authors/nhor-phai">nhor-phai</a> from <a
                        href="www.flaticon.com">www.flaticon.com</a>
                    </div>
                </div>
            </div>
        );
    }
}