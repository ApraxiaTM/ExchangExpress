package models

import (
	"database/sql"
	"fmt"
)

type Transaction struct {
	ID       int    `json:"id"`
	Currency string `json:"currency"`
	// Amount         int     `json:"amount"`
	Amount         float64 `json:"amount"`
	RateConversion float64 `json:"rate_conversion"`
	Timestamp      string  `json:"timestamps"`
	AdminFee       float64 `json:"admin_fee"`
	Sender         string  `json:"sender"`   // Assuming these fields are needed for specific queries
	Receiver       string  `json:"receiver"` // Modify or remove as per your actual requirements
	Username       string  `json:"username"`
}

// CreateTransaction inserts a new transaction into the database
// func (t *Transaction) CreateTransaction(db *sql.DB, username, receiver, currency string, amount, adminFee float64) error {
// 	query := `
//         INSERT INTO transactions (user_id, users_account_id, currency, amount, rate_conversion, admin_fee)
//         SELECT
//             u.id AS user_id,
//             ua.id AS users_account_id,
//             ? AS currency,
//             ? AS amount,
//             c.id_amount AS rate_conversion,
//             ? AS admin_fee
//         FROM users u
//         JOIN users_account ua ON ua.bank_id = (SELECT id FROM bank_account WHERE holder = ?)
//         JOIN currency c ON c.currency = ?
//         WHERE u.username = ?
//     `
// 	_, err := db.Exec(query, currency, amount, adminFee, receiver, currency, username)
// 	return err
// }

func (t *Transaction) CreateTransaction(db *sql.DB, username, receiver, currency string, amount, adminFee float64) error {
	query := `
        INSERT INTO transactions (user_id, users_account_id, currency, amount, rate_conversion, admin_fee)
        SELECT
            u.id AS user_id,
            ua.id AS users_account_id,
            ? AS currency,
            ? AS amount,
            c.id_amount AS rate_conversion,
            ? AS admin_fee
        FROM users u
        JOIN users_account ua ON ua.bank_id = (SELECT id FROM bank_account WHERE holder = ?)
        JOIN currency c ON c.currency = ?
        WHERE u.username = ?
    `
	// Debugging log
	fmt.Printf("Query params: currency=%s, amount=%f, adminFee=%f, receiver=%s, username=%s\n", currency, amount, adminFee, receiver, username)

	_, err := db.Exec(query, currency, amount, adminFee, receiver, currency, username)
	return err
}

// GetTransactionsByUsername fetches all transactions for a given username
func GetTransactionsByUsername(db *sql.DB, username string) ([]Transaction, error) {
	var transactions []Transaction

	query := `
        SELECT
            sender_account.holder AS sender,
            receiver_account.holder AS receiver,
            t.amount,
            t.rate_conversion,
            t.currency,
            t.timestamps,
            t.admin_fee
        FROM transactions t
        JOIN users_account sender_ua ON t.user_id = sender_ua.user_id AND sender_ua.status = "sender"
        JOIN bank_account sender_account ON sender_ua.bank_id = sender_account.id
        JOIN users_account receiver_ua ON t.users_account_id = receiver_ua.id
        JOIN bank_account receiver_account ON receiver_ua.bank_id = receiver_account.id
        JOIN users u ON t.user_id = u.id
        WHERE u.username = ?
    `

	rows, err := db.Query(query, username)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var transaction Transaction
		err := rows.Scan(&transaction.Sender, &transaction.Receiver, &transaction.Amount, &transaction.RateConversion, &transaction.Currency, &transaction.Timestamp, &transaction.AdminFee)
		if err != nil {
			return nil, err
		}
		transactions = append(transactions, transaction)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return transactions, nil
}

// DeleteTransaction deletes a transaction from the database by its ID
func DeleteTransaction(db *sql.DB, id int) error {
	query := "DELETE FROM transactions WHERE id = ?"
	_, err := db.Exec(query, id)
	return err
}
