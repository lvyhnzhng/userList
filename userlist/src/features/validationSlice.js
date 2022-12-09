import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorMessages: {
    firstname: [],
    lastname: [],
    age: [],
    sex: [],
    password: [],
    confirmPassword: [],
  },
  isValid: {
    firstname: false,
    lastname: false,
    age: false,
    sex: false,
    password: false,
    confirmPassword: false,
  },
};
const requirements = {
  isRequired: (name, str) => {
    if (!str) {
      return `${name} is required`;
    }
    return;
  },
  isMinLenth: (name, str, minNum) => {
    if (str.length < minNum) {
      return `${name} should be at least 3 characters`;
    }
    return;
  },
  noDigit: (name, str) => {
    const reg = /^[A-Za-z]+$/;
    const test = reg.test(str);

    if (!test) {
      return `no numbers or special characters are allow in ${name}`;
    }
  },
  isSex: (name, str) => {
    if (str !== "female" && str !== "male") {
      return `type in "female" or "male"`;
    }
    return;
  },
  isAge: (name, str) => {
    const test = /^[1-9][0-9]?$|^100$/.test(str);
    if (!test) {
      return `type in a number between 1 to 100`;
    }
  },
  validPassword: (name, str) => {
    const test = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(str);
    if (!test) {
      return `a valid ${name} must contain at least 8 characters with numbers, lower case and upper case letters`;
    }
  },
  isSame: (name, str1, str2) => {
    if (str1 !== str2) {
      return `make sure to type as same as the password`;
    }
  },
};

const validationSlice = createSlice({
  name: "validation",
  initialState,
  reducers: {
    checkValidation(state, actions) {
      //   console.log(actions.payload);
      const { name, updateTex } = actions.payload;
      state.errorMessages[name] = [];
      const requireError = requirements.isRequired(name, updateTex);
      const noDigitError = requirements.noDigit(name, updateTex);
      if (requireError) {
        state.errorMessages[name].push(requireError);
      }
      switch (name) {
        case "firstname":
          const firstNameLengthError = requirements.isMinLenth(
            name,
            updateTex,
            3
          );
          if (firstNameLengthError) {
            state.errorMessages[name].push(firstNameLengthError);
          }

          if (noDigitError) {
            state.errorMessages[name].push(noDigitError);
          }

          break;
        case "lastname":
          const lastNameLengthError = requirements.isMinLenth(
            name,
            updateTex,
            3
          );
          if (lastNameLengthError) {
            state.errorMessages[name].push(lastNameLengthError);
          }

          if (noDigitError) {
            state.errorMessages[name].push(noDigitError);
          }
          break;
        case "sex":
          const validSexError = requirements.isSex(name, updateTex);
          if (validSexError) {
            state.errorMessages[name].push(validSexError);
          }
          break;
        case "age":
          const validAgeError = requirements.isAge(name, updateTex);
          if (validAgeError) {
            state.errorMessages[name].push(validAgeError);
            state.isValid[name] = false;
          }
          break;
        case "password":
          const validPasswordError = requirements.validPassword(
            name,
            updateTex
          );
          if (validPasswordError) {
            state.errorMessages[name].push(validPasswordError);
          }
          break;
        case "confirmPassword":
          const samePasswordError = requirements.isSame(
            name,
            updateTex,
            actions.payload.password
          );
          if (samePasswordError) {
            state.errorMessages[name].push(samePasswordError);
          }
          break;
      }
    },
    setIsValid(state, actions) {
      const name = actions.payload;
      if (state.errorMessages[name].length === 0) {
        state.isValid[name] = true;
      } else {
        state.isValid[name] = false;
      }
    },
  },
});
export default validationSlice.reducer;
export const { checkValidation, setIsValid } = validationSlice.actions;
