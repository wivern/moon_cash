package controllers

import (
	"github.com/revel/revel"
	"github.com/wivern/moon_cash/app/models"
	"io/ioutil"
	"encoding/json"
)

type Transactions struct {
	GormController
}

func (c Transactions) List(id uint) revel.Result{
	var transactions []models.Transaction
	var account models.Account
	c.Txn.First(&account, id)
	c.Txn.Model(&account).Preload("Account").Order("Date desc").Related(&transactions)
	return c.RenderJson(transactions)
}

func (c Transactions) Create(id uint) revel.Result{
	var transaction models.Transaction
	//var account models.Account
	content, _ := ioutil.ReadAll(c.Request.Body)
	err := json.Unmarshal([]byte(content), &transaction)
	if err != nil {
		revel.ERROR.Println("ERROR", err)
		panic(err)
	}
	revel.INFO.Println("Creating transaction", transaction)
	transaction.AccountID = id
	c.Txn.Create(&transaction)
	//c.Txn.First(&account, id)
	//c.Txn.Model(&account).Association("Transactions").Append(transaction)
	return c.RenderJson(transaction)
}
