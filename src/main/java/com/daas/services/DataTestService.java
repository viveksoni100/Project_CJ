package com.daas.services;

import com.daas.entities.DaaS.DataTest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DataTestService extends JpaRepository<DataTest, Integer> {

}
