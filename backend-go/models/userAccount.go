package models

import (
	"database/sql"
)

type UserAccount struct {
	ID     int    `json:"id"`
	UserID int    `json:"user_id"`
	BankID int    `json:"bank_id"`
	Status string `json:"status"`
}

func (u *UserAccount) CreateUserAccount(db *sql.DB) error {
	query := "INSERT INTO users_account (user_id, bank_id, status) VALUES (?, ?, ?)"
	_, err := db.Exec(query, u.UserID, u.BankID, u.Status)
	return err
}

func GetUsersAccount(db *sql.DB, username string, holder string) ([]UserAccount, error) {
	var userAccounts []UserAccount

	// Construct query based on provided parameters
	query := "SELECT id, user_id, bank_id, status FROM users_account WHERE 1=1"

	if username != "" {
		query += " AND username = ?"
	}
	if holder != "" {
		query += " AND holder = ?"
	}

	// Execute query with parameters
	rows, err := db.Query(query, username, holder)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var userAccount UserAccount
		err := rows.Scan(&userAccount.ID, &userAccount.UserID, &userAccount.BankID, &userAccount.Status)
		if err != nil {
			return nil, err
		}
		userAccounts = append(userAccounts, userAccount)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}

	return userAccounts, nil
}

func DeleteUserAccount(db *sql.DB, id int) error {
	query := "DELETE FROM users_account WHERE bank_id = ?"
	_, err := db.Exec(query, id)
	return err
}
