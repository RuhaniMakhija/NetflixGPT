export const validateData=(email,password)=>{

    const isEmailValid=/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isPasswordValid=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    if(!isEmailValid) return "Email is not valid";
    if(!isPasswordValid) return "Password is not valid";

    return null;
}

export const validateName=(name)=>{
    const isNameValid=/^[A-Za-z]+([A-Za-z]+)*/.test(name);
    if(!isNameValid) return "Full Name is not valid"

    return null;
}