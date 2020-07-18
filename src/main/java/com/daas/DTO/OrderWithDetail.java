package com.daas.DTO;

import com.daas.entities.BaseEntity;
import com.daas.entities.DaaS.OrderDetail;
import com.daas.entities.DaaS.Product;
import com.daas.entities.user.User;
import com.daas.validator.iface.field.HtmlValidateConstraint;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class OrderWithDetail extends BaseEntity {

    //orderDetailVar
    private String productName;

    private Long productQty;

    private float slabPrice;

    private float originalPrice;

    private float discount;

    private float netPrice;

    private Long offerAppliedId;

    private Long usedApiCallCount;

    private float dataVersion;

    private LocalDateTime productExpiryDate;

    private Product product;

    private String sbuCode;

    //orderVars
    private String emailId;

    private float grossPrice;

    private float tax;

    private LocalDateTime purchaseDate;

    private User daasUser;

    private List<OrderDetail> orderDetailList = new ArrayList<OrderDetail>();

    private Long transactionNumber;

    private String stripeSessionId;

}
