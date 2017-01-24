package models

import (
	"github.com/jinzhu/gorm"
)

type Account struct {
	gorm.Model
	Name			string
	AccountType 	AccountType
	AccountTypeID	uint `gorm:"index"`
	Balance 	float64 `gorm:"-"`
	Transactions 	[]Transaction
}
