package models

import "github.com/jinzhu/gorm"

type User struct {
	gorm.Model
	Email string `gorm:"type: varchar(128);unique_index"`
	Login string `gorm:"size: 32"`
	FirstName string
	LastName string
	Password string `gorm:"size: 255" json:"-"`
	Roles []Role	`gorm:"many2many:user_roles;"`
}