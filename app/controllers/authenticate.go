package controllers

import (
	"github.com/revel/revel"
	"github.com/wivern/moon_cash/app/models"
	"golang.org/x/crypto/bcrypt"
)

type Authenticate struct {
	GormController
}

func (c Authenticate) Signin() revel.Result{
	return c.Render()
}

func (c Authenticate) Login(login string, password string) revel.Result{
	var user models.User
	c.Txn.Where("login = ? OR email = ?", login, login).First(&user)
	if (&user != nil && bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)) == nil){
		c.Session["user"] = user.Login
		requestedUrl := c.Session["requested"]
		delete(c.Session, "requested")
		if len(requestedUrl) == 0{
			requestedUrl = "/"
		}
		revel.INFO.Println("Successful login")
		return c.Redirect(requestedUrl)
	}
	return c.Redirect("/signin?error=1")
}

func (c Authenticate) Signup(login string, password string, email string) revel.Result{
	var user models.User
	user.Login = login
	user.Email = email
	pwd, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}
	user.Password = string(pwd)
	c.Txn.Create(&user)
	return c.Login(login, password)
}

func (c Authenticate) Current() revel.Result{
	user := c.CurrentUser()
	if user != nil{
		return c.RenderJson(user)
	} else {
		c.Response.Status = 403
		data := make(map[string]interface{})
		data["status"] = "Error"
		data["message"] = "User not authenticated"
		return c.RenderJson(data)
	}
}