package models

import (
	"github.com/jinzhu/gorm"
)

type AccountType struct {
	gorm.Model
	Name		string
}