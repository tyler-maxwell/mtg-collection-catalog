import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

const BatchForm = props => {
  const placeholder = `[amount] [card name]\n[amount] [card name]\n...`;

  return (
    <form>
      <div className="form-group">
        <Grid item xs={12}>
          <textarea
            onChange={props.handleInputChange}
            value={props.batchText}
            name="batchText"
            type="text"
            placeholder={placeholder}
            id="batchText"
            rows="4"
            cols="30"
          />
        </Grid>
        <Grid item xs={12}>
          <button
            onClick={props.handleFormSubmit}
            className="btn btn-primary mt-3"
          >
            Add cards to inventory
          </button>
        </Grid>
      </div>
    </form>
  );
};

BatchForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default BatchForm;
