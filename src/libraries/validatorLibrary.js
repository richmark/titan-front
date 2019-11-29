import SimpleReactValidator from 'simple-react-validator';

export const oValidatorLibrary = () => {
    var oRules = {
        validators: {
            contact_number: {
                message: 'Invalid contact number!',
                rule: (oVal, oParams, oValidator) => {
                    return oValidator.helpers.testRegex(oVal, /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]+[0-9]$/) && oParams.indexOf(oVal) === -1
                }
            }
        }
    };
    var oValidator = new SimpleReactValidator(oRules);
    return oValidator;
};