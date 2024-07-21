// bankAccountController.go
package controllers

import (
	"backend-go/models"
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func GetPersonalBankAccounts(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		username := r.URL.Query().Get("username")

		bankAccounts, err := models.GetPersonalBankAccounts(db, username)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(bankAccounts)
	}
}

func GetReceiversBankAccounts(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		username := r.URL.Query().Get("username")

		bankAccounts, err := models.GetReceiversBankAccounts(db, username)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(bankAccounts)
	}
}

func GetReceiversLocalBankAccounts(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		username := r.URL.Query().Get("username")

		bankAccounts, err := models.GetReceiversLocalBankAccounts(db, username)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(bankAccounts)
	}
}

func GetReceiversForeignBankAccounts(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		username := r.URL.Query().Get("username")

		bankAccounts, err := models.GetReceiversForeignBankAccounts(db, username)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(bankAccounts)
	}
}

func GetInitialBankAccount(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		transferCode := r.URL.Query().Get("transfer_code")

		bankAccount, err := models.GetInitialBankAccount(db, transferCode)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(bankAccount)
	}
}

func CreateBankAccount(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var bankAccount models.BankAccount
		json.NewDecoder(r.Body).Decode(&bankAccount)
		err := bankAccount.CreateBankAccount(db)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(bankAccount)
	}
}

func UpdateSenderBankAccount(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var bankAccount models.BankAccount
		err := json.NewDecoder(r.Body).Decode(&bankAccount)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// Ensure username is present in the request body
		if bankAccount.Username == "" {
			http.Error(w, "username is required", http.StatusBadRequest)
			return
		}

		err = bankAccount.UpdateSenderBankAccount(db, bankAccount.Username)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(bankAccount)
	}
}

func DeleteBankAccount(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		params := mux.Vars(r)
		id, err := strconv.Atoi(params["id"])
		if err != nil {
			http.Error(w, "Invalid bank account ID", http.StatusBadRequest)
			return
		}

		err = models.DeleteBankAccount(db, id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusNoContent)
	}
}
