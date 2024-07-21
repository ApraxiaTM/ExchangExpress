// bankAccount.go
package models

import "database/sql"

type BankAccount struct {
	ID           int    `json:"id"`
	BankName     string `json:"bankname"`
	Currency     string `json:"currency"`
	Holder       string `json:"holder"`
	Country      string `json:"country"`
	TransferCode string `json:"transfer_code"`
	Username     string `json:"username"`
}

func (b *BankAccount) CreateBankAccount(db *sql.DB) error {
	query := "INSERT INTO bank_account (bankname, currency, holder, country, transfer_code) VALUES (?, ?, ?, ?, ?)"
	_, err := db.Exec(query, b.BankName, b.Currency, b.Holder, b.Country, b.TransferCode)
	return err
}

func GetPersonalBankAccounts(db *sql.DB, username string) ([]BankAccount, error) {
	var bankAccounts []BankAccount
	query := `
		SELECT ba.id, ba.bankname, ba.currency, ba.holder, ba.country, ba.transfer_code 
		FROM bank_account ba 
		INNER JOIN users_account ua ON ba.id = ua.bank_id 
		INNER JOIN users u ON ua.user_id = u.id 
		WHERE ua.status = "sender" AND u.username = ?
	`
	rows, err := db.Query(query, username)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var bankAccount BankAccount
		err := rows.Scan(&bankAccount.ID, &bankAccount.BankName, &bankAccount.Currency, &bankAccount.Holder, &bankAccount.Country, &bankAccount.TransferCode)
		if err != nil {
			return nil, err
		}
		bankAccounts = append(bankAccounts, bankAccount)
	}
	return bankAccounts, nil
}

func GetReceiversBankAccounts(db *sql.DB, username string) ([]BankAccount, error) {
	var bankAccounts []BankAccount
	query := `
		SELECT ba.id, ba.bankname, ba.currency, ba.holder, ba.country, ba.transfer_code 
		FROM bank_account ba 
		INNER JOIN users_account ua ON ba.id = ua.bank_id 
		INNER JOIN users u ON ua.user_id = u.id 
		WHERE ua.status = "receiver" AND u.username = ?
	`
	rows, err := db.Query(query, username)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var bankAccount BankAccount
		err := rows.Scan(&bankAccount.ID, &bankAccount.BankName, &bankAccount.Currency, &bankAccount.Holder, &bankAccount.Country, &bankAccount.TransferCode)
		if err != nil {
			return nil, err
		}
		bankAccounts = append(bankAccounts, bankAccount)
	}
	return bankAccounts, nil
}

func GetReceiversLocalBankAccounts(db *sql.DB, username string) ([]BankAccount, error) {
	var bankAccounts []BankAccount
	query := `
		SELECT ba.id, ba.bankname, ba.currency, ba.holder, ba.country, ba.transfer_code 
		FROM bank_account ba 
		INNER JOIN users_account ua ON ba.id = ua.bank_id 
		INNER JOIN users u ON ua.user_id = u.id 
		WHERE ua.status = "receiver" AND ba.currency = "IDR" AND u.username = ?
	`
	rows, err := db.Query(query, username)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var bankAccount BankAccount
		err := rows.Scan(&bankAccount.ID, &bankAccount.BankName, &bankAccount.Currency, &bankAccount.Holder, &bankAccount.Country, &bankAccount.TransferCode)
		if err != nil {
			return nil, err
		}
		bankAccounts = append(bankAccounts, bankAccount)
	}
	return bankAccounts, nil
}

func GetReceiversForeignBankAccounts(db *sql.DB, username string) ([]BankAccount, error) {
	var bankAccounts []BankAccount
	query := `
		SELECT ba.id, ba.bankname, ba.currency, ba.holder, ba.country, ba.transfer_code 
		FROM bank_account ba 
		INNER JOIN users_account ua ON ba.id = ua.bank_id 
		INNER JOIN users u ON ua.user_id = u.id 
		WHERE ua.status = "receiver" AND ba.currency != "IDR" AND u.username = ?
	`
	rows, err := db.Query(query, username)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var bankAccount BankAccount
		err := rows.Scan(&bankAccount.ID, &bankAccount.BankName, &bankAccount.Currency, &bankAccount.Holder, &bankAccount.Country, &bankAccount.TransferCode)
		if err != nil {
			return nil, err
		}
		bankAccounts = append(bankAccounts, bankAccount)
	}
	return bankAccounts, nil
}

func GetInitialBankAccount(db *sql.DB, transferCode string) (BankAccount, error) {
	var bankAccount BankAccount
	query := "SELECT id, bankname, currency, holder, country, transfer_code FROM bank_account WHERE transfer_code = ?"
	err := db.QueryRow(query, transferCode).Scan(&bankAccount.ID, &bankAccount.BankName, &bankAccount.Currency, &bankAccount.Holder, &bankAccount.Country, &bankAccount.TransferCode)
	return bankAccount, err
}

func (b *BankAccount) UpdateSenderBankAccount(db *sql.DB, username string) error {
	query := `
		UPDATE bank_account ba 
		INNER JOIN users_account ua ON ba.id = ua.bank_id 
		INNER JOIN users u ON ua.user_id = u.id 
		SET ba.bankname = ?, ba.currency = ?, ba.holder = ?, ba.country = ?, ba.transfer_code = ? 
		WHERE ua.status = "sender" AND u.username = ?
	`
	_, err := db.Exec(query, b.BankName, b.Currency, b.Holder, b.Country, b.TransferCode, username)
	return err
}

//	func DeleteBankAccount(db *sql.DB, id int) error {
//		query := "DELETE FROM bank_account WHERE id = ?"
//		_, err := db.Exec(query, id)
//		return err
//	}
func DeleteBankAccount(db *sql.DB, id int) error {
	query := "DELETE FROM bank_account WHERE id = ?"
	_, err := db.Exec(query, id)
	if err != nil {
		return err
	}
	return nil
}
