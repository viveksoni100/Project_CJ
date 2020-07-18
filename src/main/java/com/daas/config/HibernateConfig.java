package com.daas.config;

//import oracle.jdbc.pool.OracleDataSource;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.jdbc.datasource.init.DataSourceInitializer;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.orm.hibernate5.HibernateTransactionManager;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Properties;
import java.util.regex.Pattern;

@Configuration
@EnableTransactionManagement
public class HibernateConfig {

    public static final Logger logger = LogManager.getLogger(HibernateConfig.class);


    @Autowired
    private Environment environment;

    /**
     * @return Entity manager
     */
    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource());
        em.setPackagesToScan(new String[]{"com.daas.entities"});

        JpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);
        em.setPersistenceUnitName("data");
        em.setJpaProperties(hibernateProperties());

        return em;
    }


    /**
     * @return : Session factory
     */
    @Bean
    public LocalSessionFactoryBean localSessionFactoryBean() {

        LocalSessionFactoryBean sessionFactory = new LocalSessionFactoryBean();
        sessionFactory.setDataSource(dataSource());
        sessionFactory.setPackagesToScan(new String[]{"com.daas.entities"});
        sessionFactory.setHibernateProperties(hibernateProperties());

        return sessionFactory;
    }


    @Bean
    @Primary
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(environment.getProperty("spring.datasource.driver.class"));
        dataSource.setUrl(environment.getProperty("spring.datasource.url"));
        dataSource.setUsername(environment.getProperty("spring.datasource.username"));
        dataSource.setPassword(environment.getProperty("spring.datasource.password"));
        return dataSource;
    }


    /**
     * @return : Set hibernate properties
     */
    private Properties hibernateProperties() {
        Properties properties = new Properties();
        properties.put("hibernate.dialect", environment.getRequiredProperty("hibernate.dialect"));
        properties.put("hibernate.show_sql", environment.getRequiredProperty("hibernate.show_sql"));
        properties.put("hibernate.format_sql", environment.getRequiredProperty("hibernate.format_sql"));
        properties.put("hibernate.hbm2ddl.auto", "update");

        properties.put("hibernate.jdbc.batch_size", 2);
        properties.put("hibernate.order_inserts", true);
        properties.put("hibernate.order_updates", true);
        properties.put("hibernate.jdbc.batch_versioned_data", true);

        properties.put("javax.persistence.validation.mode", "none");
        properties.put("hibernate.use_sql_comments", environment.getRequiredProperty("hibernate.use_sql_comments"));
        properties.put("logging.level.org.hibernate.SQL", "DEBUG");
        properties.put("logging.level.org.hibernate.type.descriptor.sql", "TRACE");
        //properties.put("enable_lazy_load_no_trans", true);

        return properties;
    }


    /**
     * @return Jpa transaction manager as a bean
     */
    @Bean(name = "transactionManager")
    public JpaTransactionManager geJpaTransactionManager() {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(entityManagerFactory().getObject());
        return transactionManager;
    }


    /**
     * @param sessionFactory : sessionFactory bean
     * @return : Transaction manager which will being autowired when needed
     */
    @Autowired
    public HibernateTransactionManager transactionManager(SessionFactory sessionFactory) {
        HibernateTransactionManager txManager = new HibernateTransactionManager();
        txManager.setSessionFactory(sessionFactory);
        return txManager;
    }


    @Bean
    public DataSourceInitializer dataSourceInitializer() {
        ResourceDatabasePopulator resourceDatabasePopulator = new ResourceDatabasePopulator();
        try {
            String required = environment.getProperty("initial.db.required");
            String requiredCustomScripts = environment.getProperty("initial.db.required.custom");
            if (required != null && required.equalsIgnoreCase("true")) {
                //resourceDatabasePopulator.execute(dataSource());
            }
            if (required != null && required.equalsIgnoreCase("false") && requiredCustomScripts != null && requiredCustomScripts.equalsIgnoreCase("true")) {
                executeCustomDbScripts();
            }

            if(requiredCustomScripts != null && requiredCustomScripts.equalsIgnoreCase("true")){
             /*   executeFromOneFile();*/
            }

        } catch (Exception e) {
            logger.error("Error initializing database " + e.getStackTrace() + e.getMessage() + e.getCause());
        }
        DataSourceInitializer dataSourceInitializer = new DataSourceInitializer();
        dataSourceInitializer.setDataSource(dataSource());
        dataSourceInitializer.setDatabasePopulator(resourceDatabasePopulator);
        return dataSourceInitializer;
    }

    private void executeFromOneFile() throws IOException {
        ResourceDatabasePopulator customResourceDatabasePopulator = new ResourceDatabasePopulator();
// add script to custom resource
        customResourceDatabasePopulator.addScript(new ClassPathResource("/data/unexecuted/write_unexecuted_queries_here.sql"));
        customResourceDatabasePopulator.execute(dataSource());

    }

    public boolean executeCustomDbScripts() {

        /*Integer year = Calendar.getInstance().get(Calendar.YEAR);
        Integer month = Calendar.getInstance().get(Calendar.MONTH) + 1;
        Integer date = Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
        String directory = "/dbscripts/upload/unexecuted/" + year.toString() + "/" + (month < 10 ? ('0' + month.toString()) : (month.toString())) + "/" + (date < 10 ? ('0' + date.toString()) : (date.toString()));*/
        String directory = environment.getRequiredProperty("db.unexecuted.scripts.path");
        String separator = environment.getRequiredProperty("db.scripts.separator");
        String unexecutedFolderName = environment.getRequiredProperty("db.scripts.unexecuted.folder.name");
        String executedBasePath = environment.getRequiredProperty("db.executed.scripts.path") + separator;
        String executedFolderName = environment.getRequiredProperty("db.scripts.executed.folder.name");

        try {
            //File dbScriptFolder = new ClassPathResource(directory).getFile();

            List<File> listOfFiles = new ArrayList<>();
            // Get list of files in folder and sub folder in /resources/dbscripts
            listf(directory, listOfFiles, true);

            // Sort them so you can manage execution order(order is date and then number in the name of file)
            // like 201810101.sql and 201810102.sql [year][month][day][sequence].[extension]
            Collections.sort(listOfFiles);

            for (File f : listOfFiles) {
                if (f.isFile()) {


                    String[] splitPath = f.getAbsolutePath().split(Pattern.quote(File.separator) + "data");
                    logger.info("Split path : " + splitPath.toString());
                    String absolutePathDestination = executedBasePath + splitPath[1].replace(unexecutedFolderName, executedFolderName);
                    logger.error("path : " + absolutePathDestination);
                    File destinationFile = new File(absolutePathDestination);
                    logger.info("file exist ? " + destinationFile.getAbsolutePath());
                    logger.error("file exist ? " + destinationFile.getAbsolutePath());
                    // check if this file is already executed before
                    if (!destinationFile.exists()) {
                        try {
                            logger.info("file not exist -> " + destinationFile.getAbsolutePath());
                            logger.error("file not exist -> " + destinationFile.getAbsolutePath());
                            // if not executed previously
                            String[] absolutePath = f.getAbsolutePath().split(Pattern.quote(File.separator) + "data");
                            ResourceDatabasePopulator customResourceDatabasePopulator = new ResourceDatabasePopulator();
                            // add script to custom resource
                            customResourceDatabasePopulator.addScript(new ClassPathResource(separator + absolutePath[1]));
                            //execute it
                            customResourceDatabasePopulator.execute(dataSource());
                        } catch (Exception e) {
                            logger.error("Error executing script  " + f.getAbsolutePath() + " ==> " + e.getCause() + e.getMessage() + e.getStackTrace());
                        }
                        // move that file to executed folder
                        Path sourcePath = f.toPath();
                        destinationFile.getParentFile().mkdirs();
                        Path destinationPath = destinationFile.toPath();
                        try {
                            Files.copy(sourcePath, destinationPath);
                        } catch (IOException e) {
                            logger.error("Error moving db script file to executed folder " + e.getCause() + e.getMessage() + e.getStackTrace(), e);
                        }
                    }
                    // delete this file in any case
                    f.delete();
                }
            }
        } catch (IOException e) {
            logger.error("Error reading files and loading initial db scripts " + e.getMessage() + e.getStackTrace() + e.getCause());
            return false;
        }
        return true;
    }


    public void listf(String directoryName, List<File> files, boolean first) throws IOException {
        File directory;
        if (first)
            directory = new ClassPathResource(directoryName).getFile();
        else
            directory = new File(directoryName);

        logger.info("Directory scanned : " + directory.getAbsolutePath());
        // Get all files from a directory.
        File[] fList = directory.listFiles();
        if (fList != null)
            for (File file : fList) {
                if (file.isFile()) {
                    files.add(file);
                } else if (file.isDirectory()) {
                    listf(file.getAbsolutePath(), files, false);
                }
            }
    }


}
