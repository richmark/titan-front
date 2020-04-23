import SimpleReactValidator from "simple-react-validator";

export const oValidatorLibrary = () => {
  var oRules = {
    validators: {
      contact_number: {
        message: "Invalid contact number!",
        rule: (oVal, oParams, oValidator) => {
          return (
            oValidator.helpers.testRegex(
              oVal,
              /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]+[0-9]$/
            ) && oParams.indexOf(oVal) === -1
          );
        }
      },
      password: {
        message:
          "Password must be minimum of six characters, at least one letter and one number",
        rule: (oVal, oParams, oValidator) => {
          return (
            oValidator.helpers.testRegex(
              oVal,
              /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
            ) && oParams.indexOf(oVal) === -1
          );
        }
      },
      date_difference: {
        message: "End date can not be earlier than start date.",
        rule: (oVal, oParams, oValidator) => {
          if (oVal[0] === "" || oVal[1] === "") {
            return true;
          }
          return new Date(oVal[0]).getTime() < new Date(oVal[1]).getTime();
        }
      },
      valid_url: {
        message: "Invalid url! Must include http protocol",
        rule: (oVal, oParams, oValidator) => {
          return (
            oValidator.helpers.testRegex(
              oVal,
              /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
            ) && oParams.indexOf(oVal) === -1
          );
        }
      }
    }
  };
  var oValidator = new SimpleReactValidator(oRules);
  return oValidator;
};
