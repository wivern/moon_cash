'use strict';

import React from "react";
import {Toolbar, ToolbarGroup} from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class AppLayout extends React.Component {
    render() {
        var childrenWithProps = React.Children.map(this.props.children,
            child => React.cloneElement(child, {}));
        return <div><MuiThemeProvider>
            <Toolbar>
                <ToolbarGroup firstChild={true}>
                    <IconButton><MoreVertIcon /></IconButton>
                </ToolbarGroup>
            </Toolbar>
        </MuiThemeProvider>
            {childrenWithProps}
        </div>;
    }
}

AppLayout.childContextTypes = {
    muiTheme: React.PropTypes.object,
    history: React.PropTypes.object
};

export default AppLayout;