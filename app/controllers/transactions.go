package controllers

import (
	"github.com/revel/revel"
	"github.com/wivern/moon_cash/app/models"
)

type Transactions struct {
	GormController
}

func (c Transactions) List(accountId int64) revel.Result{
	var transactions []models.Transaction
	c.Txn.Preload("Transaction").Find(&transactions)
	return c.RenderJson(transactions)
}

