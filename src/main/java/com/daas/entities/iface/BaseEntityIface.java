package com.daas.entities.iface;

public interface BaseEntityIface {
    void preInsert();
    void preUpdate();
    void preDelete();
    void postUpdate();
    void postDelete();
}
