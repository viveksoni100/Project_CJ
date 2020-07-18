package com.daas.repositories.iface.config;


import com.daas.entities.configurations.ThemeConfig;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ThemeConfigRepository extends JpaRepository<ThemeConfig, Long> {

    ThemeConfig findFirstByConfigName(String configName);

    ThemeConfig findFirstByConfigNameAndStatus(String configName, Boolean status);

    List<ThemeConfig> findAllByStatus(Boolean status);

    ThemeConfig findFirstById(Long id);

    Page<ThemeConfig> findByConfigNameContainingAndConfigValueContaining(String configName, String configValue, Pageable pageable);
}
