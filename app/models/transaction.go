package models

import (
	"github.com/jinzhu/gorm"
	"time"
	"database/sql/driver"
)

type TransactionType string
const (
	EXPENSE TransactionType = "expense"
	INCOME TransactionType = "income"
	TRANSFER TransactionType = "transfer"
	REFUND TransactionType = "refund"
	PAID_FOR_FRIEND TransactionType = "paid_for_fried"
	LOAN TransactionType = "loan"
)

func (t *TransactionType) Scan(value interface{}) error {
	*t = TransactionType(value.(string));
	return nil;
}

func (t TransactionType) Value() (driver.Value, error) {
	return string(t), nil
}

type Transaction struct {
	gorm.Model
	Date		time.Time
	Amount		float64 `json:",string"`
	Description	string
	Account 	Account
	AccountID	uint   	`gorm:"index"`
	Type		TransactionType
}
