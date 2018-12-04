import React from "react";
import Grid from '@material-ui/core/Grid';

const Row = props => (
<Grid
    container
    direction="row"
    justify="flex-start"
    alignItems="flex-start"
>
  {props.children}
</Grid>
)
export default Row;
