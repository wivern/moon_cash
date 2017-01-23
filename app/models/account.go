package models

import (
	"github.com/jinzhu/gorm"
)

type Account struct {
	gorm.Model
	Name			string
	AccountType 	AccountType
	AccountTypeID	uint `gorm:"index"`
	Transactions 	[]Transaction
}
