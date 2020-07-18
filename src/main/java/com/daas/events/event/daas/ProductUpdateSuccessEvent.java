package com.daas.events.event.daas;

import com.daas.entities.DaaS.Product;
import com.daas.events.base.BaseEvent;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

import java.util.List;

@Getter
@Setter
public class ProductUpdateSuccessEvent extends ApplicationEvent implements BaseEvent {

    private List<String> usersListEmailSrt;
    private Product productData;

    /**
     * Create a new ApplicationEvent.
     *
     * @param source the object on which the event initially occurred (never {@code null})
     */
    public ProductUpdateSuccessEvent(List<String> usersListEmailSrt, Product productData) {
        super(productData);
        this.usersListEmailSrt = usersListEmailSrt;
        this.productData = productData;

    }
}
