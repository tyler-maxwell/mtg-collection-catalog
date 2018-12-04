import React from "react";
import Grid from '@material-ui/core/Grid';

// Grid Cols accept 2 props
// mSize is the Col width of xs sized screens (i.e. Mobile) 
// size is the Col width of sm sized screens or higher defaults to 12 if given nothing

const Col = props => {
  const otherclasses = props.otherclasses ? props.otherclasses : "";
  return (
    <Grid item xs={props.xsSize ? props.xsSize : null } sm={props.size ? props.size : 12}> 
      {props.children}
    </Grid>
  );
};

export default Col;
