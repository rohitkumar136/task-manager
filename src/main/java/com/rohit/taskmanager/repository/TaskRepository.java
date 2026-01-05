package com.rohit.taskmanager.repository;

import com.rohit.taskmanager.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
	
	boolean existsByTitle(String title);

}
