package com.daas.services.file;

import javaxt.io.Image;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


public class ImageEditService {
    public static final Logger LOG = LogManager.getLogger(ImageEditService.class.getName());
    public  boolean resizeWidth(int newWidth, String file, String newName){
        try{
            Image image = new Image(file);
            if (image.getWidth() > newWidth) {
                image.setWidth(newWidth);
                image.saveAs(newName);
            }
            return true;
        }catch (Exception e){
            LOG.error("Error saving image ", e);
        }
        return false;
    }

    public  boolean resizeWidthHeight(int newWidth, int newHeight, String file, String newName){
        try{
            Image image = new Image(file);
            image.resize(newWidth, newHeight, false);
            image.saveAs(newName);
            return true;
        }catch (Exception e){
            LOG.error("Error saving image ", e);
        }
        return false;
    }
}
