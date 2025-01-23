const multer = require("multer"); // Import multer for file uploads
const fs = require("fs"); // Import fs for file system operations
const path = require("path"); // Import path for handling file paths
const csv = require("csv-parser"); // Import csv-parser to parse CSV files
const Agent = require("../models/agentModel"); // Import agent model for agent-related operations
const Task = require("../models/taskModel"); // Import task model for saving tasks

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save the uploaded file to the "uploads/" directory
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Rename the uploaded file to include a timestamp and original file extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize multer with the storage configuration and file validation
const upload = multer({
  storage: storage, // Use the configured storage settings
  fileFilter: (req, file, cb) => {
    // Only allow CSV, XLSX, and XLS files
    const filetypes = /csv|xlsx|xls/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    // If the file type is valid, allow the upload
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      // Reject the file if it's not a valid type
      cb(new Error("Invalid file type. Only CSV, XLSX, and XLS are allowed."));
    }
  },
}).single("file"); // Handle single file upload with the field name "file"

// Endpoint to handle file upload and task distribution
exports.uploadAndDistributeList = async (req, res) => {
  console.log("Received file:", req.file); // Log the received file for debugging
  upload(req, res, async (err) => {
    if (err) {
      // Log any errors that occur during the upload process
      console.log("Error in upload middleware:", err.message);
      return res.status(400).json({ message: err.message });
    }

    console.log("File uploaded successfully:", req.file);

    try {
      const tasks = []; // Array to hold the tasks for distribution
      const agents = await Agent.find(); // Fetch all agents from the database

      // Ensure there are exactly 5 agents available
      if (agents.length !== 5) {
        return res
          .status(400)
          .json({ message: "There must be exactly 5 agents." });
      }

      const agentCount = agents.length; // Get the number of agents
      let agentIndex = 0; // Initialize the agent index for task assignment

      const filePath = path.join(__dirname, "../uploads", req.file.filename); // Get the file path for the uploaded file
      fs.createReadStream(filePath)
        .pipe(csv()) // Pipe the CSV file to the csv-parser
        .on("data", (row) => {
          // Process each row from the CSV file
          const task = {
            firstName: row.FirstName, // Extract first name from CSV row
            phone: row.Phone, // Extract phone number from CSV row
            notes: row.Notes, // Extract notes from CSV row
            assignedTo: agents[agentIndex]._id, // Assign task to the current agent
          };
          tasks.push(task); // Add the task to the tasks array
          console.log("Task created:", task);

          // Move to the next agent, looping back to the first agent when all agents are used
          agentIndex = (agentIndex + 1) % agentCount;
        })
        .on("end", async () => {
          try {
            // Save all tasks to the database
            const savedTasks = await Task.insertMany(tasks);
            console.log("Tasks saved:", savedTasks);

            // Associate each task with an agent by updating the agent's tasks array
            for (let i = 0; i < savedTasks.length; i++) {
              const task = savedTasks[i];
              const agent = agents[i % agentCount]; // Get the corresponding agent
              // Add the task to the agent's tasks array in the database
              await Agent.findByIdAndUpdate(agent._id, {
                $push: { tasks: task._id },
              });
            }

            // Clean up the uploaded file after processing (delete from filesystem)
            fs.unlinkSync(filePath);

            // Populate the tasks for each agent and send them back in the response
            const updatedAgents = await Agent.find().populate("tasks");

            // Map agents with their tasks for the response
            const agentsWithTasks = updatedAgents.map((agent) => ({
              agentName: agent.name,
              tasks: agent.tasks.map((task) => ({
                firstName: task.firstName,
                phone: task.phone,
                notes: task.notes,
              })),
            }));

            // Send the success response with agent names and their tasks
            res.status(200).json({
              message: "File uploaded and tasks distributed successfully",
              agents: agentsWithTasks,
            });
          } catch (error) {
            // Log any errors that occur while saving tasks or associating them with agents
            console.error("Error saving tasks:", error);
            res.status(500).json({ message: "Error processing file" });
          }
        });
    } catch (error) {
      // Log any errors that occur during the file reading or task distribution process
      console.error("Error processing file:", error);
      res.status(500).json({ message: "Error processing file" });
    }
  });
};
