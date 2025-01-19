const prisma = require('@/utils/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (data) => {
    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10); // Convert SALT_ROUNDS to a number
    if (isNaN(saltRounds)) {
        throw new Error('Invalid SALT_ROUNDS value in environment variables');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    const userData = {
        ...data, // Spread the original data
        password: hashedPassword, // Overwrite the password with the hashed version
    };

    // Create the user in the database
    return await prisma.user.create({
        data: userData,
    });
}

const loginUser = async (data) => {
    const user = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });

    if (!user) {
        throw new Error('User not found');
    }

    if (!user.isVerified) {
        throw new Error('User is not verified');
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (!passwordMatch) {
        throw new Error('Invalid password');
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2 days' })

    return token;
}

const getUser = async (email) => {
    
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    const { password, id, ...userWithoutSensitiveData } = user;
    return userWithoutSensitiveData;   
}

module.exports = {
    createUser,
    loginUser,
    getUser
}
