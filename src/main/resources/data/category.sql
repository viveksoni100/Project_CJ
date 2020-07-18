insert into daas_product_type
(`id`,
`created_at`,
`status`,
`updated_at`,
`product_type_description`,
`product_type_name`,
`product_type_number`)
values
(1,
SYSDATE(),
1,
SYSDATE(),
'DATA Product',
'DATA',
101);


insert into daas_product_type
(`id`,
`created_at`,
`status`,
`updated_at`,
`product_type_description`,
`product_type_name`,
`product_type_number`)
values
(2,
SYSDATE(),
1,
SYSDATE(),
'API Product',
'API',
102);

insert into daas_product_category
(`id`,
`created_at`,
`status`,
`updated_at`,
`product_category_description`,
`product_category_name`)
values
(1,
SYSDATE(),
1,
SYSDATE(),
'Other Category API and Zip',
'Other');

insert into daas_product_category_detail
(`id`,
`created_at`,
`status`,
`updated_at`,
`product_category_id`,
`product_type_id`)
values
(1,
SYSDATE(),
1,
SYSDATE(),
1,
1);


insert into daas_product_category_detail
(`id`,
`created_at`,
`status`,
`updated_at`,
`product_category_id`,
`product_type_id`)
values
(2,
SYSDATE(),
1,
SYSDATE(),
1,
2);