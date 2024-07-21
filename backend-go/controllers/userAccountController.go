package controllers

import (
	"backend-go/models"
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func CreateUserAccount(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var userAccount models.UserAccount
		json.NewDecoder(r.Body).Decode(&userAccount)
		err := userAccount.CreateUserAccount(db)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(userAccount)
	}
}

func GetUserAccount(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Handling query parameters
		username := r.URL.Query().Get("username")
		holder := r.URL.Query().Get("holder")

		// Call to model function
		usersAccount, err := models.GetUsersAccount(db, username, holder)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		json.NewEncoder(w).Encode(usersAccount)
	}
}

func DeleteUserAccount(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		idStr := mux.Vars(r)["id"]
		id, err := strconv.Atoi(idStr)
		if err != nil {
			http.Error(w, "Invalid user account ID", http.StatusBadRequest)
			return
		}
		err = models.DeleteUserAccount(db, id)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusNoContent)
	}
}
