package services

import (
	"github.com/wivern/moon_cash/app/models"
	"github.com/jinzhu/gorm"
	"github.com/revel/revel"
)

type BalanceService struct {

}

func (b BalanceService) Balance(Txn *gorm.DB, Account models.Account) float64 {
	var transactions []models.Transaction
	Txn.Model(Account).Order("Date desc").Related(&transactions)
	var result float64 = 0
	for _, T := range transactions {
		switch T.Type {
		case models.INCOME, models.LOAN:
			result += T.Amount
		case models.EXPENSE, models.REFUND, models.PAID_FOR_FRIEND:
			result -= T.Amount
		}
	}
	revel.TRACE.Println("Balance: %s = %f", Account.Name, result)
	return result
}

func (b BalanceService) BalanceTran(Txn *gorm.DB, Transaction models.Transaction) float64{
	var transactions []models.Transaction
	Txn.Where("Date < ?", Transaction.Date).Order("Date desc").Find(&transactions)
	var result float64 = 0
	transactions = append(transactions, Transaction)
	for _, T := range transactions {
		switch T.Type {
		case models.INCOME, models.LOAN:
			result += T.Amount
		case models.EXPENSE:
			result -= T.Amount
		}
	}
	return result
}