import React from "react";
import Grid from '@material-ui/core/Grid';

const Container = props => (
<Grid
    container
    spacing={props.spacing ? props.spacing : 24}
>
  {props.children}
</Grid>
)
export default Container;
