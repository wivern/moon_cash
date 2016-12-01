package models

import "time"

type Account struct {
	Id 		int64
	Name		string
	Type 		AccountType
	CreatedAt	time.Time
	UpdatedAt 	time.Time
	DeletedAt 	time.Time
}
