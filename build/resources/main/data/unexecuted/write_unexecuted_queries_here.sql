alter table daas_product_offer
modify product_offer_description varchar(2000);

alter table daas_product
modify product_description varchar(2000);

ALTER TABLE `publications`.`daas_product_version`
ADD COLUMN `product_version_note` VARCHAR(5000) NULL DEFAULT NULL AFTER `product_id`;

UPDATE `publications`.`daas_product_type` SET `product_type_name` = 'Customs Data' WHERE (`id` = '1');
UPDATE `publications`.`daas_product_type` SET `product_type_name` = 'Web Service' WHERE (`id` = '2');

