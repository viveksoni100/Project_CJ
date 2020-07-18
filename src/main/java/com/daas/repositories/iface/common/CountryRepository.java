package com.daas.repositories.iface.common;


import com.daas.entities.common.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {

    List<Country> findAllByStatus(boolean status);

    List<Country> findAllByOrderByName();

    Country findFirstByCode2(String code2);

    @Transactional
    @Query("select c from Country c where c.calling_code=:callingCode")
    List<Country> findByCalling_code(@Param("callingCode") String callingCode);

}
