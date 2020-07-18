package com.daas.repositories.daas;

import com.daas.entities.DaaS.DataContentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DataContentTypeRepo extends JpaRepository<DataContentType,Integer> {

    public DataContentType findFirstByContentTypeValue(String contentTypeValue);

}
