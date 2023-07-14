import { useState } from "react";

const SignUp = () => {
  const [signUpInfo, setSignUpInfo] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    dniPassport: "",
    phone: 0,
    country: "",
    dateOfBirth: "",
    gender: "",
  });

  const handleSignUpChanges = (e) => {
    e.preventDefault();
    setSignUpInfo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {" "}
        <input
          name="fullname"
          onChange={handleSignUpChanges}
          value={signUpInfo.fullname}
          type="text"
          placeholder="Fullname here please"
        />
      </div>
      <div><input
        name="email"
        onChange={handleSignUpChanges}
        value={signUpInfo.email}
        type="text"
        placeholder="Fullname here please"
      />
      </div>
      <div><input
        name="password"
        onChange={handleSignUpChanges}
        value={signUpInfo.password}
        type="password"
        placeholder="Fullname here please"
      />
      </div>
      <div><input
        name="confirmPassword"
        onChange={handleSignUpChanges}
        value={signUpInfo.confirmPassword}
        type="password"
        placeholder="Fullname here please"
      />
      </div>
      <div><input
        name="dniPassport"
        onChange={handleSignUpChanges}
        value={signUpInfo.dniPassport}
        type="text"
        placeholder="Fullname here please"
      />
      </div>
      <div><input
        name="phoneNumber"
        onChange={handleSignUpChanges}
        value={signUpInfo.phone}
        type="tel"
        placeholder="Fullname here please"
      />
      </div>
      <div><input
        name="country"
        onChange={handleSignUpChanges}
        value={signUpInfo.country}
        type="text"
        placeholder="Fullname here please"
      />
      </div>
     <div> <input
        name="dateOfBirth"
        onChange={handleSignUpChanges}
        value={signUpInfo.dateOfBirth}
        type="date"
        min="1950/01/01"
        max="2023/07/15"
        placeholder="Fullname here please"
      />
      </div>
      <div><select onChange={handleSignUpChanges}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="binary">Binary</option>
        <option value="notBinary">Not-Binary</option>
        <option value="none">None</option>
      </select>
      </div>

      <button> Sign Up</button>
    </form>
  );
};

export default SignUp;
