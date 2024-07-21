package models

import "database/sql"

type Currency struct {
	ID       int     `json:"id"`
	Currency string  `json:"currency"`
	Country  string  `json:"country"`
	Amount   float64 `json:"id_amount"`
}

func (c *Currency) CreateCurrency(db *sql.DB) error {
	query := "INSERT INTO currency (currency, country, id_amount) VALUES (?, ?, ?)"
	_, err := db.Exec(query, c.Currency, c.Country, c.Amount)
	return err
}

func GetCurrencyByName(db *sql.DB, currencyName string) (Currency, error) {
	var currency Currency
	query := "SELECT id, currency, country, id_amount FROM currency WHERE currency = ?"
	err := db.QueryRow(query, currencyName).Scan(&currency.ID, &currency.Currency, &currency.Country, &currency.Amount)
	return currency, err
}

func (c *Currency) UpdateCurrency(db *sql.DB) error {
	query := "UPDATE currency SET currency = ?, country = ?, id_amount = ? WHERE id = ?"
	_, err := db.Exec(query, c.Currency, c.Country, c.Amount, c.ID)
	return err
}

func DeleteCurrency(db *sql.DB, id int) error {
	query := "DELETE FROM currency WHERE id = ?"
	_, err := db.Exec(query, id)
	return err
}
