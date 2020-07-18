package com.daas.constants;

public class Constants {
    public static final int VISIT_STATUS_EXPECTED = 0;
    public static final int VISIT_STATUS_CHECKEDIN = 1;
    public static final int VISIT_STATUS_CHECKEDOUT = 2;
    public static final int VISIT_STATUS_NO_SHOW=3;

    public static final String CONFIG_BASE_URL_STRING="BASE_URL";
    public static final String BASE_URL="http://127.0.0.1:8880";
    public static final String APP_NAME="DaaS";
    public static final String BASE_URL_API="http://127.0.0.1:8880/api/v1";
    public static final String VISITOR_IMAGE_URL_API="/visitor/image";

    public static final String FREE_TRIAL_DAYS_CONFIG = "FREE_TRIAL_DAYS";
    public static final String FREE_TRIAL_DAYS_DEFAULT = "30";



    public static final String ROLE_ADMIN="ROLE_ADMIN";
    public static final String ROLE_USER="ROLE_USER";
    public static final String ROLE_EXPIRED="ROLE_EXPIRED";
    public static final String ROLE_SUPER_ADMIN="ROLE_SUPERADMIN";
    public static final String ROLE_CORPORATE="ROLE_CORPORATE";
    public static final String ROLE_SUB_USER="ROLE_SUBUSER";


    public static final Long ROLE_HOME_READ=1l;
    public static final Long ROLE_USER_READ = 2l;
    public static final Long ROLE_COLLEAGUES_READ = 3l;
    public static final Long ROLE_VISITORS_READ = 4l;
    public static final Long ROLE_VISITS_READ = 5l;
    public static final Long ROLE_LOCATIONS_READ = 6l;
    public static final Long ROLE_LOGBOOK_READ = 7l;
    public static final Long ROLE_UPLOAD_COLLEAGUES = 8l;
    public static final Long ROLE_COLLEAGUES_EXPORT = 9l;
    public static final Long ROLE_LOCATIONS_CREATE = 10l;
    public static final Long ROLE_COLLEAGUES_CREATE = 11l;
    public static final Long ROLE_VISITORS_CREATE = 12l;
    public static final Long ROLE_VISITS_CREATE = 13l;
    public static final Long ROLE_VISITS_CHANGE_STATUS = 14l;
    public static final Long ROLE_LOGBOOK_EXPORT = 16l;
    public static final Long ROLE_USER_RIGHGT_UPDATE = 17l;
    public static final Long ROLE_USER_CREATE = 18l;
    public static final Long ROLE_VISIT_SETTINGS_READ=19l;
    public static final Long ROLE_VISIT_SETTINGS_CREATE=20l;
    public static final Long ROLE_VISITS_DELETE=21l;



    public static final String LOCATION_ID_KEY="locationId";



    public static final Long STATUS_CHANGE_WINDOW=1l;




    /*public static final Map<String, String> CUSTOM_V;
    static {
        Map<String, String> aMap = new HashMap<>();
        aMap.put("Company", "{{Company_Name}}");
        CUSTOM_V = Collections.unmodifiableMap(aMap);
    }*/


    public static final String[] CUSTOM_VARIABLES_KIOSK= new String[] {"{{company_name}}"};
    public static final String[] CUSTOM_VARIABLES_KIOSK1= new String[] {"{{company_name}}", "{{Host_Name}}", "{{Visitor_FirstName}}", "{{Host_FirstName}}", "{{Host_Name}}"};


    /**
     * Integration app names
     */

    public static final String GOOGLE_APP_CALENDAR="Calendar";
    public static final String GOOGLE_APP_DRIVE="Drive";
    public static final String ONE_DRIVE_APP="Onedrive";

    /**
     * Payment gateways
     */

    public static final String PAYMENT_GATEWAY_STRIPE="STRIPE";
    public static final String PAYMENT_GATEWAY_PAYPAL="PAYPAL";

    /**
     * user free trial package
     */
    public static final Integer AVAILABLE_HOSTS=1;
    public static final Integer AVAILABLE_VISITORS=10;


    public static final Long DEFAULT_TIME_ZONE_ID = 379l;


    public static final String IMAGE_MAX_HEIGHT_CONFIG = "IMAGE_MAX_HEIGHT";
    public static final String IMAGE_MAX_HEIGHT_CONFIG_VAL = "250";
    public static final String IMAGE_MAX_WIDTH_CONFIG = "IMAGE_MAX_WIDTH";
    public static final String IMAGE_MAX_WIDTH_CONFIG_VAL = "322";


}

