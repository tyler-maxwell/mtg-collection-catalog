import React from "react";

const ManaCost = props => {
  return <React.Fragment>{getManaSymbols(props.manaCost)}</React.Fragment>;
};

const getManaSymbols = manaString => {
  let manaArray = manaString.split("{"); // remove opening {
  manaArray.splice(0, 1); // Get rid of empty cost ""
  manaArray = manaArray.map(mana => mana.slice(0, -1)); // remove closing }

  console.log(manaArray);

  return (
    <React.Fragment>
      {manaArray.map(mana => {
        const manaStyle = "se"; // Energy symbols by default to identify wrong conversion
        switch (mana) {
          case mana === "0":
            manaStyle = "s0";
            break;
        }

        const style = "mana medium " + manaStyle;

        return <span className={style} />;
      })}
    </React.Fragment>
  );
};

export default ManaCost;
