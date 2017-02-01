package controllers

import (
	"github.com/jinzhu/gorm"
	_ "github.com/lib/pq" // my example for postgres
	// short name for revel
	r "github.com/revel/revel"
	// YOUR APP NAME
	"github.com/wivern/moon_cash/app/models"
	"github.com/wivern/moon_cash/app/services"
	"database/sql"
	"fmt"
)

type GormController struct {
	*r.Controller
	Txn *gorm.DB
}

var db *gorm.DB
var balanceService *services.BalanceService = new(services.BalanceService)

func InitDB() {
	var err error
	host := r.Config.StringDefault("db.host", "localhost")
	dbUser := r.Config.StringDefault("db.username", "postgres")
	dbPassword := r.Config.StringDefault("db.password", "postgres")
	dbName := r.Config.StringDefault("db.name", "moon-cash")
	connstring := fmt.Sprintf("host=%s user=%s password='%s' dbname=%s sslmode=disable", host, dbUser, dbPassword, dbName)
	Gdb, err := gorm.Open("postgres", connstring)
	if err != nil{
		r.ERROR.Println("FATAL", err)
		panic(err)
	}
	Gdb.AutoMigrate(&models.AccountType{})
	Gdb.AutoMigrate(&models.Account{})
	Gdb.AutoMigrate(&models.Transaction{})
	Gdb.AutoMigrate(&models.Role{})
	Gdb.AutoMigrate(&models.User{})
	db = Gdb
	db.LogMode(true)
}

func (c *GormController) Begin() r.Result {
	fmt.Println(db)
	txn := db.Begin()
	if (txn.Error != nil){
		panic(txn.Error)
	}
	c.Txn = txn
	return nil
}

func (c *GormController) Commit() r.Result {
	if c.Txn == nil {
		return nil
	}
	c.Txn.Commit()
	if err := c.Txn.Error; err != nil && err != sql.ErrTxDone{
		panic(err)
	}
	c.Txn = nil
	return nil
}

func (c*GormController) Rollback() r.Result {
	if c.Txn == nil {
		return nil
	}
	c.Txn.Rollback()
	if err := c.Txn.Error; err != nil && err != sql.ErrTxDone{
		panic(err)
	}
	c.Txn = nil
	return nil

}

func (c *GormController) CurrentUser() *models.User{
	var user models.User
	userName := c.Session["user"]
	if len(userName) > 0{
		c.Txn.Where("login = ?", userName).First(&user)
		return &user
	}
	return nil
}