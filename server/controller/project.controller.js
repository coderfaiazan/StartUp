import Project from "../model/Project.Model.js";
const projectmodel = Project;
import Reward from "../model/Reward.Model.js";
const rewardmodel=Reward;
import User from "../model/User.Model.js";
const usermodel=User;
import Post from "../model/Post.Model.js";
const postmodel = Post;
import Comment from "../model/Comments.Model.js";
const commentmodel= Comment;
import cloudinary from "cloudinary";
import fs from "fs/promises";
import AppError from "../utils/error.utils.js";

async function projectRegisteration(req, res, next) {
    try {
        const { title, description, category, fundingGoal, amountRaised, deadline } = req.body;
         console.log("Request",req.body)
        // Check for missing fields
        if (!title || !description || !category || !fundingGoal || !amountRaised || !deadline) {
            return next(new AppError("All fields are required", 400));
        }

        // Check if user is logged in
        const {userid} = req.params;
        const user = await usermodel.findById(userid);
        if (!user) {
            return next(new AppError("User not found", 404));
        }

        // Check if project already exists
        const projectExist = await projectmodel.findOne({ title });
        if (projectExist) {
            return next(new AppError("Project already exists", 400));
        }

        // Create initial project data
        const project = await projectmodel.create({
            title,
            description,
            category,
            fundingGoal,
            amountRaised,
            deadline,
            mediaurls: [{
                public_id: user.email,
                secure_url: 'https://tse2.mm.bing.net/th?id=OIP.rBroxJeka0Jj81uw9g2PwAHaHa&pid=Api&P=0&h=220'
            }]
        });

        if (!project) {
            return next(new AppError("Project not registered, please try again", 500));
        }

        // Check if file is provided
        if (req.file) {
            try {
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'STARTUP',
                    width: 250,
                    height: 250,
                    gravity: 'faces',
                    crop: 'fill'
                });

                // Update project mediaurls with Cloudinary result
                project.mediaurls[0].public_id = result.public_id;
                project.mediaurls[0].secure_url = result.secure_url;

                // Remove file from server
                await fs.rm(`uploads/${req.file.filename}`);
            } catch (err) {
                return next(new AppError(err.message || "File not uploaded, please try again", 404));
            }
        }

        // Add project to user's projects array and save user
        project.creatorId.push(userid);
        await project.save();
        user.projects.push(project._id);
        await user.save();

        res.status(201).json({
            success: true,
            message: "Project registered successfully",
            project
        });
    } catch (err) {
        console.log("Error>>", err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}
async function deleteProject(req, res, next) {
    try {
        const { projectId } = req.params;
        const project = await projectmodel.findById(projectId);

        if (!project) {
            return next(new AppError("Project does not exist", 401));
        }
         if(project.mediaurls && project.mediaurls[0].public_id)
         {
            const publicid=project.mediaurls[0].public_id;
            try {
                await cloudinary.v2.uploader.destroy(publicid);
            } catch (error) {
                return next(new AppError("cant delete file fron cloudinary",403));
            }
         }
        await projectmodel.findByIdAndDelete(projectId);

        res.status(200).json({
            success: true,
            message: "Project deleted successfully"
        });

    } catch (err) {
        console.log("Error>>", err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

async function updateProject(req, res, next) {
    try {
        const { title, description, category, fundingGoal, amountRaised, deadline } = req.body;
        const { id } = req.params;
        //note always take id because we define route like 
        //router.put('/update/:id',upload.single('mediaurls'),isloggedin,updateProject );
        console.log("Project Id:", id);
        console.log("Route Params:", req.params);
        const project = await projectmodel.findById(id);

        if (!project) {
            return next(new AppError("Project does not exist", 401));
        }

        // Update fields
        if (title) project.title = title;
        if (description) project.description = description;
        if (category) project.category = category;
        if (fundingGoal) project.fundingGoal = fundingGoal;
        if (amountRaised) project.amountRaised = amountRaised;
        if (deadline) project.deadline = deadline;

        if (req.file) {
            try {
                // Initialize mediaurls array if not already defined
                if (!project.mediaurls) project.mediaurls = [{}];

                // Delete existing media if present
                if (project.mediaurls[0].public_id) {
                    await cloudinary.v2.uploader.destroy(project.mediaurls[0].public_id);
                }

                // Upload new file to Cloudinary
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'STARTUP',
                    width: 250,
                    height: 250,
                    gravity: 'faces',
                    crop: 'fill'
                });

                // Update project mediaurls with Cloudinary result
                project.mediaurls[0].public_id = result.public_id;
                project.mediaurls[0].secure_url = result.secure_url;

                // Remove file from server
                await fs.rm(`uploads/${req.file.filename}`);
            } catch (err) {
                // Handle file upload error
                return next(new AppError(err.message || "File not uploaded, please try again", 404));
            }
        }

        // Save updated project to database
        await project.save();

        res.status(201).json({
            success: true,
            message: "Project updated successfully",
            project
        });

    } catch (err) {
        console.log("Error>>", err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

async function addReward(req, res, next) {
    try {
        const { projectId, title, description, minContribution, available, estimatedDate } = req.body;

        //Validate required fields
        if (!projectId || !title || !description || !minContribution || !available || !estimatedDate) {
            return next(new AppError("All fields are required", 400));
        }

        // Check if the project exists
        const project = await projectmodel.findById(projectId);
        if (!project) {
            return next(new AppError("Enter a valid Project", 401));
        }

        // Check if reward already exists
        const exist = await rewardmodel.findOne({ title });
        if(exist)
        {
            if (exist.projectId==projectId) {
                return next(new AppError("Reward already exists", 400));
            }
        }

        // Register reward
        const reward = await rewardmodel.create({
            projectId,
            title,
            description,
            minContribution,
            available,
            estimatedDate
        });
        project.rewards.push(reward._id);
        await project.save();
        // Send response
        res.status(201).json({
            success: true,
            message: "Reward added successfully",
            reward
        });
    } catch (err) {
        console.log("Error>>", err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

async function posts(req, res, next) {
    try {
        const{projectId, userId, content}= req.body;
        if(!projectId || !userId || !content){
            return next(new AppError("All fields are required",400));
        }
        //project exist or not
        const project= await projectmodel.findById(projectId);
        if(!project)
        {
            return next(new AppError("Project does not exist",401));
        }
        if(project)
        {
            if(!(project.creatorId.includes(userId)))
            {
             return next(new AppError("Only creators only can post",403));
            }
        }
        const post= await postmodel.create({
            userId,
            projectId,
            content
        })
        if(!post)
        {
            return next(new AppError("Cant register your post",403));
        }
        await post.save();
        project.posts.push(post._id);
        await project.save();
        res.status(201).json({
            success: true,
            message: "post register successfully",
            post
        });

    } catch (err) {
        console.log("Error>>", err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

async function AddComents(req, res, next) {
    try {
        const{postId ,content}= req.body;
        if(!postId  || !content){
            return next(new AppError("All fields are required",400));
        }
        const userId= req.body.user.id;
        const user = await usermodel.findById(userId);
        if (!user) {
            return next(new AppError("User not found", 404));
        }
        const post = await postmodel.findById(postId);
        if(!post)
        {
            return next(new AppError("Post does not exist",404));
        }
        const comment = await commentmodel.create({
            userId:userId,
            postId,
            content
        })
        if(!comment)
        {
            return next(new AppError("Comment not Register"),500);
        }
        post.comments.push(comment._id);
        await post.save();
        res.status(201).json({
            success: true,
            message: "comment register successfully",
            comment
        });


    } catch (err) {
        console.log("Error>>", err);
        return res.status(500).json({
            success: false,
            message: err.message
        });   
    }
}
export { projectRegisteration , addReward, posts,AddComents, updateProject,deleteProject};
