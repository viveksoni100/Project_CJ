package com.daas.repositories.iface.config;


import com.daas.entities.configurations.Configurations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ConfigRepository extends JpaRepository<Configurations, Long> {

    Configurations findFirstByConfigName(String configName);

    Configurations findFirstByConfigNameAndStatus(String configName, Boolean status);

    Configurations findFirstById(Long id);

    Page<Configurations> findByConfigNameContainingAndConfigValueContaining(String configName, String configValue, Pageable pageable);

    Page<Configurations> findByConfigNameLikeAndConfigValueLike(String configName, String configValue, Pageable pageable);
}
