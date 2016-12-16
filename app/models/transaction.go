package models

import (
	"github.com/jinzhu/gorm"
	"time"
)

type TransactionType int
const (
	EXPENSE TransactionType = iota
	INCOME
	TRANSFER
	REFUND
	PAID_FOR_FRIEND
	LOAN
)

type Transaction struct {
	gorm.Model
	Date		time.Time
	Amount		float64
	Description	string
	Account 	Account
	AccountID	uint   	`gorm:"index"`
	Type		TransactionType
}
