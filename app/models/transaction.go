package models

import (
	"github.com/jinzhu/gorm"
	"time"
)

type Transaction struct {
	gorm.Model
	Date		time.Time
	Amount		float64
	Description	string
	Account 	Account
	AccountID	uint   	`gorm:"index"`
}
