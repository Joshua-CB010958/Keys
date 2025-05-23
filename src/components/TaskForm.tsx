import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DatePicker } from './DatePicker';

export function TaskForm({ onSubmit, initialData = null }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    dueDate: initialData?.dueDate || new Date(),
    priority: initialData?.priority || 'Medium',
    assignedTo: initialData?.assignedTo || '',
    leadId: initialData?.leadId || null,
    clientId: initialData?.clientId || null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert the date to ISO string format as expected by the API
    const submitData = {
      ...formData,
      dueDate: formData.dueDate.toISOString()
    };
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          placeholder="Task Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>
      
      <div>
        <Textarea
          placeholder="Task Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div>
        <DatePicker
          date={formData.dueDate}
          setDate={(date) => setFormData({ ...formData, dueDate: date })}
        />
      </div>

      <div>
        <Select
          value={formData.priority}
          onValueChange={(value) => setFormData({ ...formData, priority: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full">
        {initialData ? 'Update Task' : 'Create Task'}
      </Button>
    </form>
  );
}