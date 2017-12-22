package hello

import (
	"net/http"
)

type Quiz struct {
	ID       int64  `json:"id,omitempty" datastore:"-"`
	Question string `json:"question"`
	Option1  string `json:"option1"`
	Option2  string `json:"option2"`
	Option3  string `json:"option3"`
	Answer   int    `json:"answer"`
}

type Score struct {
	Name  string `json:"name"`
	Score int64  `json:"score"`
}

func init() {
	http.HandleFunc("/api/quiz", quizHandler)
	http.HandleFunc("/api/scores", scoreHandler)
	http.HandleFunc("/api/reset", resetHandler)
}
