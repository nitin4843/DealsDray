const User = require('../models/login');
const Employee = require('../models/employee');
const employee = require('../models/employee');

exports.getEmployee = async (req, res) => {
    const { userID } = req.user;
    try {
        const employees = await Employee.find({ adminUserId: userID });
        if (!employees) {
            return res.json({ error: true, message: 'No employees exists.' });
        }

        return res.json({ error: false, message: 'Employees fetched successfully.', employees });

    }
    catch (error) {
        return res.json({ error: true, message: 'Unexpected error occurred, please try again.' });
    }
}

exports.postEmployee = async (req, res) => {
    const { image, name, email, mobileNo, designation, gender, course } = req.body;
    const { userID } = req.user;

    if (!image) return res.json({ error: true, message: 'Please insert an image' });
    if (!name) return res.json({ error: true, message: 'Please enter name' });
    if (!email) return res.json({ error: true, message: 'Please enter a valid email' });
    if (!mobileNo) return res.json({ error: true, message: 'Please enter a valid mobileNo' });
    if (!designation) return res.json({ error: true, message: 'Please enter designation' });
    if (!gender) return res.json({ error: true, message: 'Please enter gender' });
    if (!course) return res.json({ error: true, message: 'Please enter course' });

    try {
        const isEmployee = await Employee.findOne({ email, name });

        if (isEmployee) {
            return res.json({ error: true, message: 'Employee already exists.' });
        }

        const employee = new Employee({
            image,
            name,
            email,
            mobileNo,
            designation,
            gender,
            course,
            createDate: new Date().toDateString(),
            adminUserId: userID
        });

        await employee.save();

        return res.json({ error: false, message: 'Employee created successfully' });
    }
    catch (error) {
        console.log(error)
        return res.json({ error: true, error: 'Unexpected error occurred, please try again.' });
    }
}

exports.putEmployee = async (req, res) => {
    const { employeeId } = req.params;
    const { image, name, email, mobileNo, designation, gender, course } = req.body;
    const { userID } = req.user;
    try {

        const employee = await Employee.findOne({ _id: employeeId, adminUserId: userID });
        if (!employee) {
            return res.json({ error: true, message: 'Employee not found.' });
        }

        if (name) employee.name = name;
        if (email) {
            if (employee.email !== email) {
                const isEmployee = await Employee.findOne({ email });
                if (isEmployee) {
                    return res.json({ error: true, message: 'Email already exists.' });
                }
                employee.email = email;
            }
        }
        if (image) employee.image = image;
        if (mobileNo) employee.mobileNo = mobileNo;
        if (designation) employee.designation = designation;
        if (gender) employee.gender = gender;
        if (course) employee.course = course;

        await employee.save();

        return res.json({ error: false, message: 'Employee updated successfully' });
    }
    catch (error) {
        return res.json({ error: true, error: 'Unexpected error occurred, please try again.' });
    }
}

exports.deleteEmployee = async (req, res) => {
    const { employeeId } = req.params;
    const { userID } = req.user;

    try {
        const employee = await Employee.findOne({ _id: employeeId, adminUserId: userID });
        if (!employee) {
            return res.status(404).json({ error: true, message: "Employee not found" });
        }

        await Employee.deleteOne({ _id: employeeId });
        return res.json({
            error: false,
            message: "Employee deleted successfully",
        });
    }
    catch (error) {
        return res.json({ error: true, error: 'Unexpected error occurred, please try again.' });
    }
}

exports.searchEmployees = async (req, res) => {
    const { userID } = req.user
    const { query } = req.query;

    if (!query) {
        return res.json({ error: true, message: 'Search query is required' });
    }

    try {
        const matchingEmployee = await Employee.find({
            adminUserId: userID,
            $or: [
                { name: { $regex: new RegExp(query, "i") } },
                { email: { $regex: new RegExp(query, "i") } },
                { mobileNo: { $regex: new RegExp(query, "i") } },
                { designation: { $regex: new RegExp(query, "i") } },
                { gender: { $regex: new RegExp(query, "i") } },
                { course: { $regex: new RegExp(query, "i") } },
            ],
        });

        return res.json({ error: false, employees: matchingEmployee, message: "Employees matching the search query retrieved successfully" });

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: 'Internal Server Error'
        });
    }
};