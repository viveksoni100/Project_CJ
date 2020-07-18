package com.daas.entities.forms.daas;


import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class DaasCategory {

    private ArrayList<String> productType;

    private String categoryName;

    private String categoryDescription;
}
