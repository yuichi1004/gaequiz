package hello

import (
	"encoding/json"
	"net/http"

	"google.golang.org/appengine"
	"google.golang.org/appengine/datastore"
	"google.golang.org/appengine/log"
)

type Quiz struct {
	ID       int64  `json:"id,omitempty" datastore:"-"`
	Question string `json:"question"`
	Option1  string `json:"option1"`
	Option2  string `json:"option2"`
	Option3  string `json:"option3"`
	Answer   int    `json:"answer"`
}

func init() {
	http.HandleFunc("/quiz", quizHandler)
}

func quizHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		quizGetHandler(w, r)
	case "POST":
		quizPostHandler(w, r)
	default:
		w.WriteHeader(http.StatusNotFound)
	}
}

func quizPostHandler(w http.ResponseWriter, r *http.Request) {
	ctx := appengine.NewContext(r)

	var q Quiz
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&q); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	key := datastore.NewIncompleteKey(ctx, "Quiz", nil)
	createdKey, err := datastore.Put(ctx, key, &q)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	q.ID = createdKey.IntID()

	log.Infof(ctx, "New quiz created %+v", q)

	w.WriteHeader(http.StatusCreated)
	encoder := json.NewEncoder(w)
	encoder.Encode(&q)
}

func quizGetHandler(w http.ResponseWriter, r *http.Request) {
	ctx := appengine.NewContext(r)

	var quizCol []*Quiz
	query := datastore.NewQuery("Quiz").Limit(100)
	keys, err := query.GetAll(ctx, &quizCol)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	for i, q := range quizCol {
		q.ID = keys[i].IntID()
	}

	w.WriteHeader(http.StatusOK)
	encoder := json.NewEncoder(w)
	encoder.Encode(&quizCol)
}
