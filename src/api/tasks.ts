import { z } from 'zod';

const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  dueDate: z.string(), // Expect ISO string format
  priority: z.enum(['Low', 'Medium', 'High']),
  assignedTo: z.number().nullable(),
  leadId: z.number().nullable(),
  clientId: z.number().nullable()
});

export async function createTask(taskData) {
  try {
    // Validate the task data
    const validatedData = taskSchema.parse(taskData);
    
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create task');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}