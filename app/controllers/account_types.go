package controllers

import (
	"github.com/revel/revel"
	"github.com/wivern/moon_cash/app/models"
)

type AccountTypes struct {
	GormController
}

func (c AccountTypes) List() revel.Result{
	var types []models.AccountType
	c.Txn.Find(&types)
	return c.RenderJson(types)
}