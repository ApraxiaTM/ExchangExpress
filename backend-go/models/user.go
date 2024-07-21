// models/user.go
package models

import (
	"database/sql"

	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Salt     string `json:"salt"`
}

// CreateUser inserts a new user into the database with hashed password and salt
func (u *User) CreateUser(db *sql.DB) error {
	query := "INSERT INTO users (username, email, pass, salt) VALUES (?, ?, ?, ?)"
	_, err := db.Exec(query, u.Username, u.Email, u.Password, u.Salt)
	return err
}

// GetUserByUsername fetches a user by username
func GetUserByUsername(db *sql.DB, username string) (User, error) {
	var user User
	query := "SELECT id, username, email, pass, salt FROM users WHERE username = ?"
	err := db.QueryRow(query, username).Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.Salt)
	if err != nil {
		return User{}, err
	}
	return user, nil
}

// UpdateUser updates a user's username and email
func (u *User) UpdateUser(db *sql.DB, oldUsername string) error {
	query := "UPDATE users SET username = ?, email = ? WHERE username = ?"
	_, err := db.Exec(query, u.Username, u.Email, oldUsername)
	return err
}

// FindUserByUsername finds a user by username
func FindUserByUsername(db *sql.DB, username string) (User, error) {
	var user User
	query := "SELECT id, username, email, pass, salt FROM users WHERE username = ?"
	err := db.QueryRow(query, username).Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.Salt)
	if err != nil {
		return User{}, err
	}
	return user, nil
}

// GeneratePasswordHash generates bcrypt hashed password and salt
func (u *User) GeneratePasswordHash() error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	u.Password = string(hashedPassword)
	u.Salt = "" // bcrypt includes the salt in the hashed password

	return nil
}
