const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();
const {createTask,getTasks,getTaskById,updateTask,deleteTask} = require('../controllers/tasksController')

// Test route
router.get('/test', auth, (req, res) => {
    res.json({
        message: "Tasks routes are working..",

    });
});

router.use(auth)
router.post('/tasks', createTask)
router.get('/tasks', getTasks)
router.route('/tasks/:id').get(getTaskById).put(updateTask).delete(deleteTask)

//create task
/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a task
 *     description: Use this route to create a new task.
 *     tags:
 *       - Create Task
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *             required:
 *               - title
 *     responses:
 *       200:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 _id: 'task_id'
 *                 title: 'Task Title'
 *                 description: 'Task Description'
 *                 dueDate: '2023-12-31'
 *                 user: 'user_id'
 *                 name: 'User Name'
 *               message: 'Task created successfully!'
 *       401:
 *         description: Unauthorized, user not authenticated
 *         content:
 *           application/json:
 *             example:
 *               message: 'Unauthorized'
 */

//Get all tasks
/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get paginated tasks
 *     description: Use this route to retrieve paginated tasks.
 *     tags:
 *       - Get Tasks
 *     security:
 *       - bearerAuth: []  
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination
 *     responses:
 *       200:
 *         description: Paginated tasks retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 - _id: 'task_id_1'
 *                   title: 'Task Title 1'
 *                   description: 'Task Description 1'
 *                   dueDate: '2023-12-31'
 *                   user: 'user_id'
 *                   name: 'User Name'
 *                 - _id: 'task_id_2'
 *                   title: 'Task Title 2'
 *                   description: 'Task Description 2'
 *                   dueDate: '2023-12-31'
 *                   user: 'user_id'
 *                   name: 'User Name'
 *               skip: 0
 *               page: 1
 *               limit: 5
 *               totalTasks: 10
 *               message: 'All tasks found!'
 *       404:
 *         description: No tasks found
 *         content:
 *           application/json:
 *             example:
 *               message: 'No tasks found'
 *       401:
 *         description: Unauthorized, user not authenticated
 *         content:
 *           application/json:
 *             example:
 *               message: 'Unauthorized'
 */

//Update task
/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     description: Use this route to update a task by ID.
 *     tags:
 *       - Update Tasks
 *     security:
 *       - bearerAuth: []  # Use bearerAuth to specify that this endpoint requires a bearer token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *             required:
 *               - title
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 _id: 'task_id'
 *                 title: 'Updated Task Title'
 *                 description: 'Updated Task Description'
 *                 dueDate: '2023-12-31'
 *                 user: 'user_id'
 *                 name: 'User Name'
 *               message: 'Task updated successfully!'
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Task not found'
 *       403:
 *         description: User doesn't have permission to update the task
 *         content:
 *           application/json:
 *             example:
 *               message: "User doesn't have permission to update other user tasks"
 *       401:
 *         description: Unauthorized, user not authenticated
 *         content:
 *           application/json:
 *             example:
 *               message: 'Unauthorized'
 */

// Delete task 
/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Use this route to delete a task by ID.
 *     tags:
 *       - Delete Tasks
 *     security:
 *       - bearerAuth: []  # Use bearerAuth to specify that this endpoint requires a bearer token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to delete
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: 'Task deleted successfully!'
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             example:
 *               message: 'Task not found'
 *       403:
 *         description: User doesn't have permission to delete the task
 *         content:
 *           application/json:
 *             example:
 *               message: "User doesn't have permission to delete other user tasks"
 *       401:
 *         description: Unauthorized, user not authenticated
 *         content:
 *           application/json:
 *             example:
 *               message: 'Unauthorized'
 */

 
module.exports = router;




