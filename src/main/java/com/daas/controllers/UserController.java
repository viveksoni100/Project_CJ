package com.daas.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = {"/user"})
@PreAuthorize(value = "hasRole('ROLE_USER') or hasRole('ROLE_CORPORATE') or hasRole('ROLE_ADMIN')")
public class UserController extends AbstractBaseController {


}
