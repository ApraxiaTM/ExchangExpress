package controllers

import (
	"backend-go/models"
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

// func CreateTransaction(db *sql.DB) http.HandlerFunc {
// 	return func(w http.ResponseWriter, r *http.Request) {
// 		var transaction models.Transaction
// 		json.NewDecoder(r.Body).Decode(&transaction)
// 		// Assuming username, receiver, currency, amount, admin_fee are fields in the request body
// 		err := transaction.CreateTransaction(db, transaction.Username, transaction.Receiver, transaction.Currency, transaction.Amount, transaction.AdminFee)
// 		if err != nil {
// 			http.Error(w, err.Error(), http.StatusInternalServerError)
// 			return
// 		}
// 		w.WriteHeader(http.StatusCreated)
// 		json.NewEncoder(w).Encode(transaction)
// 	}
// }

func CreateTransaction(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var transaction models.Transaction
		err := json.NewDecoder(r.Body).Decode(&transaction)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		// Debugging log
		fmt.Printf("Decoded transaction: %+v\n", transaction)

		err = transaction.CreateTransaction(db, transaction.Username, transaction.Receiver, transaction.Currency, transaction.Amount, transaction.AdminFee)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(transaction)
	}
}

func GetTransactions(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		username := r.URL.Query().Get("username")
		transactions, err := models.GetTransactionsByUsername(db, username)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		json.NewEncoder(w).Encode(transactions)
	}
}

func DeleteTransaction(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id, err := strconv.Atoi(vars["id"])
		if err != nil {
			http.Error(w, "Invalid transaction ID", http.StatusBadRequest)
			return
		}
		err = models.DeleteTransaction(db, id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusNoContent)
	}
}
