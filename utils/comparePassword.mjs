import bcrypt from "bcrypt"


const comparePassword = async (password, newPassword) => {
    const isPasswordCorrect = await bcrypt.compare(password, newPassword)
    return isPasswordCorrect;
}

export default comparePassword
