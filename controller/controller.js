import AuthModel from '../model/UserModel.js'
import ProjectModel from '../model/ProjectModel.js'
import fs from 'fs'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

let saltRounds = 10;
const secret = "highlevelsecret"

export const loginController = async (req, res) => {
    try {
        console.log("LoginController request body--->", req.body);
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(200).send({
                success: flase,
                message: "Please provide email or password"
            })
        }
        let user = await AuthModel.findOne({ email });
        // console.log("User--->",user);
        if (user === null) {
            return res.status(200).send({
                success: false,
                message: "Email is not exist in our server"
            })
        }
        let isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {

            let token = await jwt.sign(JSON.stringify({ email: user.email, name: user.name, id: user._id, role: user.role }), secret);
            console.log("Message--->", "Login Successful");
            res.status(200).send({
                success: true,
                message: "Login Successful",
                data: {
                    user,
                    token
                }
            })
        }
        else {
            res.status(200).send({
                success: false,
                message: "Invalid Password",
            })
        }
    } catch (error) {
        console.log("Error occured in login Controller--->", error);
        res.status(200).send({
            success: false,
            message: "Something Went wrong...Please try again",
            data: error
        })
    }
}

export const registerController = async (req, res) => {
    try {
        console.log("Register Controller--->", JSON.stringify(req.body));
        const { name, email, password } = req.body;
        const encryptPassword = await bcrypt.hash(password, saltRounds);
        // console.log("encryptPassword--->",encryptPassword);
        let newUser = await new AuthModel({ name, email, password: encryptPassword }).save();
        console.log("User created--->");
        let user = await AuthModel.findOne({ email }).select("name email role")
        console.log("user--->", user);
        res.status(201).send({
            success: true,
            message: "User Registered Successfully",
            user
        })

    } catch (error) {
        console.log("Error occured in Register User Controller--->", error);
        res.status(200).send({
            success: false,
            message: "Something Went wrong...Please try again",
            data: error
        })
    }
}

export const createProjectController = async (req, res) => {
    try {
        // console.log("CreateProduct Request Body--->", JSON.stringify(req.fields));
        console.log("Create Project API hit");
        const { name, description, view, source } = req.fields;
        const { photo } = req.files;
        // console.log("Photo--->", photo.type);
        let newProject = await new ProjectModel({ name, description, view, source });
        let val = { ...newProject };
        if (photo) {
            newProject.photo.data = fs.readFileSync(photo.path);
            newProject.photo.contentType = photo.type;
        }
        await newProject.save();
        console.log("New Project added");
        let existingProj1 = await ProjectModel.findById(newProject._id).select('-photo');

        res.status(201).send({
            success: true,
            message: "New Project added Successfully",
            data: existingProj1
        })
    } catch (error) {
        console.log("Error occured in Create Project Controller--->", error);
        res.status(200).send({
            success: false,
            message: "Something Went wrong...Please try again",
            data: error.message
        })
    }

}

export const sendMailController = async (req, res) => {
    try {
        console.log("Request body for send mail--->", JSON.stringify(req.body));
        const { name, email, subject, message } = req.body;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'debasishpatra133@gmail.com',
                pass: 'vbeqzehumknosmcr'
            }
        });
        let toEmail = 'spchandanrkl@gmail.com'
        var mailOptions = {
            from: `${email}`,
            to: `${toEmail}`,
            subject: `${subject}`,
            html: `
            <h3>Hello...Greeting of the Day</h3>
            
            <p>Hi, </p> </p>
            <p>I wanted to contact you related ${subject}. </p>
            <p>name: ${name}, </p>
            <p>email: ${email}, </p>
            <p>subject: ${subject}, </p>
            <p>message: ${message} </p>

            <p>This is an Auto generated mail. Please do not Reply</p>
            <p>For any queries , Please contact System Adminstrator</p>
            <h4>Regards,</h4>
            <p>.......</p>
            `,
        };
        transporter.sendMail(mailOptions, async function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent Successfully");
                res.status(200).send({
                    success: true,
                    message: "Email sent Successfully"
                })
            }
        });
    } catch (error) {
        console.log("Error occured in Send mail Controller--->", error);
        res.status(200).send({
            success: false,
            message: "Something Went wrong...Please try again",
            data: error.message
        })
    }
}

export const getAllProjectController = async (req, res) => {
    try {
        let projDetails = await ProjectModel.find().select('-photo');

        if (projDetails) {
            return res.status(200).send({
                success: true,
                message: "All Projects details fetch successfully",
                data: projDetails
            })
        }
        else {
            return res.status(200).send({
                success: false,
                message: "No project Details found",
            })
        }


    } catch (error) {
        console.log("Error occured in getall project Controller--->", error);
        res.status(200).send({
            success: false,
            message: "Something Went wrong...Please try again",
            data: error.message
        })
    }
}
export const getProjectPhotoController = async (req, res) => {
    try {
        console.log("Image id--->", req.params);
        let { id } = req.params;
        let projDetails = await ProjectModel.findById(id).select('photo');

        // console.log("projDetails--->",projDetails);

        res.set('Content-Type', projDetails.photo.contentType)
        res.send(projDetails.photo.data)

    } catch (error) {
        console.log("Error occured in Get photo Controller--->", error);
        res.status(200).send({
            success: false,
            message: "Something Went wrong...Please try again",
            data: error.message
        })
    }
}

export const deleteProjectController = async (req, res) => {
    try {
        console.log("Delete project id--->", req.params);
        let { id } = req.params;
        if (!id) {
            return res.status(200).send({
                success: false,
                message: "Please provide a valid ID"
            })
        }
        let result = await ProjectModel.findByIdAndDelete(id);
        console.log("Deleted Result--->", result);

        if (result == null) {
            return res.status(200).send({
                success: false,
                message: "No Id found in our server."
            })
        }
        res.status(200).send({
            success: true,
            message: "Project Deleted Successfully",
        })


    } catch (error) {
        console.log("Error occured in delete project Controller--->", error);
        res.status(200).send({
            success: false,
            message: "Something Went wrong...Please try again",
            data: error.message
        })
    }
}