package controllers

import (
	"io/ioutil"
	"encoding/json"
	"github.com/revel/revel"
	"github.com/wivern/moon_cash/app/models"
)

type Accounts struct {
	GormController
}

type DeleteResponse struct {
	deletedId int64
	message   string
}

func (c Accounts) List() revel.Result {
	var accounts []models.Account
	c.Txn.Preload("AccountType").Find(&accounts)
	return c.RenderJson(accounts)
}

func (c Accounts) Create() revel.Result {
	var account models.Account
	content, _ := ioutil.ReadAll(c.Request.Body)
	err := json.Unmarshal([]byte(content), &account)
	if err != nil {
		revel.ERROR.Println("ERROR", err)
		panic(err)
	}
	revel.INFO.Println("Creating account", account)
	c.Txn.Create(&account)
	c.Txn.Preload("AccountType").Find(&account, account.ID)
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
		deletedId: id,
		message:"Account deleted",
	})
}