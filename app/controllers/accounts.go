package controllers

import "github.com/revel/revel"

type Accounts struct {
	*revel.Controller
}

func (c Accounts) List() revel.Result {
	return c.RenderJson("")
}
