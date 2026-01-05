package com.rohit.taskmanager.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.rohit.taskmanager.entity.Task;
import com.rohit.taskmanager.repository.TaskRepository;

@Service

public class TaskServiceImpl implements TaskService {

	private final TaskRepository taskRepository;

	public TaskServiceImpl(TaskRepository taskRepository) {
		super();
		this.taskRepository = taskRepository;
	}

	@Override
	public Task createTask(Task task) {
	    if (taskRepository.existsByTitle(task.getTitle())) {
	        throw new RuntimeException("Task already exists");
	    }
	    task.setCreatedAt(LocalDateTime.now());
	    return taskRepository.save(task);
	}


	@Override
	public List<Task> getAllTasks() {
		return taskRepository.findAll();
	}

	@Override
	public Task getTaskById(Long id) {
		return taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
	}

	@Override
	public Task updateTask(Long id, Task task) {
		Task existing = getTaskById(id);
		existing.setTitle(task.getTitle());
		existing.setDescription(task.getDescription());
		existing.setStatus(task.getStatus());
		return taskRepository.save(existing);
	}

	@Override
	public void deleteTask(Long id) {
		taskRepository.deleteById(id);
	}
}
