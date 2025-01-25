const prisma = require('@/utils/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const fs = require('fs/promises'); 
const sendEmail = require('@/utils/sendEmail');

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
    const user = await prisma.user.create({
        data: userData,
    });

    await sendVerificationEmail(user);

    return user;
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
    return jwt.sign({userId: user.id, email: user.email}, process.env.JWT_SECRET, {expiresIn: '2 days'});
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

const sendVerificationEmail = async (user) => {
    const token = crypto.randomBytes(128).toString('hex');
    console.log(token);
    
    const verificationToken = await prisma.userEmailVerificationToken.create({
        data: {
            token,
            userId: user.id,
        },
    });

    const emailVerificationLink = `${process.env.BACKEND_URL}api/user/verify-email?token=` + token;

    const values = {
        name: user.name,
        url: emailVerificationLink
    };

    const verifyEmailTemplate = await fs.readFile('src/emailTemplates/verify-email.html','utf-8');

    const emailContent = verifyEmailTemplate.replace(/{{(.*?)}}/g, (match, p1) => values[p1.trim()]);

    console.log(verifyEmailTemplate);
    
    
    const options = {
        to: user.email,
        subject: 'Verify your email to access Spendsync',
        message: emailContent
    };

    

    const response = await sendEmail(options);

    console.log(response);


}

const verifyEmail = async (token) => {
    if(!token) {
        throw new Error('Invalid token');
    }

    const emailVerificationToken = await prisma.userEmailVerificationToken.findUnique({
        where: {
            token
        }
    });

    if(!emailVerificationToken) {
        throw new Error('Invalid token');
    }

    if(emailVerificationToken.isUsed) {
        throw new Error('Token is used already');
    }

    try {
        const user = await prisma.user.update({
            where: {
                id: emailVerificationToken.userId
            },
            data: {
                isVerified: true
            }
        });
        await prisma.userEmailVerificationToken.update({
            where: {
                token
            },
            data: {
                isUsed: true
            }
        })
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = {
    createUser,
    loginUser,
    getUser,
    verifyEmail
}
