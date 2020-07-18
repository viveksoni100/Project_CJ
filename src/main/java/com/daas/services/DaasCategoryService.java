package com.daas.services;

import com.daas.entities.DaaS.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DaasCategoryService extends JpaRepository<Category,Integer> {

}
