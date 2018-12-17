import React from "react";

const ManaCost = props => {
  return <React.Fragment>{getManaSymbols(props.manaCost)}</React.Fragment>;
};

const getManaSymbols = manaString => {
  let manaArray = manaString.split("{"); // remove opening {
  manaArray.splice(0, 1); // Get rid of empty cost ""
  manaArray = manaArray.map(mana => mana.slice(0, -1)); // remove closing }

  return (
    <React.Fragment>
      {manaArray.map(mana => {
        let style = "mana small ";
        console.log("mana", mana);

        switch (mana) {
          case "0":
            style += "s0";
            break;
          case "1":
            style += "s1";
            break;
          case "2":
            style += "s2";
            break;
          case "3":
            style += "s3";
            break;
          case "4":
            style += "s4";
            break;
          case "5":
            style += "s5";
            break;
          case "6":
            style += "s6";
            break;
          case "7":
            style += "s7";
            break;
          case "8":
            style += "s8";
            break;
          case "9":
            style += "s9";
            break;
          case "10":
            style += "s10";
            break;
          case "11":
            style += "s11";
            break;
          case "12":
            style += "s12";
            break;
          case "13":
            style += "s13";
            break;
          case "14":
            style += "s14";
            break;
          case "15":
            style += "s15";
            break;
          case "16":
            style += "s16";
            break;
          case "17":
            style += "s17";
            break;
          case "18":
            style += "s18";
            break;
          case "19":
            style += "s19";
            break;
          case "20":
            style += "s20";
            break;
          case "X":
            style += "sx";
            break;
          case "Y":
            style += "sy";
            break;
          case "Z":
            style += "sz";
            break;
          case "W":
            style += "sw";
            break;
          case "U":
            style += "su";
            break;
          case "B":
            style += "sb";
            break;
          case "R":
            style += "sr";
            break;
          case "G":
            style += "sg";
            break;
          case "W/U":
            style += "swu";
            break;
          case "W/B":
            style += "swb";
            break;
          case "U/B":
            style += "sub";
            break;
          case "U/R":
            style += "sur";
            break;
          case "B/R":
            style += "sbr";
            break;
          case "B/G":
            style += "sbg";
            break;
          case "R/W":
            style += "srw";
            break;
          case "R/G":
            style += "srg";
            break;
          case "G/W":
            style += "sgw";
            break;
          case "G/U":
            style += "sgu";
            break;
          case "2/W":
            style += "s2w";
            break;
          case "2/U":
            style += "s2u";
            break;
          case "2/B":
            style += "s2b";
            break;
          case "2/R":
            style += "s2r";
            break;
          case "2/G":
            style += "s2g";
            break;
          case "W/P":
            style += "swp";
            break;
          case "U/P":
            style += "sup";
            break;
          case "B/P":
            style += "sbp";
            break;
          case "R/P":
            style += "srp";
            break;
          case "G/P":
            style += "sgp";
            break;
        }

        return <span className={style} />;
      })}
    </React.Fragment>
  );
};

export default ManaCost;
