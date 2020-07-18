package com.daas.utilities.base;

import com.daas.constants.Constants;
import com.daas.entities.DaaS.ProductCategory;
import com.daas.entities.common.Country;
import com.daas.entities.configurations.Configurations;
import com.daas.entities.publications.PublicationsCategory;
import com.daas.repositories.daas.ProductCategoryDetailRepository;
import com.daas.repositories.daas.ProductCategoryRepository;
import com.daas.repositories.daas.ProductTypeRepository;
import com.daas.repositories.iface.common.CountryRepository;
import com.daas.repositories.iface.config.ConfigRepository;
import com.daas.repositories.iface.publications.PublicationsCategoryRepository;
import com.daas.repositories.iface.user.UserRepository;
import lombok.Getter;
import lombok.Setter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;

import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
public abstract class BaseServiceUtil extends Util implements BaseService {


    @Autowired
    protected Environment environment;

    @Autowired
    protected UserRepository userRepository;

    @Autowired
    protected CountryRepository countryRepository;

    @Autowired
    protected PublicationsCategoryRepository publicationsCategoryRepository;

    private List<Country> countriesList = new ArrayList<>();

    private List<PublicationsCategory> categoryList = new ArrayList<>();

    private List<ProductCategory> dataCategorylist;

    private List<ProductCategory> apiCategoryList;

    @Autowired
    protected ConfigRepository configRepository;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Autowired
    private ProductCategoryDetailRepository productCategoryDetailRepository;

    @Autowired
    private ProductTypeRepository productTypeRepository;

    public final static Logger LOG = LogManager.getLogger(BaseServiceUtil.class.getName());

    public String defaultBaseUrl = "";

    public boolean configurationChanged = false;

    public String getBaseUrl() {

        try {
            /*if (!this.configurationChanged && this.defaultBaseUrl != null && !this.defaultBaseUrl.equalsIgnoreCase(""))
                return this.defaultBaseUrl;
            try {
                String baseUrl = this.getConfig(Constants.CONFIG_BASE_URL_STRING);
                this.defaultBaseUrl = baseUrl;
                this.configurationChanged = false;
                return this.defaultBaseUrl;
            } catch (Exception e) {
                LOG.error("No base url defined in Admin Configurations ", e);
            }*/
            return environment.getRequiredProperty("base.url");
        } catch (Exception e) {
            LOG.error("Error getting base url returning default ", e);
        }
        return Constants.BASE_URL;
    }

    public String getAppName() {

        try {
            return environment.getRequiredProperty("app.name");
        } catch (Exception e) {
            LOG.error("Error getting APP Name returning default ", e);
        }
        return Constants.APP_NAME;
    }

    public String getConfig(String property) {
        try {
            Configurations config = configRepository.findFirstByConfigNameAndStatus(property, true);
            if (config != null) {
                return config.getConfigValue();
            }
        } catch (Exception e) {

        }
        return "";
    }

    public String getConfig(String property, String defaultVal) {
        try {
            Configurations config = configRepository.findFirstByConfigNameAndStatus(property, true);
            if (config != null) {
                return config.getConfigValue();
            }
        } catch (Exception e) {

        }
        return defaultVal;
    }

    public List<Country> getAllCountries() {
        try {
            if (this.countriesList.size() <= 0) {
                this.countriesList = countryRepository.findAllByOrderByName();
            }
        } catch (Exception e) {
            LOG.error("error getting countries list ", e);
        }
        return this.countriesList;
    }

    public List<PublicationsCategory> getAllCategories() {
        try {
            if (this.categoryList.size() <= 0 || true) {
                this.categoryList = publicationsCategoryRepository.findAllByStatusOrderByCategoryName(true);
            }
        } catch (Exception e) {
            LOG.error("error getting categories list ", e);
        }
        return this.categoryList;
    }


}
