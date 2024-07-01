import { EmployeeLeave } from "../models/models.employeeLeave.js";
import { EmployeeSalary } from "../models/models.EmployeeSalaree.js";
import { LeaveReport } from "../models/models.leaveReport.js";
import { Project } from "../models/models.project.js";
import { ProjectReport } from "../models/models.projectReport.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    //console.log(userId);
    const userInstance = await User.findById(userId);
    //console.log(userInstance);
    const accessToken = await userInstance.generateAccessToken();
    const refreshToken = await userInstance.generateSessionToken();
    userInstance.refreshToken = refreshToken;
    userInstance.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(400, "something went wrong while generating the tokens");
  }
};

const loginAdmin = asyncHandler(async (req, res) => {
  //req body ->data
  //username or email
  //find the user
  //check the password
  //access and refresh token generation
  //send cookies

  const { username, password } = req.body;
  //console.log(req.body);
  if (!username) {
    throw new ApiError(400, "username is required");
  }
  if (!password) {
    throw new ApiError(400, "password is required");
  }

  const existedUser = await User.findOne({ username });
  if (!existedUser) {
    throw new ApiError(404, "you are not registered yet");
  }

  const isPasswordValid = await existedUser.isPasswordCorrect(password);
  //console.log(isPasswordValid);
  if (!isPasswordValid) {
    // throw new ApiError(404, "invalid user credentials");
    return res.status(404).json({ message: "invalid user credentials" });
  }
  // res.status(200).json({
  //   user: existedUser,
  // });

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(existedUser._id);

  // console.log(accessToken);
  // console.log(refreshToken);

  //console.log(accessToken, refreshToken);

  //by default anyone from the frontend also can modify the cookies
  //but we dont want that to happen, we want to modify the cookies only from the server
  //hence we use this
  const options = {
    httpOnly: true,
    secure: true, // Ensure this is true if using HTTPS
    sameSite: "None",
  };
  //you can send with the key value pair within the string is key and another one is value
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: existedUser,
          accessToken,
          refreshToken,
        },
        "user loggedin successfully"
      )
    );
});

const getEmployeesList = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) res.status(400).json({ message: "employees not found" });
    return res.status(200).send(users);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //get the input from the user or frontend
  //validate the input
  //check if the user is already exists
  //create user object-create entry in db
  //remove the password and refresh token feild form response
  //check for user creation
  //return response

  const { username, fullname, email, password, phoneNumber, role } = req.body;

  if (!fullname || !email || !username || !password || !phoneNumber || !role) {
    throw new ApiError(400, "All feilds are required");
  }

  const existedUser = await User.findOne({
    username,
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  const newUser = await User.create({
    fullname,
    email,
    username,
    password,
    phoneNumber,
    role,
  });
  const createdUser = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registering the user");
  }
  // console.log(createdUser);

  return res
    .status(200)
    .json(new ApiResponse(200, newUser, "user registered successfully"));
});

const addSalary = async (req, res) => {
  try {
    const { month, salaryAmount, user } = req.body;
    if (!salaryAmount)
      return res.status(400).json({ message: "salaryAmount is required" });
    const newSalary = await EmployeeSalary.create({
      month,
      user,
      salaryAmount,
    });
    if (!newSalary) {
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json({ salaree: newSalary });
  } catch (error) {
    return res.status(400).send(error);
  }
};

const addProject = async (req, res) => {
  try {
    const {
      projectTitle,
      clientName,
      projectType,
      developingPlatform,
      databaseTechnology,
      projectDescription,
      projectManager,
    } = req.body;
    if (!projectTitle) {
      return res.status(400).json({ message: "project Name is required" });
    }
    if (!clientName) {
      return res.status(400).json({ message: "clientName is required" });
    }
    if (!projectType) {
      return res.status(400).json({ message: "projectType is required" });
    }
    if (!databaseTechnology) {
      return res
        .status(400)
        .json({ message: "databaseTechnology is required" });
    }
    if (!developingPlatform) {
      return res
        .status(400)
        .json({ message: "developingPlatform is required" });
    }
    if (!projectDescription) {
      return res
        .status(400)
        .json({ message: "projectDescription is required" });
    }
    if (!projectManager) {
      return res
        .status(400)
        .json({ message: "projectDescription is required" });
    }
    const newProject = await Project.create({
      projectTitle,
      clientName,
      projectType,
      developingPlatform,
      databaseTechnology,
      projectDescription,
      projectManager,
    });
    if (!newProject) {
      return res.status(400).json({ message: "Project could not be created" });
    }

    // Send success response
    return res.status(200).json({ message: "Project created successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
};

const getSalareeDetails = async (req, res) => {
  try {
    const salarees = await EmployeeSalary.find();
    if (!salarees)
      return res.status(400).json({ message: "No employees salarees found" });
    res.status(200).json({ salarees: salarees });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const getProjectList = async (req, res) => {
  try {
    const projects = await Project.find();
    if (!projects) res.status(400).json({ message: "projects not found" });

    res.status(200).json({ projects: projects });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getProjectReportList = async (req, res) => {
  try {
    const projectReports = await ProjectReport.find();
    if (!projectReports)
      res.status(400).json({ message: "Project Reports not found" });
    res.status(200).json({ projectReports: projectReports });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getLeaveReportList = async (req, res) => {
  try {
    const leaves = await LeaveReport.find();
    if (!leaves) throw new ApiError(400, "Leave Reports not found");
    return res.status(200).json({ LeaveReports: leaves });
  } catch (error) {
    // console.log("nikhil");
    res.status(400).json({ message: "nikjhil" });
  }
};

const updateLeaveReport = async (req, res) => {
  try {
    const { user, status, leaveId } = req.body;
    const leaves = await LeaveReport.findByIdAndUpdate(
      { _id: leaveId },
      { status: status }
    );

    if (!leaves) throw new ApiError(400, "Leave Reports not found");
    return res.status(200).json({ LeaveReports: leaves });
  } catch (error) {
    // console.log("nikhil");
    res.status(400).json({ message: "something went wrong" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { username } = req.body;
    const instance = await User.findOneAndDelete({ username });
    if (!instance)
      return res.status(400).json({ message: "Something went wrong" });
    return res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteSalary = async (req, res) => {
  try {
    const { salaryId } = req.body;
    const instance = await EmployeeSalary.findByIdAndDelete({ _id: salaryId });
    if (!instance)
      return res.status(400).json({ message: "Something went wrong" });
    return res.status(200).json({ message: "Salary deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteProjectReport = async (req, res) => {
  try {
    const { reportId } = req.body;
    const instance = await ProjectReport.findByIdAndDelete({ _id: reportId });
    if (!instance)
      return res.status(400).json({ message: "Something went wrong" });
    return res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const fetchSingleProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) return res.status(400).json({ message: "project not found" });
    return res.status(200).json({ project: project });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const updateProjectDetails = async (req, res) => {
  const { projectId } = req.params;
  const updateData = req.body;

  try {
    // Find the project by ID and update with the provided data
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      updateData,
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res
      .status(200)
      .json({
        message: "Project updated successfully",
        project: updatedProject,
      });
  } catch (error) {
    res.status(500).json({ message: "Error updating project", error });
  }
};

export {
  loginAdmin,
  addSalary,
  getEmployeesList,
  getSalareeDetails,
  addProject,
  getProjectList,
  getProjectReportList,
  registerUser,
  getLeaveReportList,
  updateLeaveReport,
  deleteEmployee,
  deleteSalary,
  deleteProjectReport,
  fetchSingleProject,
  updateProjectDetails,
};
