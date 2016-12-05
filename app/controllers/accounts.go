package controllers

import (
	"github.com/revel/revel"
	"github.com/wivern/moon_cash/app/models"
)

type Accounts struct {
	GormController
}

type DeleteResponse struct {
	deletedId int64
	message string
}

func (c Accounts) List() revel.Result {
	var accounts []models.Account
	c.Txn.Find(&accounts)
	return c.RenderJson(accounts)
}

func (c Accounts) Create(account models.Account) revel.Result{
	revel.INFO.Println("Creating account: " + account.Name)
	Gdb.Create(account)
	return c.RenderJson(account)
}

func (c Accounts) Get(id int64) revel.Result {
	var account models.Account
	c.Txn.Where("Id = ?", id).First(&account)
	return c.RenderJson(account)
}

func (c Accounts) Update(account models.Account) revel.Result {
	revel.INFO.Println("Update account: " + account.Name)
	c.Txn.Update(account)
	return c.RenderJson(account)
}

func (c Accounts) Delete(id int64) revel.Result {
	c.Txn.Where("Id = ?", id).Delete(&models.Account{})
	return c.RenderJson(DeleteResponse{
		deletedId:id,
		message:"Account deleted",
	})
}