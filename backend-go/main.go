package main

import (
	"backend-go/config"
	"backend-go/routes"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
)

func main() {
	db := config.Connect()
	defer db.Close()

	router := routes.SetupRoutes(db)

	// CORS settings
	cors := handlers.CORS(
		handlers.AllowedOrigins([]string{"http://localhost:3000"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
	)

	log.Println("Server running on port 3001")
	log.Fatal(http.ListenAndServe(":3001", cors(router)))
}
