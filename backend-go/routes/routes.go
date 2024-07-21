package routes

import (
	"backend-go/controllers"
	"database/sql"

	"github.com/gorilla/mux"
)

func SetupRoutes(db *sql.DB) *mux.Router {
	router := mux.NewRouter()

	// router.Use(middleware.CORS)

	// User routes
	router.HandleFunc("/users/register", controllers.Register(db)).Methods("POST")
	router.HandleFunc("/users/login", controllers.Login(db)).Methods("POST")
	router.HandleFunc("/users", controllers.GetUserByUsername(db)).Methods("GET")
	router.HandleFunc("/users", controllers.UpdateUser(db)).Methods("PUT")

	// Bank Account routes
	router.HandleFunc("/bank_accounts/personal", controllers.GetPersonalBankAccounts(db)).Methods("GET")
	router.HandleFunc("/bank_accounts/receivers", controllers.GetReceiversBankAccounts(db)).Methods("GET")
	router.HandleFunc("/bank_accounts/receiverslocal", controllers.GetReceiversLocalBankAccounts(db)).Methods("GET")
	router.HandleFunc("/bank_accounts/receiversforeign", controllers.GetReceiversForeignBankAccounts(db)).Methods("GET")
	router.HandleFunc("/bank_accounts", controllers.GetInitialBankAccount(db)).Methods("GET")
	router.HandleFunc("/bank_accounts", controllers.CreateBankAccount(db)).Methods("POST")
	router.HandleFunc("/bank_accounts", controllers.UpdateSenderBankAccount(db)).Methods("PUT")
	router.HandleFunc("/bank_accounts/{id}", controllers.DeleteBankAccount(db)).Methods("DELETE")

	// Currency routes
	router.HandleFunc("/currency", controllers.CreateCurrency(db)).Methods("POST")
	router.HandleFunc("/currency", controllers.GetCurrency(db)).Methods("GET")
	router.HandleFunc("/currency", controllers.UpdateCurrency(db)).Methods("PUT")
	router.HandleFunc("/currency/{id}", controllers.DeleteCurrency(db)).Methods("DELETE")

	// Transaction routes
	router.HandleFunc("/transactions", controllers.CreateTransaction(db)).Methods("POST")
	router.HandleFunc("/transactions", controllers.GetTransactions(db)).Methods("GET")
	router.HandleFunc("/transactions/{id}", controllers.DeleteTransaction(db)).Methods("DELETE")

	// User Account routes
	router.HandleFunc("/users_accounts", controllers.CreateUserAccount(db)).Methods("POST")
	router.HandleFunc("/users_accounts", controllers.GetUserAccount(db)).Methods("GET")
	router.HandleFunc("/users_accounts/{id}", controllers.DeleteUserAccount(db)).Methods("DELETE")

	return router
}
