package controllers

import (
	"github.com/jinzhu/gorm"
	_ "github.com/lib/pq" // my example for postgres
	// short name for revel
	r "github.com/revel/revel"
	// YOUR APP NAME
	"github.com/wivern/moon_cash/app/models"
	"database/sql"
	"fmt"
)

type GormController struct {
	*r.Controller
	Txn *gorm.DB
}

var db *gorm.DB

func InitDB() {
	var err error
	connstring := fmt.Sprintf("host=localhost user=%s password='%s' dbname=%s sslmode=disable", "postgres", "postgres", "moon-cash")
	Gdb, err := gorm.Open("postgres", connstring)
	if err != nil{
		r.ERROR.Println("FATAL", err)
		panic(err)
	}
	Gdb.AutoMigrate(&models.AccountType{})
	Gdb.AutoMigrate(&models.Account{})
	db = Gdb
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