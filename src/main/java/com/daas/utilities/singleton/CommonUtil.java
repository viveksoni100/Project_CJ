package com.daas.utilities.singleton;


import com.daas.alerts.Alerts;
import com.daas.utilities.base.Util;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.client.RestOperations;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import javax.validation.ConstraintViolation;
import java.awt.*;
import java.awt.geom.Rectangle2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.time.temporal.ChronoUnit.DAYS;


/**
 * Few common methods which can be used through whole application
 * Not going to explain them :D
 */
public class CommonUtil extends Util {


    public static final Logger logger = LogManager.getLogger(CommonUtil.class.getName());
    public static final String DATE_PATTERN_SERVICE = "YYYY-MM-dd'T'HH:mm:ss.SSS";

    private static final String EMAIL_REGEX = "^[\\w-\\+]+(\\.[\\w]+)*@[\\w-]+(\\.[\\w]+)*(\\.[a-z]{2,})$";

    private static Pattern pattern;
    private static Matcher matcher;


    @Autowired
    public static ServletContext servletContext;

    @Autowired
    public static RestOperations restTemplate;


    public static String generateToken() {
        String token = UUID.randomUUID().toString();
        return token;
    }

    /**
     * Custom method to set page title
     *
     * @param title
     * @param model
     */
    public static void setPageTitle(String title, ModelMap model) {
        model.addAttribute("defaultPageTitle", title);
    }


    public static String getContextPath() {
        return servletContext.getContextPath();
    }


    /**
     * Convert price amount from string to amount
     * removes all ","
     *
     * @param price
     * @return
     */
    public static String plainStringPrice(String price) {
        String formattedPrice = "";
        if (price != null && !price.equals("")) {
            formattedPrice = price.replaceAll(",", "");
        }
        return formattedPrice;
    }

    /**
     * Formate numbers in 2 decimal
     *
     * @param number
     * @return
     */
    public static String formatPrice(String number) {
        try {
            number = CommonUtil.plainStringPrice(number);
            double amount = Double.parseDouble(number);
            DecimalFormat formatter = new DecimalFormat("#,##0.##");
            return formatter.format(amount);
        } catch (NumberFormatException e) {
            logger.error("Number formate exception for number : " + number + " : ");
        } catch (Exception e) {
            logger.error("Error formatting number " + number + " : ");
        }
        return "";
    }


    /**
     * Check content type of uploaded file to verify correct file type
     *
     * @param contentType
     * @param ALLOWED_FILE_TYPES
     * @return
     */
    public static Boolean isValidContentType(String contentType, String[] ALLOWED_FILE_TYPES) {
        if (!Arrays.asList(ALLOWED_FILE_TYPES).contains(contentType)) {
            return false;
        }
        return true;
    }


    /**
     * Check if provided string is Double value or not
     *
     * @param str
     * @return
     */
    public static boolean isDouble(String str) {
        try {
            Double.parseDouble(str);
            if (str.matches("^[0-9]*\\.?[0-9]*$")) {
                return true;
            } else {
                return false;
            }

        } catch (Exception e) {
            return false;
        }
    }


    public static Double strToDouble(String str) {
        try {
            return (Double.parseDouble(CommonUtil.plainStringPrice(str)));
        } catch (Exception e) {

        }
        return 0d;
    }


    /**
     * Generate OPT for specific length
     *
     * @param len
     * @return
     */
    public static String OTP(int len) {
        // Using numeric values
        String numbers = "0123456789";

        // Using random method
        Random rndm_method = new Random();

        char[] otp = new char[len];

        for (int i = 0; i < len; i++) {
            // Use of charAt() method : to get character value
            // Use of nextInt() as it is scanning the value as int
            otp[i] =
                    numbers.charAt(rndm_method.nextInt(numbers.length()));
        }
        return String.copyValueOf(otp);
    }


    public static String generatePassword(int len) {
        try {

            System.out.println("Generating password using random() : ");
            System.out.print("Your new password is : ");

            // A strong password has Cap_chars, Lower_chars,
            // numeric value and symbols. So we are using all of
            // them to generate our password
            String Capital_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            String Small_chars = "abcdefghijklmnopqrstuvwxyz";
            String numbers = "0123456789";
            String symbols = "!@#$%^&*_=+-/.?<>)";


            String values = Capital_chars + Small_chars +
                    numbers + symbols;

            // Using random method
            Random rndm_method = new Random();

            char[] password = new char[len];

            for (int i = 0; i < len; i++) {
                // Use of charAt() method : to get character value
                // Use of nextInt() as it is scanning the value as int
                password[i] =
                        values.charAt(rndm_method.nextInt(values.length()));

            }
            return password.toString();
        } catch (Exception e) {
            logger.error("Error generating password " + e.getMessage());
        }
        return null;
    }


    public static boolean isLoggedIn() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication instanceof AnonymousAuthenticationToken) {
            return false;
        }
        return true;
    }


    public static boolean compareDoubleBtc(Double amount1, Double amount2) {
        return ((Math.round(amount1 * 100000000.0) / 100000000.0) != (Math.round(amount2 * 100000000.0) / 100000000.0));
    }

    public static File convertMultipartToFile(MultipartFile file) throws IOException {
        try {
            File convFile = new File(System.getProperty("java.io.tmpdir") + "/" + file.getOriginalFilename());
            file.transferTo(convFile);
            return convFile;
            //return convFile;
        } catch (IOException e) {
            throw new IOException("Error converting multipart to file", e);
        }
    }


    public static void addImageWatermark(File watermarkImageFile, File sourceImageFile, File destImageFile) {
        try {
            BufferedImage sourceImage = ImageIO.read(sourceImageFile);
            BufferedImage watermarkImage = ImageIO.read(watermarkImageFile);

            // initializes necessary graphic properties
            Graphics2D g2d = (Graphics2D) sourceImage.getGraphics();
            AlphaComposite alphaChannel = AlphaComposite.getInstance(AlphaComposite.SRC_OVER, 0.7f);
            g2d.setComposite(alphaChannel);

            // calculates the coordinate where the image is painted
            int topLeftX = (sourceImage.getWidth() - watermarkImage.getWidth()) / 2;
            int topLeftY = (sourceImage.getHeight() - watermarkImage.getHeight()) / 2;

            // paints the image watermark
            g2d.drawImage(watermarkImage, topLeftX, topLeftY, null);

            //ImageIO.write(sourceImage, "png", destImageFile);
            g2d.dispose();

            System.out.println("The image watermark is added to the image.");

        } catch (IOException ex) {
            System.err.println(ex);
        }
    }

    public static void addTextWatermark(String text, String type, File source, File destination) throws IOException {


        BufferedImage image = ImageIO.read(source);

        // determine image type and handle correct transparency
        int imageType = "png".equalsIgnoreCase(type) ? BufferedImage.TYPE_INT_ARGB : BufferedImage.TYPE_INT_RGB;
        BufferedImage watermarked = new BufferedImage(image.getWidth(), image.getHeight(), imageType);

        int width = image.getWidth();
        int height = image.getHeight();
        // initializes necessary graphic properties
        Graphics2D w = (Graphics2D) watermarked.getGraphics();
        w.drawImage(image, 0, 0, null);
        AlphaComposite alphaChannel = AlphaComposite.getInstance(AlphaComposite.SRC_OVER, 0.4f);
        w.setComposite(alphaChannel);
        w.setColor(Color.GRAY);
        int fractionHeight = 0;
        if (width > 100) {
            w.setFont(new Font(Font.SANS_SERIF, Font.BOLD, 20));
            fractionHeight = image.getHeight() / 10;
        } else {
            w.setFont(new Font(Font.SANS_SERIF, Font.BOLD, 5));
            fractionHeight = image.getHeight() / 5;
        }
        FontMetrics fontMetrics = w.getFontMetrics();
        Rectangle2D rect = fontMetrics.getStringBounds(text, w);

        // calculate center of the image
        int centerX = (image.getWidth() - (int) rect.getWidth()) / 2;
        int centerY = image.getHeight() / 2;

        int fractionWidth = image.getWidth() / 3;


        // add text overlay to the image
        do {
            do {
                w.drawString(text, width - fractionWidth, height - fractionHeight);
                width = width - fractionWidth;


            } while (width >= 0);
            width = image.getWidth();
            height = height - fractionHeight;
        } while (height >= 0);


//        w.drawString(text, centerX-20, centerY-20);
//        w.drawString(text, centerX-30, centerY-30);
//        w.drawString(text, centerX-40, centerY-40);
//        w.drawString(text, centerX-50, centerY-50);
//        w.drawString(text, centerX-60, centerY-60);
        ImageIO.write(watermarked, type, destination);
        w.dispose();
    }

    public static int calculateWaterMarkTextSize(int height, int width) {
        int fontSize = 20;
        if (height / 10 > fontSize) {
            return fontSize;
        } else {
            fontSize = height / 10;
            return fontSize;

        }

    }


    public static String booleanToYesNo(Boolean variable) {
        if (variable == false) {
            return "No";
        } else if (variable == true) {
            return "Yes";
        }

        return "No";
    }

    public static String replaceLast(String text, String regex, String replacement) {
        return text.replaceFirst("(?s)" + regex + "(?!.*?" + regex + ")", replacement);
    }

    public static long getDifferenceDays(Date d1, Date d2) {
        long diff = d2.getTime() - d1.getTime();
        return TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS);
    }

    public static long getDifferenceDays(java.time.LocalDate d1, java.time.LocalDate d2) {
        return DAYS.between(d1, d2);
    }


    public static String displayCurrencyCode(Currency currency) {
        try {
            if (currency != null) {
                return currency.getCurrencyCode();
            }
        } catch (Exception e) {
            logger.error("Error displaying currency " + e.getStackTrace() + e.getMessage());
        }
        return "";
    }


    public static void saveScaledImage(String imageUrl, String targetPath) {
        final int imageSize = 100;
        File thumbnail = new File(targetPath);

        try {
            thumbnail.getParentFile().mkdirs();
            thumbnail.createNewFile();
            BufferedImage sourceImage = ImageIO.read(new File(imageUrl));
            float width = sourceImage.getWidth();
            float height = sourceImage.getHeight();

            BufferedImage img2;
            if (width > height) {
                float scaledWidth = (width / height) * (float) imageSize;
                float scaledHeight = imageSize;

                BufferedImage img = new BufferedImage((int) scaledWidth, (int) scaledHeight, sourceImage.getType());
                Image scaledImage = sourceImage.getScaledInstance((int) scaledWidth, (int) scaledHeight, Image.SCALE_SMOOTH);
                img.createGraphics().drawImage(scaledImage, 0, 0, null);

                int offset = (int) ((scaledWidth - scaledHeight) / 2f);
                img2 = img.getSubimage(offset, 0, imageSize, imageSize);
            } else if (width < height) {
                float scaledWidth = imageSize;
                float scaledHeight = (height / width) * (float) imageSize;

                BufferedImage img = new BufferedImage((int) scaledWidth, (int) scaledHeight, sourceImage.getType());
                Image scaledImage = sourceImage.getScaledInstance((int) scaledWidth, (int) scaledHeight, Image.SCALE_SMOOTH);
                img.createGraphics().drawImage(scaledImage, 0, 0, null);

                int offset = (int) ((scaledHeight - scaledWidth) / 2f);
                img2 = img.getSubimage(0, offset, imageSize, imageSize);
            } else {
                img2 = new BufferedImage(imageSize, imageSize, sourceImage.getType());
                Image scaledImage = sourceImage.getScaledInstance(imageSize, imageSize, Image.SCALE_SMOOTH);
                img2.createGraphics().drawImage(scaledImage, 0, 0, null);
            }
            ImageIO.write(img2, "png", thumbnail);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            logger.error("Error creating thumbnail " + e.getCause(), e);
        }
        //return thumbnail;

    }



    /*public static boolean generateThumbnail(String strOrigPath, String outputFile, int newYRes, int newXRes) {
        try {

            MagickImage lightImg = new MagickImage(new ImageInfo(strOrigPath));

            //Get the original resolution
            double origXRes = lightImg.getXResolution();
            double origYRes = lightImg.getYResolution();

            //Get present dimensions
            int w = (int) lightImg.getDimension().getWidth();
            int h = (int) lightImg.getDimension().getHeight();

            //Calculate new dimensions
            double new_w = w / origXRes * newXRes;
            double new_h = h / origYRes * newYRes;

            //Scale image
            lightImg = lightImg.scaleImage((int) new_w, (int) new_h);

            //Update info on image file
            lightImg.setFileName(outputFile);
            lightImg.setXResolution(newXRes);
            lightImg.setYResolution(newYRes);

            //Save image
            lightImg.writeImage(new ImageInfo());

        } catch (MagickException e) {
            logger.error("Error generating thumbnail" + e.getCause() , e);
            return false;
        }

        return true;
    }*/

    public static String dateFormate(String oldFormat, String newFormat, String date) {
        try {
            DateTimeFormatter oldPattern = DateTimeFormatter.ofPattern(oldFormat);
            DateTimeFormatter newPattern = DateTimeFormatter.ofPattern(newFormat);
            LocalDateTime datetime = LocalDateTime.parse(date, oldPattern);
            return datetime.format(newPattern);
        } catch (Exception e) {

        }
        return "-";
    }

    public static String dateformate(String time) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");
            SimpleDateFormat output = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date d = sdf.parse(time);
            String formattedTime = output.format(d);
            return formattedTime;
        } catch (Exception e) {
            logger.error("Error converting date time ", e);
        }
        return "-";
    }

    public static String dateMMDDYYYY(LocalDateTime date) {
        try {
            return date.getMonthValue() + "-" + date.getDayOfMonth() + "-" + date.getYear();
        } catch (Exception e) {
            logger.error("Error converting date", e);
        }
        return "-";
    }


    public static String periodBetweenDates(LocalDateTime start, LocalDateTime end) {
        try {
            Duration duration = Duration.between(start, end);
            long seconds = Math.abs(duration.getSeconds());
            long hours = seconds / 3600;
            seconds -= (hours * 3600);
            long minutes = seconds / 60;
            seconds -= (minutes * 60);
            if (hours > 0) {
                return hours + " hours " + minutes + " minutes ";
            } else {
                return minutes + " minutes ";
            }
        } catch (Exception e) {

        }
        return "None";
    }

    public static Boolean checkValidMeetingDateForVisitEdit(LocalDateTime[] start) {
        return start[0].toLocalDate().isBefore(LocalDate.now());
    }

    public static String generateBase64Image(Byte[] B) {
        byte[] b2 = new byte[B.length];
        for (int i = 0; i < B.length; i++) {
            b2[i] = B[i];
        }
        return Base64.getEncoder().encodeToString(b2);
    }


    public static boolean isEmailIdValid(String email) {
        try {
            pattern = Pattern.compile(EMAIL_REGEX, Pattern.CASE_INSENSITIVE);
            matcher = pattern.matcher(email);
            if (matcher.matches()) {
                return true;
            }
        } catch (Exception e) {
            logger.error(e.getMessage() + e.getStackTrace());
        }
        return false;
    }


    public static LocalDateTime getStartOfDay(LocalDateTime dateTime) {
        try {
            LocalDate localDate = LocalDate.from(dateTime);
            return localDate.atTime(LocalTime.MIN);

        } catch (Exception e) {
            LOG.error("Error getting start of the day", e);
        }
        return dateTime;
    }

    public static LocalDateTime getEndOfDay(LocalDateTime dateTime) {
        try {
            LocalDate localDate = LocalDate.from(dateTime);
            return LocalTime.MAX.atDate(localDate);

        } catch (Exception e) {
            LOG.error("Error getting end of the day", e);
        }
        return dateTime;
    }

    public static LocalDateTime getStartOfDay(ZoneId zoneId) {

        LocalDateTime locationCurrentDateTime = LocalDateTime.now(zoneId);
        try {
            LocalDate localDate = LocalDate.from(locationCurrentDateTime);
            return localDate.atTime(LocalTime.MIN);

        } catch (Exception e) {
            LOG.error("Error getting start of the day", e);
        }
        return locationCurrentDateTime;
    }

    public static LocalDateTime getEndOfDay(ZoneId zoneId) {
        LocalDateTime locationCurrentDateTime = LocalDateTime.now(zoneId);
        try {

            LocalDate localDate = LocalDate.from(locationCurrentDateTime);
            return LocalTime.MAX.atDate(localDate);

        } catch (Exception e) {
            LOG.error("Error getting end of the day", e);
        }
        return locationCurrentDateTime;
    }

    public static LocalDateTime getCurrentDateTimeByZone(ZoneId zoneId) {
        LocalDateTime localDateTime = LocalDateTime.now();
        try {
            return ZonedDateTime.now(zoneId).toLocalDateTime();
        } catch (Exception e) {
            LOG.error("Error getting current time. Returning system time ");
        }
        return localDateTime;
    }

    public static LocalDateTime getCurrentDateTimeByZone(String zoneId) {
        LocalDateTime localDateTime = LocalDateTime.now();
        try {
            ZoneId zoneId1 = ZoneId.of(zoneId);
            return ZonedDateTime.now(zoneId1).toLocalDateTime();
        } catch (Exception e) {
            LOG.error("Error getting current time. Returning system time ");
        }
        return localDateTime;
    }

    public static LocalDateTime getExpiryDate(int expiryTimeInMinutes) {
        return LocalDateTime.now().plusMinutes(expiryTimeInMinutes);
    }


    public static <T> BindingResult setViolations(Set<ConstraintViolation<T>> violations, BindingResult result, ModelMap model, Alerts alerts) {
        try {
            alerts.setError("required.fields.missing");
            for (ConstraintViolation violation : violations) {
                result.rejectValue(violation.getPropertyPath().toString(), "", violation.getMessage());
            }
            model.addAttribute("success", false);
        } catch (Exception e) {

        }
        return result;
    }


}
